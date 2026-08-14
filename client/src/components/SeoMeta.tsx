/* Brick Docs design reminder: every public guide needs a descriptive title, canonical URL, and social metadata so a custom docs domain remains discoverable. */
import { useEffect } from "react";

interface SeoMetaProps {
  title: string;
  description: string;
  path: string;
}

const siteUrl = (import.meta.env.VITE_DOCS_SITE_URL || "https://docs.anything.tld").replace(/\/$/, "");

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

export default function SeoMeta({ title, description, path }: SeoMetaProps) {
  useEffect(() => {
    const canonicalUrl = `${siteUrl}${path}`;
    document.title = `${title} · Brick Docs`;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", `${title} · Brick Docs`);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "article");
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("name", "twitter:card", "summary");
    upsertMeta("name", "twitter:title", `${title} · Brick Docs`);
    upsertMeta("name", "twitter:description", description);
    const googleVerification = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION;
    const bingVerification = import.meta.env.VITE_BING_SITE_VERIFICATION;
    if (googleVerification) upsertMeta("name", "google-site-verification", googleVerification);
    if (bingVerification) upsertMeta("name", "msvalidate.01", bingVerification);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonicalUrl;
  }, [description, path, title]);

  return null;
}
