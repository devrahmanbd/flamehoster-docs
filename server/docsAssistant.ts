import { TRPCError } from "@trpc/server";
import { invokeLLM } from "./_core/llm";
import { allGuides } from "../client/src/data/guides";

export type DocsVersion = "v0.9" | "v1.0-beta";

type GuideMatch = {
  slug: string;
  title: string;
  section: string;
  excerpt: string;
  score: number;
};

type DocsAnswer = {
  answer: string;
  citations: Array<{ slug: string; title: string; section: string }>;
  shouldRedirect: boolean;
  redirectReason: string;
};

const MAX_QUESTION_LENGTH = 600;
const MAX_CONTEXT_LENGTH = 12_000;
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 12;
const requestWindows = new Map<string, { startedAt: number; count: number }>();

const restrictedPatterns = [
  /\b(ssh|sshd|sudo|root shell|terminal|command line|cli|console access)\b/i,
  /\b(run|execute|invoke)\s+(a\s+)?(command|script|binary|process)\b/i,
  /\b(docker|kubectl|iptables|nft|systemctl)\s+(run|exec|restart|stop|start|apply)\b/i,
  /\b(read|write|edit|delete|change)\s+.*\b(host|kernel|system files?)\b/i,
];

function normalizeQuestion(question: string) {
  return question.trim().replace(/\s+/g, " ").slice(0, MAX_QUESTION_LENGTH);
}

function checkRateLimit(requestKey: string) {
  const now = Date.now();
  const current = requestWindows.get(requestKey);
  if (!current || now - current.startedAt > WINDOW_MS) {
    requestWindows.set(requestKey, { startedAt: now, count: 1 });
    return;
  }
  if (current.count >= MAX_REQUESTS_PER_WINDOW) {
    throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Please wait a moment before asking another documentation question." });
  }
  current.count += 1;
}

function tokenize(value: string) {
  return value.toLowerCase().split(/[^a-z0-9]+/).filter((token) => token.length > 2);
}

export function isRestrictedDocsQuestion(question: string) {
  return restrictedPatterns.some((pattern) => pattern.test(question));
}

export function searchGuideContext(question: string, limit = 5): GuideMatch[] {
  const terms = tokenize(question);
  const matches: GuideMatch[] = [];

  for (const guide of allGuides) {
    for (const section of guide.sections) {
      const searchable = `${guide.title} ${guide.category} ${guide.intro} ${section.title} ${section.body} ${(section.bullets ?? []).join(" ")}`.toLowerCase();
      const score = terms.reduce((total, term) => total + (searchable.includes(term) ? 1 : 0), 0);
      if (score > 0) {
        matches.push({
          slug: guide.slug,
          title: guide.title,
          section: section.title,
          excerpt: section.body,
          score,
        });
      }
    }
  }

  return matches.sort((a, b) => b.score - a.score).slice(0, limit);
}

function buildContext(matches: GuideMatch[]) {
  let context = "";
  for (const match of matches) {
    const entry = `GUIDE: ${match.title}\nSLUG: ${match.slug}\nSECTION: ${match.section}\nCONTENT: ${match.excerpt}\n\n`;
    if (context.length + entry.length > MAX_CONTEXT_LENGTH) break;
    context += entry;
  }
  return context;
}

function parseAnswer(rawContent: unknown): DocsAnswer {
  const content = typeof rawContent === "string"
    ? rawContent
    : Array.isArray(rawContent)
      ? rawContent.filter((part): part is { type: "text"; text: string } => Boolean(part && typeof part === "object" && "type" in part && part.type === "text" && "text" in part && typeof part.text === "string")).map((part) => part.text).join("")
      : "";
  if (!content) {
    throw new Error("The documentation assistant returned an invalid response.");
  }
  const parsed = JSON.parse(content) as Partial<DocsAnswer>;
  if (typeof parsed.answer !== "string" || !Array.isArray(parsed.citations)) {
    throw new Error("The documentation assistant returned an incomplete response.");
  }
  return {
    answer: parsed.answer,
    citations: parsed.citations.filter((citation): citation is { slug: string; title: string; section: string } => Boolean(citation && typeof citation.slug === "string" && typeof citation.title === "string" && typeof citation.section === "string")),
    shouldRedirect: parsed.shouldRedirect === true,
    redirectReason: typeof parsed.redirectReason === "string" ? parsed.redirectReason : "",
  };
}

export async function answerDocsQuestion(input: { question: string; version: DocsVersion; requestKey?: string }) {
  const question = normalizeQuestion(input.question);
  checkRateLimit(input.requestKey ?? "public-docs");

  if (isRestrictedDocsQuestion(question)) {
    return {
      answer: "I can help you find a Brick Web UI guide, but I cannot provide terminal, SSH, shell, root, command-line, or host-level instructions. Choose the relevant panel section instead, such as Security, Applications, Databases, File Manager, or Operations.",
      citations: [],
      shouldRedirect: true,
      redirectReason: "Brick public documentation is intentionally limited to safe Web UI workflows.",
    } satisfies DocsAnswer;
  }

  const matches = searchGuideContext(question);
  if (!matches.length) {
    return {
      answer: "I could not find a close match in the published Brick Web UI guides. Try asking about applications, databases, SSL/TLS, files, PHP, WordPress, backups, security, or troubleshooting.",
      citations: [],
      shouldRedirect: true,
      redirectReason: "No sufficiently relevant public guide was found.",
    } satisfies DocsAnswer;
  }

  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: [
            "You are the Brick Documentation Assistant.",
            "Answer only from the supplied Brick public Web UI guide context.",
            "Do not invent capabilities, endpoints, settings, plan features, shell access, terminal instructions, SSH instructions, root instructions, or host-level operations.",
            "Brick public documentation is for shared hosting with jailed shell boundaries and dedicated hosting with minimal user access outside Brick-managed binaries.",
            "If the question asks for terminal or host access, set shouldRedirect to true and explain the boundary briefly.",
            "Keep answers concise, practical, and written as web UI steps.",
            "Return JSON matching the requested schema.",
          ].join("\n"),
        },
        {
          role: "user",
          content: `Question: ${question}\n\nPublished guide context:\n${buildContext(matches)}`,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "brick_docs_answer",
          strict: true,
          schema: {
            type: "object",
            properties: {
              answer: { type: "string" },
              citations: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    slug: { type: "string" },
                    title: { type: "string" },
                    section: { type: "string" },
                  },
                  required: ["slug", "title", "section"],
                  additionalProperties: false,
                },
              },
              shouldRedirect: { type: "boolean" },
              redirectReason: { type: "string" },
            },
            required: ["answer", "citations", "shouldRedirect", "redirectReason"],
            additionalProperties: false,
          },
        },
      },
    });

    const content = response.choices[0]?.message?.content;
    const parsed = parseAnswer(content);
    const allowedCitations = new Set(matches.map((match) => `${match.slug}::${match.section}`));
    parsed.citations = parsed.citations.filter((citation) => allowedCitations.has(`${citation.slug}::${citation.section}`));
    return parsed;
  } catch (error) {
    console.error("[DocsAssistant] Failed to answer question", error);
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "The documentation assistant is temporarily unavailable. Please use the guide search instead." });
  }
}
