import { publishedGuides, type DocsEdition } from "../client/src/data/guides";
import { logUnansweredQuestion } from "./db";
import { TRPCError } from "@trpc/server";

export type AssistantStatus = "answer" | "boundary" | "not-found" | "limited";

export type GuideMatch = {
  slug: string;
  title: string;
  section: string;
  excerpt: string;
  score: number;
};

export type DocsCitation = Pick<GuideMatch, "slug" | "title" | "section">;

export type DocsAnswer = {
  answer: string;
  citations: DocsCitation[];
  shouldRedirect: boolean;
  redirectReason: string;
  status: AssistantStatus;
};

const MAX_QUESTION_LENGTH = 600;
const MAX_ANSWER_LENGTH = 1_800;
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 12;
const MAX_TRACKED_REQUEST_KEYS = 4_000;
const requestWindows = new Map<string, { startedAt: number; count: number }>();

const restrictedPatterns = [
  /\b(ssh|sshd|sudo|root shell|terminal|command line|cli|console access)\b/i,
  /\b(run|execute|invoke)\s+(a\s+)?(command|script|binary|process)\b/i,
  /\b(docker|kubectl|iptables|nft|systemctl)\s+(run|exec|restart|stop|start|apply)\b/i,
  /\b(read|write|edit|delete|change)\s+.*\b(host|kernel|system files?)\b/i,
  /(?:^|\s)\/(?:etc|proc|sys|var\/lib|root)(?:\/|\b)/i,
  /\b(panel binary|source code|private key|api key|access token|credential dump|privilege escalation)\b/i,
];

const promptInjectionPatterns = [
  /\b(ignore|disregard|override)\s+(all\s+)?(?:the\s+)?(previous|prior|above|system|developer)\s+(instructions?|rules?|prompt)/i,
  /\b(reveal|print|show|extract)\s+(the\s+)?(system|developer|hidden)\s+(prompt|instructions?|message)/i,
  /\b(jailbreak|prompt injection|act as|you are now)\b/i,
];

const unsafeAnswerPatterns = [
  /(?:^|\n)\s*(?:\$|#)\s*(?:sudo|ssh|kubectl|iptables|nft|systemctl|docker)\b/im,
  /\b(?:sudo|ssh|kubectl|iptables|nft|systemctl|docker)\s+(?:\S+)/i,
  /(?:^|\s)\/(?:etc|proc|sys|var\/lib|root)(?:\/|\b)/i,
  /\b(?:root access|host shell|terminal command|copy the panel binary)\b/i,
];

const relatedTerms: Record<string, string[]> = {
  app: ["application", "marketplace", "deploy"],
  application: ["app", "marketplace", "deploy"],
  backup: ["restore", "recovery", "snapshot"],
  restore: ["backup", "recovery", "snapshot"],
  ssl: ["tls", "certificate", "domain"],
  tls: ["ssl", "certificate", "domain"],
  wordpress: ["cms", "plugin", "theme"],
  database: ["mysql", "postgresql", "redis", "mongo"],
  php: ["runtime", "extension", "website"],
  file: ["files", "upload", "permission"],
};

function normalizeQuestion(question: string) {
  return question.trim().replace(/\s+/g, " ").slice(0, MAX_QUESTION_LENGTH);
}

function normalizeRequestKey(requestKey: string) {
  return requestKey.trim().slice(0, 160) || "public-docs";
}

function checkRateLimit(requestKey: string) {
  const now = Date.now();
  const key = normalizeRequestKey(requestKey);
  const current = requestWindows.get(key);

  if (!current || now - current.startedAt > WINDOW_MS) {
    requestWindows.set(key, { startedAt: now, count: 1 });
  } else if (current.count >= MAX_REQUESTS_PER_WINDOW) {
    throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Please wait a moment before asking another documentation question." });
  } else {
    current.count += 1;
  }

  if (requestWindows.size > MAX_TRACKED_REQUEST_KEYS) {
    for (const [storedKey, window] of Array.from(requestWindows.entries())) {
      if (now - window.startedAt > WINDOW_MS) requestWindows.delete(storedKey);
    }
  }
}

function tokenize(value: string) {
  return Array.from(new Set(value.toLowerCase().split(/[^a-z0-9]+/).filter((token) => token.length > 2)));
}

function expandedTerms(question: string) {
  const terms = tokenize(question);
  return Array.from(new Set(terms.flatMap((term) => [term, ...(relatedTerms[term] ?? [])])));
}

function sectionSearchText(guide: typeof publishedGuides[number], section: typeof publishedGuides[number]["sections"][number]) {
  return [
    guide.title,
    guide.category,
    guide.eyebrow,
    guide.intro,
    section.title,
    section.body,
    ...(section.bullets ?? []),
    section.note ?? "",
    section.code ?? "",
  ].join(" ").toLowerCase();
}

function sectionExcerpt(section: typeof publishedGuides[number]["sections"][number]) {
  return [section.body, ...(section.bullets ?? [])].join(" ").slice(0, 1_250);
}

export function isRestrictedDocsQuestion(question: string) {
  return restrictedPatterns.some((pattern) => pattern.test(question));
}

export function isPromptInjectionAttempt(question: string) {
  return promptInjectionPatterns.some((pattern) => pattern.test(question));
}

export function searchGuideContext(question: string, edition: DocsEdition, limit = 5): GuideMatch[] {
  const terms = expandedTerms(question);
  const matches: GuideMatch[] = [];

  for (const guide of publishedGuides) {
    if (guide.status !== "published" || !guide.editions?.includes(edition)) continue;

    for (const section of guide.sections) {
      const searchable = sectionSearchText(guide, section);
      const titleText = `${guide.title} ${section.title}`.toLowerCase();
      const categoryText = `${guide.category} ${guide.eyebrow}`.toLowerCase();
      const score = terms.reduce((total, term) => {
        if (!searchable.includes(term)) return total;
        return total + (titleText.includes(term) ? 5 : 0) + (categoryText.includes(term) ? 2 : 0) + 1;
      }, 0);

      if (score >= 3) {
        matches.push({
          slug: guide.slug,
          title: guide.title,
          section: section.title,
          excerpt: sectionExcerpt(section),
          score,
        });
      }
    }
  }

  return matches
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit);
}

function citationFromMatch(match: GuideMatch): DocsCitation {
  return { slug: match.slug, title: match.title, section: match.section };
}

function boundaryResponse(reason: string): DocsAnswer {
  return {
    answer: "I can help with published Brick Web UI workflows, but I cannot provide host access, shell or terminal commands, panel-source details, credentials, or instructions that bypass service boundaries. Use the relevant Web UI guide or contact your hosting provider for account-specific help.",
    citations: [],
    shouldRedirect: true,
    redirectReason: reason,
    status: "boundary",
  };
}

function noMatchResponse(edition: DocsEdition): DocsAnswer {
  const editionLabel = edition === "shared" ? "Shared Hosting" : "Dedicated";
  return {
    answer: `I could not find a close match in the published ${editionLabel} guides. Try asking about SSL/TLS, files, PHP, WordPress, backups, security, or troubleshooting.`,
    citations: [],
    shouldRedirect: true,
    redirectReason: "No sufficiently relevant guide is published for the active edition.",
    status: "not-found",
  };
}

function limitedResponse(matches: GuideMatch[], reason: string): DocsAnswer {
  return {
    answer: "I found a related published guide, but I could not prepare a verified answer from it. Open the cited guide to follow the documented Web UI workflow.",
    citations: matches.slice(0, 2).map(citationFromMatch),
    shouldRedirect: true,
    redirectReason: reason,
    status: "limited",
  };
}

function answerContainsUnsafeInstructions(answer: string) {
  return unsafeAnswerPatterns.some((pattern) => pattern.test(answer));
}

function selectDistinctMatches(matches: GuideMatch[], limit = 2) {
  const seen = new Set<string>();
  return matches.filter((match) => {
    const key = `${match.slug}::${match.section}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, limit);
}

function composeVerifiedAnswer(matches: GuideMatch[], edition: DocsEdition): DocsAnswer {
  const selected = selectDistinctMatches(matches);
  const editionLabel = edition === "shared" ? "Shared Hosting" : "Dedicated";
  const answer = [
    `The closest published ${editionLabel} guidance is below. Follow the cited guide in the Brick Web UI for the full workflow.`,
    ...selected.map((match) => `### ${match.section}\n${match.excerpt.slice(0, 680)}`),
  ].join("\n\n").slice(0, MAX_ANSWER_LENGTH);

  if (answerContainsUnsafeInstructions(answer)) {
    return limitedResponse(selected, "The related published content is not suitable for an in-chat public answer.");
  }

  return {
    answer,
    citations: selected.map(citationFromMatch),
    shouldRedirect: false,
    redirectReason: "",
    status: "answer",
  };
}

export async function answerDocsQuestion(input: { question: string; edition: DocsEdition; requestKey?: string }) {
  const question = normalizeQuestion(input.question);
  checkRateLimit(input.requestKey ?? "public-docs");

  if (isPromptInjectionAttempt(question)) {
    await logUnansweredQuestion({
      edition: input.edition,
      question,
      reason: "prompt-injection",
    }).catch(() => {});
    return boundaryResponse("The assistant ignores attempts to alter its instructions and can only use published BrickDocs content.");
  }
  if (isRestrictedDocsQuestion(question)) {
    await logUnansweredQuestion({
      edition: input.edition,
      question,
      reason: "restricted-host-command",
    }).catch(() => {});
    return boundaryResponse("BrickDocs public guidance is intentionally limited to safe Web UI workflows.");
  }

  const matches = searchGuideContext(question, input.edition);
  if (!matches.length) {
    await logUnansweredQuestion({
      edition: input.edition,
      question,
      reason: "no-guide-match",
    }).catch(() => {});
    return noMatchResponse(input.edition);
  }

  const result = composeVerifiedAnswer(matches, input.edition);
  if (result.status === "limited") {
    await logUnansweredQuestion({
      edition: input.edition,
      question,
      reason: "limited-confidence",
    }).catch(() => {});
  }
  return result;
}
