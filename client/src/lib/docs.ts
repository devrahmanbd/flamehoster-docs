/*
 * BrickDocs navigation contract.
 * Public documentation is edition-aware by design. The selected edition lives
 * in the URL, so links are shareable and browser navigation remains honest.
 */
import { publishedGuides, type DocsEdition, type GuideArticle } from "../data/guides";

export type { DocsEdition };
export type DocsVersion = "shared" | "dedicated";

export const editionOptions: Array<{
  value: DocsEdition;
  label: string;
  description: string;
}> = [
  { value: "shared", label: "Shared Hosting", description: "Guides for managed websites and hosting accounts" },
  { value: "dedicated", label: "Dedicated", description: "Guides for dedicated application and infrastructure workloads" },
];

export const docsGroups = [
  { id: "start", label: "Start here", description: "First-time orientation and account safety", slugs: ["getting-started"] },
  { id: "websites", label: "Websites & files", description: "Domains, files, PHP, and CMS workflows", slugs: ["ssl-tls", "file-manager", "php-management", "wordpress-cms"] },
  { id: "data", label: "Data & recovery", description: "Data services and recovery planning", slugs: ["databases", "backups"] },
  { id: "security", label: "Security", description: "Account protection and service hardening", slugs: ["security"] },
  { id: "operations", label: "Operations", description: "Applications and guided diagnostics", slugs: ["deploying-apps", "troubleshooting"] },
] as const;

export function normalizeEdition(value?: string): DocsEdition {
  return value === "dedicated" ? "dedicated" : "shared";
}

export function getGuideHref(slug: string, edition: DocsEdition = "shared") {
  return `/docs/${edition}/${slug}`;
}

export function getEditionHomeHref(edition: DocsEdition) {
  return `/docs/${edition}`;
}

export function guidesForEdition(edition: DocsEdition): GuideArticle[] {
  return publishedGuides.filter((guide) => guide.editions?.includes(edition));
}

export function groupsForEdition(edition: DocsEdition) {
  const available = new Set(guidesForEdition(edition).map((guide) => guide.slug));
  return docsGroups
    .map((group) => ({
      ...group,
      guides: group.slugs
        .filter((slug) => available.has(slug))
        .map((slug) => publishedGuides.find((guide) => guide.slug === slug))
        .filter((guide): guide is GuideArticle => Boolean(guide)),
    }))
    .filter((group) => group.guides.length > 0);
}

export function findGuide(slug: string, edition: DocsEdition = "shared"): GuideArticle | undefined {
  return guidesForEdition(edition).find((guide) => guide.slug === slug);
}

export function searchGuides(query: string, edition: DocsEdition): GuideArticle[] {
  const normalized = query.trim().toLowerCase();
  const guides = guidesForEdition(edition);
  if (!normalized) return guides;

  return guides.filter((guide) => {
    const searchable = [
      guide.title,
      guide.category,
      guide.eyebrow,
      guide.intro,
      ...guide.sections.flatMap((section) => [section.title, section.body, ...(section.bullets ?? []), section.code ?? ""]),
    ].join(" ").toLowerCase();
    return searchable.includes(normalized);
  });
}

export function getAdjacentGuides(currentSlug: string, edition: DocsEdition) {
  const guides = guidesForEdition(edition);
  const currentIndex = guides.findIndex((guide) => guide.slug === currentSlug);
  return {
    previous: currentIndex > 0 ? guides[currentIndex - 1] : undefined,
    next: currentIndex >= 0 && currentIndex < guides.length - 1 ? guides[currentIndex + 1] : undefined,
  };
}

export function relatedGuides(guide: GuideArticle, edition: DocsEdition): GuideArticle[] {
  const available = new Map(guidesForEdition(edition).map((item) => [item.slug, item]));
  return (guide.relatedSlugs ?? []).map((slug) => available.get(slug)).filter((item): item is GuideArticle => Boolean(item));
}
