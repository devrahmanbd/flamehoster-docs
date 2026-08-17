import { ArrowRight, BookOpen, ChevronRight, Database, ExternalLink, FileText, Gauge, Layers3, LockKeyhole, RefreshCw, Search, Server, ShieldCheck, Sparkles, Workflow, Terminal } from "lucide-react";
import gsap from "gsap";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import DocsAssistantDrawer from "../components/DocsAssistantDrawer";
import DocsHeader from "../components/DocsHeader";
import DocsSearchDialog from "../components/DocsSearchDialog";
import DocsSidebar from "../components/DocsSidebar";
import SeoMeta from "../components/SeoMeta";
import { allGuides } from "../data/guides";
import { getGuideHref, docsGroups, type DocsVersion } from "../lib/docs";

export default function Home() {
  const [version, setVersion] = useState<DocsVersion>("v0.9");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const set = new Set(allGuides.map((g) => g.category));
    return ["All", ...Array.from(set)];
  }, []);

  const filteredGuides = useMemo(() => {
    return allGuides.filter((guide) => {
      const matchesQuery = !query.trim() || `${guide.title} ${guide.category} ${guide.intro}`.toLowerCase().includes(query.trim().toLowerCase());
      const matchesCategory = selectedCategory === "All" || guide.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, selectedCategory]);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".kb-main--home");
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        [".kb-kb-header", ".kb-domain-grid", ".kb-start-here", ".kb-guide-list-item", ".kb-kb-sidebar-panel"],
        { y: 12, opacity: 0.92 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: "power3.out", clearProps: "transform" },
      );
    }, root);
    return () => context.revert();
  }, [selectedCategory, query]);

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
      <SeoMeta title="Brick Docs — Knowledge Base & Operator Manual" description="Official knowledge base and web UI guides for Brick hosting panel. Task-focused documentation for shared hosting, databases, SSL/TLS, file management, and system maintenance." path="/docs" type="website" section="Brick Knowledge Base" keywords={["Brick documentation", "hosting panel", "shared hosting", "database guides", "SSL configuration", "backups"]} />
      <DocsHeader mobileOpen={mobileOpen} onToggleMobile={() => setMobileOpen((open) => !open)} onOpenSearch={() => setSearchOpen(true)} />
      <div className={`kb-layout kb-layout--home ${sidebarCollapsed ? "kb-layout--sidebar-collapsed" : ""}`}>
        <DocsSidebar version={version} open={mobileOpen} collapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed((collapsed) => !collapsed)} onNavigate={() => setMobileOpen(false)} onVersionChange={setVersion} />
        <button className="kb-sidebar-scrim" aria-label="Close navigation" aria-hidden={!mobileOpen} tabIndex={mobileOpen ? 0 : -1} onClick={() => setMobileOpen(false)} />
        <main className="kb-main kb-main--home" style={{ padding: "40px 52px 72px", maxWidth: "1320px", margin: "0 auto" }}>
          <div className="kb-breadcrumbs" style={{ marginBottom: "24px" }}>
            <Link href="/">Brick Knowledge Base</Link>
            <ChevronRight size={14} />
            <span>Documentation Hub</span>
          </div>

          <div className="kb-kb-header" style={{ marginBottom: "36px", display: "grid", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span className="kb-status-dot" />
              <span className="kb-sidebar__topline" style={{ margin: 0 }}>Brick Knowledge Base · {version === "v0.9" ? "Stable v0.9 (Shared & Core)" : "Beta v1.0"}</span>
            </div>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: "700", fontFamily: "var(--kb-font-display)", letterSpacing: "-.04em", color: "var(--kb-ink-strong)", margin: 0, lineHeight: "1.1" }}>
              Documentation Index & Operator Guides
            </h1>
            <p style={{ color: "var(--kb-muted)", fontSize: "17px", lineHeight: "1.65", maxWidth: "820px", margin: 0 }}>
              Comprehensive, task-oriented reference manuals for managing shared hosting tenants, configuring secure MySQL/PostgreSQL databases, binding SSL/TLS certificates, and executing point-in-time recovery entirely through the Brick Web UI.
            </p>
          </div>

          {/* Prime Intellect style domain-driven discovery grid */}
          <div className="kb-domain-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "40px" }}>
            {docsGroups.map((group, idx) => {
              const representativeGuide = allGuides.find((g) => group.slugs.includes(g.slug));
              return (
                <div
                  key={group.label}
                  className="kb-card-cinematic"
                  style={{
                    padding: "24px",
                    borderRadius: "14px",
                    border: "1px solid var(--kb-line)",
                    background: "var(--kb-surface)",
                    display: "grid",
                    gap: "12px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "11px", fontFamily: "var(--kb-font-mono)", padding: "2px 8px", borderRadius: "6px", background: "var(--kb-accent-wash)", color: "var(--kb-accent-strong)", fontWeight: "600" }}>
                      DOMAIN 0{idx + 1}
                    </span>
                    <span style={{ fontSize: "12px", fontFamily: "var(--kb-font-mono)", color: "var(--kb-faint)" }}>{group.slugs.length} guides</span>
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: "600", fontFamily: "var(--kb-font-display)", color: "var(--kb-ink-strong)", margin: 0 }}>
                    {group.label}
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--kb-muted)", margin: 0, lineHeight: "1.5" }}>
                    {group.description}
                  </p>
                  {representativeGuide && (
                    <div style={{ marginTop: "8px", paddingTop: "12px", borderTop: "1px solid var(--kb-line)" }}>
                      <Link
                        href={getGuideHref(representativeGuide.slug, version)}
                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "13px", color: "var(--kb-accent-strong)", textDecoration: "none", fontWeight: "500" }}
                      >
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginRight: "8px" }}>Start with: {representativeGuide.title}</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Explicit Start Here Onboarding Path */}
          <div className="kb-start-here kb-card-cinematic" style={{ padding: "28px", borderRadius: "16px", border: "1px solid var(--kb-line)", background: "var(--kb-surface-soft)", marginBottom: "40px", display: "grid", gap: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <span className="kb-sidebar__topline" style={{ margin: "0 0 6px 0" }}>Operator Onboarding Pathway</span>
                <h2 style={{ fontSize: "22px", fontWeight: "600", fontFamily: "var(--kb-font-display)", color: "var(--kb-ink-strong)", margin: 0 }}>
                  From First Boot to Production Multi-Tenancy in Four Steps
                </h2>
              </div>
              <span style={{ fontSize: "12px", fontFamily: "var(--kb-font-mono)", color: "var(--kb-faint)", padding: "4px 10px", border: "1px solid var(--kb-line)", borderRadius: "6px", background: "var(--kb-surface)" }}>
                Zero Terminal Access Policy Enforced
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              {[
                { step: "01", title: "Access & Auth", desc: "Log into the secure Brick Web UI with enterprise credentials.", slug: "navigating-the-brick-web-panel" },
                { step: "02", title: "Deploy Application", desc: "Select runtime stacks and map domains without shell access.", slug: "deploy-containerized-applications-without-guessing" },
                { step: "03", title: "Databases & Storage", desc: "Provision isolated MySQL databases and managed directories.", slug: "provision-and-manage-high-performance-databases" },
                { step: "04", title: "Recovery & Backups", desc: "Verify point-in-time recovery and automated sentinel alerts.", slug: "back-up-and-restore-websites-databases-and-host-state" },
              ].map((s) => (
                <Link
                  key={s.step}
                  href={getGuideHref(s.slug, version)}
                  style={{ padding: "16px", borderRadius: "12px", background: "var(--kb-surface)", border: "1px solid var(--kb-line)", textDecoration: "none", display: "grid", gap: "8px", transition: "all 160ms ease" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--kb-font-mono)", fontSize: "12px", fontWeight: "700", color: "var(--kb-accent-strong)" }}>STEP {s.step}</span>
                    <ArrowRight size={14} style={{ color: "var(--kb-faint)" }} />
                  </div>
                  <strong style={{ fontSize: "14px", color: "var(--kb-ink-strong)", fontFamily: "var(--kb-font-display)" }}>{s.title}</strong>
                  <p style={{ fontSize: "12px", color: "var(--kb-muted)", margin: 0, lineHeight: "1.4" }}>{s.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="kb-kb-toolbar" style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", justifyContent: "space-between", marginBottom: "28px", paddingBottom: "20px", borderBottom: "1px solid var(--kb-line)" }}>
            <div className="kb-category-tabs" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "7px 14px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: "600",
                    fontFamily: "var(--kb-font-mono)",
                    cursor: "pointer",
                    border: "1px solid",
                    borderColor: selectedCategory === cat ? "var(--kb-accent)" : "var(--kb-line)",
                    background: selectedCategory === cat ? "var(--kb-accent-wash)" : "var(--kb-surface)",
                    color: selectedCategory === cat ? "var(--kb-accent-strong)" : "var(--kb-muted)",
                    transition: "all 150ms ease",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", width: "min(320px, 100%)" }}>
              <div className="kb-inline-search" style={{ width: "100%", padding: "6px 12px", border: "1px solid var(--kb-line)", borderRadius: "9px", background: "var(--kb-surface)", display: "flex", alignItems: "center", gap: "8px" }}>
                <Search size={15} style={{ color: "var(--kb-muted)" }} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Filter guides by keyword..."
                  style={{ background: "transparent", border: 0, outline: 0, color: "var(--kb-ink)", fontSize: "13px", width: "100%" }}
                />
                <kbd style={{ fontSize: "10px", padding: "2px 5px", background: "var(--kb-surface-soft)", borderRadius: "4px", color: "var(--kb-faint)", border: "1px solid var(--kb-line)" }}>⌘K</kbd>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "36px", alignItems: "start" }} className="kb-home-split">
            <div className="kb-guide-list" style={{ display: "grid", gap: "12px" }}>
              {filteredGuides.length === 0 ? (
                <div style={{ padding: "48px", textAlign: "center", border: "1px solid var(--kb-line)", borderRadius: "12px", background: "var(--kb-surface)" }}>
                  <p style={{ color: "var(--kb-muted)", fontSize: "14px", margin: "0 0 12px" }}>No guides match your filter criteria.</p>
                  <button onClick={() => { setQuery(""); setSelectedCategory("All"); }} className="kb-button kb-button--quiet">Reset filters</button>
                </div>
              ) : (
                filteredGuides.map((guide, index) => (
                  <Link
                    key={guide.slug}
                    href={getGuideHref(guide.slug, version)}
                    className="kb-guide-list-item kb-card-cinematic"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "40px 1fr auto",
                      gap: "16px",
                      alignItems: "center",
                      padding: "18px 20px",
                      borderRadius: "12px",
                      border: "1px solid var(--kb-line)",
                      background: "var(--kb-surface)",
                      textDecoration: "none",
                      transition: "all 160ms ease",
                    }}
                  >
                    <span style={{ fontFamily: "var(--kb-font-mono)", fontSize: "11px", color: "var(--kb-accent-strong)", fontWeight: "700" }}>
                      0{index + 1}
                    </span>
                    <div style={{ display: "grid", gap: "4px", minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "10px", fontFamily: "var(--kb-font-mono)", padding: "2px 6px", borderRadius: "4px", background: "var(--kb-accent-wash)", color: "var(--kb-accent-strong)", textTransform: "uppercase" }}>
                          {guide.category}
                        </span>
                        <span style={{ fontSize: "11px", color: "var(--kb-faint)" }}>{guide.read}</span>
                      </div>
                      <h2 style={{ fontSize: "16px", fontWeight: "600", fontFamily: "var(--kb-font-display)", color: "var(--kb-ink-strong)", margin: 0 }}>
                        {guide.title}
                      </h2>
                      <p style={{ fontSize: "13px", color: "var(--kb-muted)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>
                        {guide.intro}
                      </p>
                    </div>
                    <ArrowRight size={16} style={{ color: "var(--kb-faint)" }} />
                  </Link>
                ))
              )}
            </div>

            <aside className="kb-kb-sidebar-panel" style={{ display: "grid", gap: "20px", position: "sticky", top: "90px" }}>
              <div style={{ padding: "20px", border: "1px solid var(--kb-line)", borderRadius: "12px", background: "var(--kb-surface)", display: "grid", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--kb-ink-strong)", fontWeight: "600", fontSize: "13px" }}>
                  <FileText size={16} style={{ color: "var(--kb-accent-strong)" }} />
                  <span>Knowledge Base Quick Stats</span>
                </div>
                <div style={{ display: "grid", gap: "8px", fontSize: "12px", color: "var(--kb-muted)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Total Published Guides:</span>
                    <strong style={{ color: "var(--kb-ink-strong)", fontFamily: "var(--kb-font-mono)" }}>{allGuides.length}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Active Version:</span>
                    <strong style={{ color: "var(--kb-accent-strong)", fontFamily: "var(--kb-font-mono)" }}>{version}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Interface Standard:</span>
                    <strong style={{ color: "var(--kb-ink-strong)", fontFamily: "var(--kb-font-mono)" }}>Web UI Only</strong>
                  </div>
                </div>
              </div>

              <div style={{ padding: "20px", border: "1px solid var(--kb-line)", borderRadius: "12px", background: "var(--kb-surface)", display: "grid", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--kb-ink-strong)", fontWeight: "600", fontSize: "13px" }}>
                  <Sparkles size={16} style={{ color: "var(--kb-accent-strong)" }} />
                  <span>Embedded Assistant</span>
                </div>
                <p style={{ fontSize: "12px", color: "var(--kb-muted)", margin: 0, lineHeight: "1.5" }}>
                  Need quick guidance on panel settings or backup schedules? Use the assistant widget at bottom-right for instant, guide-grounded answers.
                </p>
                <button
                  onClick={() => setAssistantOpen(true)}
                  className="kb-button kb-button--primary"
                  style={{ width: "100%", justifyContent: "center", marginTop: "4px" }}
                >
                  Open Ask Assistant <ArrowRight size={14} />
                </button>
              </div>
            </aside>
          </div>
        </main>
      </div>
      <DocsSearchDialog open={searchOpen} query={query} version={version} onQueryChange={setQuery} onClose={() => setSearchOpen(false)} />
      <DocsAssistantDrawer open={assistantOpen} version={version} onOpen={() => setAssistantOpen(true)} onClose={() => setAssistantOpen(false)} />
    </div>
  );
}
