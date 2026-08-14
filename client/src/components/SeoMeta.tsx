/* Brick Docs design reminder: every public guide needs discoverable, shareable, and canonical metadata on custom domains. */
import { useEffect } from "react";
import { trackDocsPageview } from "../lib/analytics";

interface SeoMetaProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  section?: string;
  keywords?: string[];
  image?: string;
}

const siteUrl = (import.meta.env.VITE_DOCS_SITE_URL || "https://docs.anything.tld").replace(/\/$/, "");
const defaultImage = `${siteUrl}/og/brick-docs.png`;

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function upsertLink(rel: string, href: string) {
  let link = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    document.head.appendChild(link);
  }
  link.href = href;
}

function upsertJsonLd(id: string, value: Record<string, unknown>) {
  let script = document.head.querySelector<HTMLScriptElement>(`script[data-seo-id="${id}"]`);
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.seoId = id;
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(value);
}

export default function SeoMeta({ title, description, path, type = "article", section, keywords = [], image = defaultImage }: SeoMetaProps) {
  useEffect(() => {
    const canonicalUrl = `${siteUrl}${path}`;
    const fullTitle = `${title} · Brick Docs`;
    document.title = fullTitle;
    upsertMeta("name", "description", description);
    upsertMeta("name", "keywords", keywords.join(", "));
    upsertMeta("name", "robots", "index,follow,max-image-preview:large");
    upsertMeta("property", "og:site_name", "Brick Docs");
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:image:alt", "Brick Docs knowledge base");
    upsertMeta("property", "og:locale", "en_US");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);
    if (section) upsertMeta("property", "article:section", section);
    if (keywords.length) upsertMeta("property", "article:tag", keywords.join(", "));

    const googleVerification = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION;
    const bingVerification = import.meta.env.VITE_BING_SITE_VERIFICATION;
    if (googleVerification) upsertMeta("name", "google-site-verification", googleVerification);
    if (bingVerification) upsertMeta("name", "msvalidate.01", bingVerification);

    upsertLink("canonical", canonicalUrl);
    trackDocsPageview(path, fullTitle);
    upsertJsonLd("brick-docs-page", {
      "@context": "https://schema.org",
      "@type": type === "article" ? "TechArticle" : "WebSite",
      name: fullTitle,
      description,
      url: canonicalUrl,
      image,
      publisher: { "@type": "Organization", name: "Brick" },
      ...(section ? { articleSection: section } : {}),
    });
  }, [description, image, keywords, path, section, title, type]);

  return null;
}
