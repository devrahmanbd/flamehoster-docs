import { ArrowLeft, ArrowRight, Check, Copy, Link2, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import DocsHeader from "../components/DocsHeader";
import DocsSearchDialog from "../components/DocsSearchDialog";
import DocsSidebar from "../components/DocsSidebar";
import SeoMeta from "../components/SeoMeta";
import { findGuide, getAdjacentGuides, getEditionHomeHref, getGuideHref, guidesForEdition, relatedGuides, type DocsEdition } from "../lib/docs";

interface GuideProps { edition: DocsEdition; slug: string; }

function sectionId(index: number) { return `section-${index + 1}`; }

export default function Guide({ edition, slug }: GuideProps) {
  const [, navigate] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [copiedPage, setCopiedPage] = useState(false);
  const [copiedCode, setCopiedCode] = useState<number | null>(null);
  const guide = findGuide(slug, edition);
  const adjacent = useMemo(() => guide ? getAdjacentGuides(guide.slug, edition) : { previous: undefined, next: undefined }, [edition, guide]);
  const related = useMemo(() => guide ? relatedGuides(guide, edition) : [], [edition, guide]);
  const changeEdition = (next: DocsEdition) => {
    const matchingGuide = findGuide(slug, next);
    navigate(matchingGuide ? getGuideHref(matchingGuide.slug, next) : getEditionHomeHref(next));
  };

  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [edition, slug]);
  if (!guide) {
    return (
      <div className="docs-app-shell">
        <SeoMeta title="Guide unavailable" description="This guide is not published in the selected BrickDocs edition." path={getEditionHomeHref(edition)} type="website" />
        <DocsHeader edition={edition} mobileOpen={mobileOpen} onToggleMobile={() => setMobileOpen((value) => !value)} onOpenSearch={() => setSearchOpen(true)} onEditionChange={changeEdition} />
        <div className="docs-page-grid">
          <DocsSidebar edition={edition} isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
          <main className="docs-main docs-reader" id="main-content">
            <section className="docs-unavailable" aria-labelledby="guide-unavailable-title">
              <p className="docs-eyebrow">Guide unavailable</p>
              <h1 id="guide-unavailable-title">This guide is not published for the selected edition.</h1>
              <p>Choose another published guide from the navigation, or return to the {edition === "shared" ? "Shared" : "Dedicated"} documentation overview.</p>
              <Link className="docs-primary-link" href={getEditionHomeHref(edition)}>View {edition === "shared" ? "Shared" : "Dedicated"} documentation</Link>
            </section>
          </main>
          <aside className="docs-on-page" aria-label="On this page"><p>DOCUMENTATION</p><span>Use the left navigation to find a published guide.</span></aside>
        </div>
        <DocsSearchDialog open={searchOpen} edition={edition} onClose={() => setSearchOpen(false)} />
      </div>
    );
  }

  const copyText = async (text: string, success: (value: boolean) => void) => {
    try { await navigator.clipboard.writeText(text); success(true); window.setTimeout(() => success(false), 1600); } catch { success(false); }
  };

  return (
    <div className="docs-app-shell">
      <SeoMeta title={guide.title} description={guide.intro} path={getGuideHref(guide.slug, edition)} type="article" section={guide.category} keywords={[guide.title, guide.category, "BrickDocs"]} />
      <DocsHeader edition={edition} mobileOpen={mobileOpen} onToggleMobile={() => setMobileOpen((value) => !value)} onOpenSearch={() => setSearchOpen(true)} onEditionChange={changeEdition} />
      <div className="docs-page-grid">
        <DocsSidebar edition={edition} activeSlug={guide.slug} isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <main className="docs-main docs-reader" id="main-content">
          <nav className="docs-breadcrumbs" aria-label="Breadcrumb"><Link href={getEditionHomeHref(edition)}>BrickDocs</Link><span>/</span><span>{guide.category}</span><span>/</span><strong>{guide.title}</strong></nav>
          <article>
            <header className="docs-article-header"><p className="docs-eyebrow">{guide.eyebrow}</p><h1>{guide.title}</h1><p>{guide.intro}</p><div className="docs-article-tools"><button type="button" onClick={() => copyText(window.location.href, setCopiedPage)}>{copiedPage ? <Check size={15} /> : <Link2 size={15} />}{copiedPage ? "Link copied" : "Copy page link"}</button><button type="button" onClick={() => setSearchOpen(true)}><Search size={15} />Search guides</button></div></header>
            <div className="docs-article-body">
              {guide.sections.map((section, index) => <section id={sectionId(index)} key={section.title} className="docs-article-section"><h2>{section.title}</h2><p>{section.body}</p>{section.bullets?.length ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}{section.code ? <div className="docs-code-block"><div><span>Panel reference</span><button type="button" onClick={() => copyText(section.code!, (success) => { if (success) { setCopiedCode(index); window.setTimeout(() => setCopiedCode(null), 1600); } })}>{copiedCode === index ? <Check size={14} /> : <Copy size={14} />}{copiedCode === index ? "Copied" : "Copy"}</button></div><pre><code>{section.code}</code></pre></div> : null}</section>)}
            </div>
            {related.length ? <section className="docs-related"><h2>Related guides</h2><div>{related.map((item) => <Link href={getGuideHref(item.slug, edition)} key={item.slug}>{item.title}<ArrowRight size={15} /></Link>)}</div></section> : null}
            <nav className="docs-prev-next" aria-label="Guide sequence">{adjacent.previous ? <Link href={getGuideHref(adjacent.previous.slug, edition)}><span><ArrowLeft size={15} />Previous</span><strong>{adjacent.previous.title}</strong></Link> : <span />}{adjacent.next ? <Link href={getGuideHref(adjacent.next.slug, edition)}><span>Next<ArrowRight size={15} /></span><strong>{adjacent.next.title}</strong></Link> : <span />}</nav>
          </article>
        </main>
        <aside className="docs-on-page" aria-label="On this page"><p>ON THIS PAGE</p><nav>{guide.sections.map((section, index) => <a key={section.title} href={`#${sectionId(index)}`}>{section.title}</a>)}</nav></aside>
      </div>
      <DocsSearchDialog open={searchOpen} edition={edition} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
