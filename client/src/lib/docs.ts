/* Brick Docs design reminder: keep public navigation task-based, predictable, and searchable; never expose host execution controls in the knowledge base. */
import { allGuides, type GuideArticle } from "../data/guides";

export type DocsVersion = "v0.9" | "v1.0-beta";

export const versionOptions: Array<{ value: DocsVersion; label: string; tone: "stable" | "beta" }> = [
  { value: "v0.9", label: "v0.9 Stable", tone: "stable" },
  { value: "v1.0-beta", label: "v1.0 Beta", tone: "beta" },
];

export const docsGroups = [
  {
    label: "Start here",
    description: "First steps and safe defaults",
    slugs: ["getting-started", "deploying-apps"],
  },
  {
    label: "Data & storage",
    description: "Databases, files, and recovery",
    slugs: ["databases", "file-manager", "backups"],
  },
  {
    label: "Security & network",
    description: "TLS, MFA, and operator controls",
    slugs: ["ssl-tls", "security"],
  },
  {
    label: "Application runtime",
    description: "PHP, WordPress, and CMS hosting",
    slugs: ["php-management", "wordpress-cms"],
  },
  {
    label: "Operations",
    description: "Diagnostics and safe maintenance",
    slugs: ["troubleshooting"],
  },
] as const;

export function getGuideHref(slug: string, version: DocsVersion = "v0.9") {
  return `/docs/${version}/${slug}`;
}

export function findGuide(slug: string): GuideArticle {
  return allGuides.find((guide) => guide.slug === slug) ?? allGuides[0];
}

export function searchGuides(query: string): GuideArticle[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return allGuides;

  return allGuides.filter((guide) => {
    const searchable = [
      guide.title,
      guide.category,
      guide.eyebrow,
      guide.intro,
      ...guide.sections.flatMap((section) => [section.title, section.body, ...(section.bullets ?? []), section.code ?? ""]),
    ]
      .join(" ")
      .toLowerCase();
    return searchable.includes(normalized);
  });
}

export function getNextGuide(currentSlug: string) {
  const currentIndex = allGuides.findIndex((guide) => guide.slug === currentSlug);
  if (currentIndex < 0 || currentIndex === allGuides.length - 1) return undefined;
  return allGuides[currentIndex + 1];
}

export function getPreviousGuide(currentSlug: string) {
  const currentIndex = allGuides.findIndex((guide) => guide.slug === currentSlug);
  if (currentIndex <= 0) return undefined;
  return allGuides[currentIndex - 1];
}
