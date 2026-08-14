/* Brick Docs design reminder: the article is the product—keep the center measure calm, make navigation obvious, and never imply public terminal access. */
import { ArrowLeft, ArrowRight, CheckCircle2, Clipboard, Copy, FileText, Link2, Terminal, Wrench } from "lucide-react";
import gsap from "gsap";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import DocsAssistantDrawer from "../components/DocsAssistantDrawer";
import DocsHeader from "../components/DocsHeader";
import DocsSearchDialog from "../components/DocsSearchDialog";
import DocsSidebar from "../components/DocsSidebar";
import SeoMeta from "../components/SeoMeta";
import { getGuideHref, getNextGuide, getPreviousGuide, findGuide, type DocsVersion } from "../lib/docs";

export default function Guide() {
  const [, versionParams] = useRoute("/docs/:version/:slug");
  const [, shortParams] = useRoute("/docs/:slug");
  const [, navigate] = useLocation();
  const slug = versionParams?.slug ?? shortParams?.slug ?? "getting-started";
  const version: DocsVersion = versionParams?.version === "v1.0-beta" ? "v1.0-beta" : "v0.9";
  const guide = useMemo(() => findGuide(slug), [slug]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [pageCopied, setPageCopied] = useState(false);
  const nextGuide = getNextGuide(guide.slug);
  const previousGuide = getPreviousGuide(guide.slug);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".kb-main--article");
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        [".kb-article__meta", ".kb-article h1", ".kb-article__intro", ".kb-article__tools", ".kb-article-section", ".kb-article-callout", ".kb-article-footer"],
        { y: 12 },
        { y: 0, duration: 0.56, stagger: 0.045, ease: "power3.out", clearProps: "transform" },
      );
    }, root);
    return () => context.revert();
  }, [guide.slug]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setAssistantOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const copyCode = async (code: string, index: number) => {
    await navigator.clipboard?.writeText(code);
    setCopiedIndex(index);
    window.setTimeout(() => setCopiedIndex(null), 1500);
  };

  const copyPageLink = async () => {
    await navigator.clipboard?.writeText(window.location.href);
    setPageCopied(true);
    window.setTimeout(() => setPageCopied(false), 1500);
  };

  const changeVersion = (nextVersion: DocsVersion) => navigate(getGuideHref(guide.slug, nextVersion));

  return (
    <div className="kb-shell">
      <SeoMeta title={guide.title} description={guide.intro} path={`/docs/${version}/${guide.slug}`} type="article" section={guide.category} keywords={[guide.title, guide.category, "Brick Web UI", "hosting panel", "operator guide"]} />
      <DocsHeader isGuide mobileOpen={mobileOpen} onToggleMobile={() => setMobileOpen((open) => !open)} onOpenSearch={() => setSearchOpen(true)} />
      <div className={`kb-layout kb-layout--guide ${sidebarCollapsed ? "kb-layout--sidebar-collapsed" : ""}`}>
        <DocsSidebar version={version} activeSlug={guide.slug} open={mobileOpen} collapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed((collapsed) => !collapsed)} onNavigate={() => setMobileOpen(false)} onVersionChange={changeVersion} />
        <button className="kb-sidebar-scrim" aria-label="Close navigation" aria-hidden={!mobileOpen} tabIndex={mobileOpen ? 0 : -1} onClick={() => setMobileOpen(false)} />
        <main className="kb-main kb-main--article">
          <div className="kb-breadcrumbs"><Link href="/docs">Brick Docs</Link><ChevronSlash /><Link href={`/docs/${version}/${guide.slug}`}>{version === "v0.9" ? "Stable" : "Beta"}</Link><ChevronSlash /><span>{guide.title}</span></div>
          <article className="kb-article">
            <div className="kb-article__meta"><span className="kb-article-tag">{guide.eyebrow}</span><span>{guide.read} read</span><span className="kb-article-status"><i /> {version === "v0.9" ? "Stable operator guide" : "Beta preview"}</span></div>
            <h1>{guide.title}</h1>
            <p className="kb-article__intro">{guide.intro}</p>
            <div className="kb-article__tools"><button className="kb-article-tool" onClick={copyPageLink}>{pageCopied ? <Clipboard size={15} /> : <Link2 size={15} />} {pageCopied ? "Link copied" : "Copy link"}</button><button className="kb-article-tool" onClick={() => setAssistantOpen(true)}><FileText size={15} /> Ask about this guide</button></div>
            <div className="kb-article__rule" />
            {guide.sections.map((section, index) => <section className="kb-article-section" id={`section-${index + 1}`} key={section.title}><div className="kb-article-section__number">{String(index + 1).padStart(2, "0")}</div><div className="kb-article-section__body"><h2>{section.title}</h2><p>{section.body}</p>{section.bullets && <ul className="kb-check-list">{section.bullets.map((bullet) => <li key={bullet}><CheckCircle2 size={16} /><span>{bullet}</span></li>)}</ul>}{section.code && <div className="kb-reference-block"><div className="kb-reference-block__header"><span><Terminal size={14} /> Reference snippet</span><button onClick={() => copyCode(section.code!, index)}>{copiedIndex === index ? <Clipboard size={14} /> : <Copy size={14} />}{copiedIndex === index ? "Copied" : "Copy"}</button></div><pre><code>{section.code}</code></pre><small>Examples are documentation references only. This site does not provide terminal access.</small></div>}</div></section>)}
            <div className="kb-article-callout"><Wrench size={18} /><div><strong>Operate from the Brick panel</strong><span>Use the corresponding panel screen and its visible status indicators to confirm changes. Keep recovery checkpoints and operator notes with every production change.</span></div></div>
            <footer className="kb-article-footer"><div className="kb-article-footer__nav">{previousGuide ? <Link href={getGuideHref(previousGuide.slug, version)} className="kb-next-link kb-next-link--previous"><span><ArrowLeft size={15} /> Previous</span><strong>{previousGuide.title}</strong></Link> : <span />}{nextGuide ? <Link href={getGuideHref(nextGuide.slug, version)} className="kb-next-link kb-card-cinematic"><span>Next guide <ArrowRight size={15} /></span><strong>{nextGuide.title}</strong></Link> : <span />}</div><p><button className="kb-text-button" onClick={copyPageLink}>{pageCopied ? "Link copied" : "Copy this page"}</button></p></footer>
          </article>
        </main>
        <aside className="kb-toc" aria-label="On this page"><div className="kb-toc__head"><div><div className="kb-toc__label">GUIDE MAP</div><strong>On this page</strong></div><span className="kb-toc__count">{String(guide.sections.length).padStart(2, "0")} SECTIONS</span></div><p className="kb-toc__intro">Follow the operator checkpoints in sequence, then confirm the visible panel state.</p><div className="kb-toc__progress" aria-hidden="true"><span style={{ width: `${Math.min(100, Math.max(24, guide.sections.length * 18))}%` }} /></div><nav>{guide.sections.map((section, index) => <a href={`#section-${index + 1}`} key={section.title}><span>{String(index + 1).padStart(2, "0")}</span><b>{section.title}</b><i>↗</i></a>)}</nav><div className="kb-toc__divider" /><div className="kb-toc__status"><span>DOCUMENT STATUS</span><strong>{version === "v0.9" ? "Stable operator guide" : "Beta preview"}</strong><p>Written for administrators operating Brick through the panel.</p></div></aside>
      </div>
      <DocsSearchDialog open={searchOpen} query={searchQuery} version={version} onQueryChange={setSearchQuery} onClose={() => setSearchOpen(false)} />
      <DocsAssistantDrawer open={assistantOpen} version={version} onOpen={() => setAssistantOpen(true)} onClose={() => setAssistantOpen(false)} />
    </div>
  );
}

function ChevronSlash() {
  return <span className="kb-breadcrumb-separator">/</span>;
}
