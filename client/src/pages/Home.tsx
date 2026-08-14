/* Brick Docs design reminder: reference-inspired documentation index, light reading canvas, precise typography, visible route affordances, and minimal product marketing. */
import { ArrowRight, BookOpen, ChevronRight, Github, Search, ShieldCheck, Sun, Terminal, Wrench } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { allGuides } from "../data/guides";

const heroImage = "/manus-storage/brick-docs-hero_c9ca5dec.jpg";

const groups = [
  { label: "Start here", slugs: ["getting-started", "deploying-apps"] },
  { label: "Data & storage", slugs: ["databases", "file-manager", "backups"] },
  { label: "Security & network", slugs: ["ssl-tls", "security"] },
  { label: "Applications", slugs: ["php-management", "wordpress-cms"] },
  { label: "Operations", slugs: ["troubleshooting"] }
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = window.localStorage.getItem("brick-docs-theme") as "light" | "dark" | null;
    const preferred = stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(preferred);
    document.documentElement.dataset.theme = preferred;
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filteredGuides = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return allGuides.slice(0, 6);
    return allGuides.filter((guide) => `${guide.title} ${guide.category} ${guide.intro}`.toLowerCase().includes(normalized));
  }, [query]);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("brick-docs-theme", next);
  };

  return (
    <div className="docs-shell">
      <header className="docs-topbar">
        <div className="docs-topbar__left">
          <Link href="/" className="docs-logo" aria-label="Brick Docs home">
            <div className="docs-logo__mark">B</div>
            <span className="docs-logo__text">Brick</span>
            <span className="docs-logo__badge">Docs</span>
          </Link>
          <span className="topbar-divider" />
          <span className="topbar-context">Documentation</span>
          <span className="version-chip">v0.9 stable</span>
        </div>
        <div className="docs-topbar__right">
          <button className="search-trigger-pill" onClick={() => setSearchOpen(true)} aria-label="Search documentation">
            <Search size={14} />
            <span>Search docs</span>
            <kbd>⌘K</kbd>
          </button>
          <a className="docs-github-link" href="https://github.com/devrahmanbd/flamehoster" target="_blank" rel="noreferrer">
            <Github size={15} /> GitHub
          </a>
          <button className="theme-toggle-simple" onClick={toggleTheme} aria-label="Toggle theme">
            <Sun size={15} />
          </button>
        </div>
      </header>

      <div className="docs-container docs-container--home">
        <aside className="docs-sidebar docs-sidebar--home">
          <div className="sidebar-intro-line"><span className="status-dot" /> User documentation</div>
          {groups.map((group) => (
            <div className="sidebar-group" key={group.label}>
              <div className="sidebar-group__title">{group.label}</div>
              {group.slugs.map((slug) => {
                const guide = allGuides.find((item) => item.slug === slug)!;
                return <Link key={slug} href={`/docs/${slug}`} className="sidebar-link"><span>{guide.title}</span><ChevronRight size={13} /></Link>;
              })}
            </div>
          ))}
          <div className="sidebar-note">
            <ShieldCheck size={15} />
            <span>Production guidance is written for operators who own the host.</span>
          </div>
        </aside>

        <main className="docs-main docs-main--home">
          <section className="docs-welcome">
            <div className="welcome-copy">
              <div className="eyebrow-row"><span className="status-dot" /> Brick User Documentation</div>
              <h1>Run the panel.<br /><em>Know the state.</em></h1>
              <p>Task-focused guides for installing Brick, deploying applications, securing tenants, and recovering production systems without guesswork.</p>
              <div className="welcome-actions">
                <Link href="/docs/getting-started" className="button-primary">Start with installation <ArrowRight size={15} /></Link>
                <Link href="/docs/deploying-apps" className="button-secondary">Deploy an app</Link>
              </div>
            </div>
            <div className="welcome-art" style={{ backgroundImage: `url(${heroImage})` }} aria-hidden="true">
              <div className="art-label"><Terminal size={14} /> operator docs</div>
              <div className="art-caption">State-aware by design</div>
            </div>
          </section>

          <section className="guide-index-section">
            <div className="section-heading-row">
              <div>
                <span className="section-kicker">USER GUIDE</span>
                <h2>Find the exact task.</h2>
              </div>
              <span className="section-count">{allGuides.length} guides · v0.9</span>
            </div>

            <div className="guide-index-grid">
              {allGuides.map((guide, index) => (
                <Link key={guide.slug} href={`/docs/${guide.slug}`} className="guide-index-card">
                  <div className="guide-index-card__top"><span>0{index + 1}</span><span>{guide.read}</span></div>
                  <h3>{guide.title}</h3>
                  <p>{guide.intro}</p>
                  <div className="guide-index-card__footer"><span>{guide.category}</span><ArrowRight size={14} /></div>
                </Link>
              ))}
            </div>
          </section>

          <section className="docs-note-grid">
            <div className="docs-note-card"><BookOpen size={17} /><div><strong>Stable and beta guides</strong><p>Use the version selector on every article to distinguish current operator procedures from upcoming behavior.</p></div></div>
            <div className="docs-note-card"><Wrench size={17} /><div><strong>Need maintainer docs?</strong><p>Internal architecture and release notes live outside the public docs repository.</p></div></div>
          </section>
        </main>
      </div>

      {searchOpen && (
        <div className="search-modal-backdrop" onClick={() => setSearchOpen(false)}>
          <div className="search-modal-card" onClick={(event) => event.stopPropagation()}>
            <div className="search-modal-input-wrap"><Search size={18} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search databases, SSL, PHP, WordPress..." /><button onClick={() => setSearchOpen(false)}>ESC</button></div>
            <div className="search-results-list">
              {filteredGuides.map((guide) => <Link href={`/docs/${guide.slug}`} key={guide.slug} className="search-result-item" onClick={() => setSearchOpen(false)}><div><span className="search-item-cat">{guide.category}</span><h4>{guide.title}</h4><p>{guide.intro}</p></div><ChevronRight size={15} /></Link>)}
              {!filteredGuides.length && <div className="search-empty-state">No public guide matches “{query}”. Try “database”, “SSL”, “PHP”, or “WordPress”.</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
