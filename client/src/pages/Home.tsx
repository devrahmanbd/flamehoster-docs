/* Brick Docs design reminder: knowledge-base first, calm reading canvas, clear task taxonomy, no terminal access, and a restrained reference-inspired landing page. */
import { ArrowRight, BookOpen, ChevronRight, Layers3, Search, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import DocsAssistantDrawer from "../components/DocsAssistantDrawer";
import DocsHeader from "../components/DocsHeader";
import DocsSearchDialog from "../components/DocsSearchDialog";
import DocsSidebar from "../components/DocsSidebar";
import SeoMeta from "../components/SeoMeta";
import { allGuides } from "../data/guides";
import { getGuideHref, type DocsVersion } from "../lib/docs";

const heroImage = "/manus-storage/brick-docs-hero_c9ca5dec.jpg";

export default function Home() {
  const [version, setVersion] = useState<DocsVersion>("v0.9");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filteredGuides = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return allGuides.slice(0, 6);
    return allGuides.filter((guide) => `${guide.title} ${guide.category} ${guide.intro}`.toLowerCase().includes(value));
  }, [query]);

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

  return (
    <div className="kb-shell">
      <SeoMeta title="Knowledge base for operators" description="Task-focused Brick Web UI documentation for shared hosting, dedicated hosting, application deployment, databases, SSL/TLS, backups, and security." path="/docs" type="website" section="Brick Web UI" keywords={["Brick hosting panel", "shared hosting", "dedicated hosting", "web UI documentation", "application deployment", "SSL", "databases", "backups"]} />
      <DocsHeader version={version} mobileOpen={mobileOpen} onToggleMobile={() => setMobileOpen((open) => !open)} onOpenSearch={() => setSearchOpen(true)} onOpenAssistant={() => setAssistantOpen(true)} onVersionChange={setVersion} />
      <div className="kb-layout kb-layout--home">
        <DocsSidebar version={version} open={mobileOpen} onNavigate={() => setMobileOpen(false)} />
        <main className="kb-main kb-main--home">
          <div className="kb-breadcrumbs"><Link href="/">Brick Docs</Link><ChevronRight size={14} /><span>Public user documentation</span></div>
          <section className="kb-hero">
            <div className="kb-hero__copy">
              <div className="kb-eyebrow"><span className="kb-status-dot" /> Brick user documentation</div>
              <h1>Run the panel.<br /><em>Know the state.</em></h1>
              <p>Task-focused guidance for installing Brick, deploying applications, protecting tenants, and operating production systems with fewer surprises.</p>
              <div className="kb-hero__actions"><Link href={getGuideHref("getting-started", version)} className="kb-button kb-button--primary">Start with installation <ArrowRight size={16} /></Link><button className="kb-button kb-button--quiet" onClick={() => setSearchOpen(true)}><Search size={16} /> Search the guides</button></div>
              <div className="kb-hero__proof"><span><ShieldCheck size={15} /> Operator-first</span><span><Layers3 size={15} /> {allGuides.length} public guides</span><span><BookOpen size={15} /> {version === "v0.9" ? "Stable channel" : "Beta channel"}</span></div>
            </div>
            <div className="kb-hero__art" style={{ backgroundImage: `linear-gradient(180deg, rgba(20,31,44,.08), rgba(20,31,44,.75)), url(${heroImage})` }} aria-label="Abstract Brick infrastructure illustration"><div className="kb-hero__art-label">STATE-AWARE KNOWLEDGE</div><div className="kb-hero__art-caption">A calm route from first boot to reliable operations.</div></div>
          </section>

          <section className="kb-home-section">
            <div className="kb-section-heading"><div><span className="kb-section-kicker">PUBLIC GUIDE INDEX</span><h2>Find the exact task.</h2><p>Browse by the kind of change you need to make, not by internal system names.</p></div><span className="kb-section-count">{allGuides.length} guides</span></div>
            <div className="kb-guide-grid">{allGuides.map((guide, index) => <Link key={guide.slug} href={getGuideHref(guide.slug, version)} className="kb-guide-card"><div className="kb-guide-card__top"><span>0{index + 1}</span><span>{guide.read}</span></div><h3>{guide.title}</h3><p>{guide.intro}</p><div className="kb-guide-card__footer"><span>{guide.category}</span><ArrowRight size={15} /></div></Link>)}</div>
          </section>

          <section className="kb-helper-band"><div className="kb-helper-band__icon"><Sparkles size={18} /></div><div><span className="kb-section-kicker">OPTIONAL DOCUMENTATION HELPER</span><h2>Need a nudge, not a console?</h2><p>Ask about a public guide and get routed to the relevant page. The helper never runs commands or touches your host.</p></div><button className="kb-button kb-button--quiet" onClick={() => setAssistantOpen(true)}>Ask docs <ArrowRight size={16} /></button></section>

          <section className="kb-home-search-preview"><div className="kb-section-heading"><div><span className="kb-section-kicker">START WITH A QUERY</span><h2>Search the knowledge base.</h2></div><button className="kb-text-button" onClick={() => setSearchOpen(true)}>Open full search <ArrowRight size={15} /></button></div><div className="kb-inline-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try databases, SSL, backups, PHP, or WordPress" /><kbd>⌘ K</kbd></div><div className="kb-search-preview-list">{filteredGuides.slice(0, 4).map((guide) => <Link key={guide.slug} href={getGuideHref(guide.slug, version)} className="kb-search-preview-item"><span><strong>{guide.title}</strong><small>{guide.category} · {guide.read}</small></span><ArrowRight size={15} /></Link>)}</div></section>
        </main>
      </div>
      <DocsSearchDialog open={searchOpen} query={query} version={version} onQueryChange={setQuery} onClose={() => setSearchOpen(false)} />
      <DocsAssistantDrawer open={assistantOpen} version={version} onClose={() => setAssistantOpen(false)} />
    </div>
  );
}
