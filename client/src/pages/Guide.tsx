/* Brick Docs design reminder: readable article center, persistent left taxonomy, right-side page map, version-aware routes, and explicit operator affordances. */
import { ArrowLeft, CheckCircle2, ChevronRight, Copy, Search, Terminal, Wrench } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { allGuides } from "../data/guides";

const versionOptions = [
  { value: "v0.9", label: "v0.9 stable" },
  { value: "v1.0-beta", label: "v1.0 beta" }
] as const;

const navigationGroups = [
  { label: "Getting Started", categories: ["Start Here", "Applications"] },
  { label: "Storage & Databases", categories: ["Data & Storage"] },
  { label: "Security & Network", categories: ["Security & Network"] },
  { label: "Operations & Recovery", categories: ["Operations"] }
];

export default function Guide() {
  const [, versionParams] = useRoute("/docs/:version/:slug");
  const [, shortParams] = useRoute("/docs/:slug");
  const [, navigate] = useLocation();
  const slug = versionParams?.slug ?? shortParams?.slug ?? "getting-started";
  const versionValue = versionParams?.version === "v1.0-beta" ? "v1.0-beta" : "v0.9";
  const guide = useMemo(() => allGuides.find((item) => item.slug === slug) ?? allGuides[0], [slug]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const filteredGuides = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();
    if (!normalized) return allGuides;
    return allGuides.filter((item) => `${item.title} ${item.category} ${item.intro}`.toLowerCase().includes(normalized));
  }, [searchQuery]);

  const switchVersion = (nextVersion: string) => {
    navigate(`/docs/${nextVersion}/${guide.slug}`);
  };

  const copyCode = async (code: string, index: number) => {
    await navigator.clipboard?.writeText(code);
    setCopiedIndex(index);
    window.setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="docs-shell">
      <header className="docs-topbar">
        <div className="docs-topbar__left">
          <Link href="/docs" className="docs-back-btn" title="Return to documentation home"><ArrowLeft size={16} /></Link>
          <Link href="/" className="docs-logo" aria-label="Brick Docs home">
            <div className="docs-logo__mark">B</div><span className="docs-logo__text">Brick</span><span className="docs-logo__badge">Docs</span>
          </Link>
          <span className="topbar-divider" />
          <span className="topbar-context">User documentation</span>
          <div className="version-selector">
            <select value={versionValue} onChange={(event) => switchVersion(event.target.value)} aria-label="Documentation version">
              {versionOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </div>
        </div>
        <div className="docs-topbar__right">
          <button className="search-trigger-pill" onClick={() => setSearchOpen(true)} aria-label="Search guides"><Search size={14} /><span>Search guides...</span><kbd>⌘K</kbd></button>
          <a href="https://github.com/devrahmanbd/flamehoster" target="_blank" rel="noreferrer" className="docs-github-link">GitHub</a>
        </div>
      </header>

      <div className="docs-container docs-container--guide">
        <aside className="docs-sidebar">
          <div className="sidebar-intro-line"><span className="status-dot" /> {versionValue === "v0.9" ? "Stable" : "Beta"} user docs</div>
          {navigationGroups.map((group) => {
            const items = allGuides.filter((item) => group.categories.includes(item.category));
            return <div className="sidebar-group" key={group.label}><div className="sidebar-group__title">{group.label}</div>{items.map((item) => <Link key={item.slug} href={`/docs/${versionValue}/${item.slug}`} className={item.slug === guide.slug ? "sidebar-link sidebar-link--active" : "sidebar-link"}><span>{item.title}</span><ChevronRight size={13} /></Link>)}</div>;
          })}
        </aside>

        <main className="docs-main docs-main--guide">
          <article className="guide-content-box">
            <div className="guide-meta-header"><span className="guide-category-tag">{guide.eyebrow}</span><span className="guide-read-time">{guide.read} read • {versionValue === "v0.9" ? "v0.9 stable" : "v1.0 beta"}</span></div>
            <h1 className="guide-title">{guide.title}</h1>
            <p className="guide-intro">{guide.intro}</p>
            <div className="guide-divider" />
            {guide.sections.map((section, idx) => <section key={section.title} id={`section-${idx + 1}`} className="guide-section-block"><div className="section-number">0{idx + 1}</div><div className="section-body"><h2>{section.title}</h2><p>{section.body}</p>{section.bullets && <ul className="guide-bullets">{section.bullets.map((bullet) => <li key={bullet}><CheckCircle2 size={15} className="bullet-icon" /><span>{bullet}</span></li>)}</ul>}{section.code && <div className="guide-terminal"><div className="terminal-header"><span><Terminal size={13} /> terminal shell</span><button onClick={() => copyCode(section.code!, idx)}><Copy size={13} />{copiedIndex === idx ? "Copied" : "Copy"}</button></div><pre><code>{section.code}</code></pre></div>}</div></section>)}
            <div className="guide-footer-callout"><Wrench size={18} /><div><strong>Need deeper verification?</strong><span>Run `brick-sentinel -cmd check` before applying production changes to record system state.</span></div></div>
          </article>
        </main>

        <aside className="guide-toc">
          <div className="guide-toc__title">ON THIS PAGE</div>
          <nav>{guide.sections.map((section, idx) => <a key={section.title} href={`#section-${idx + 1}`}><span>0{idx + 1}</span>{section.title}</a>)}</nav>
          <div className="guide-toc__rule" />
          <div className="guide-toc__meta"><span>DOCUMENT STATUS</span><strong>{versionValue === "v0.9" ? "Stable operator guide" : "Beta preview"}</strong><p>Procedures are written for administrators with host access.</p></div>
        </aside>
      </div>

      {searchOpen && <div className="search-modal-backdrop" onClick={() => setSearchOpen(false)}><div className="search-modal-card" onClick={(event) => event.stopPropagation()}><div className="search-modal-input-wrap"><Search size={18} /><input autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search databases, SSL, PHP, WordPress..." /><button onClick={() => setSearchOpen(false)}>ESC</button></div><div className="search-results-list">{filteredGuides.map((item) => <Link key={item.slug} href={`/docs/${versionValue}/${item.slug}`} className="search-result-item" onClick={() => setSearchOpen(false)}><div><span className="search-item-cat">{item.category}</span><h4>{item.title}</h4><p>{item.intro}</p></div><ChevronRight size={15} /></Link>)}</div></div></div>}
    </div>
  );
}
