/* Brick Docs design reminder: three-column reading shell, graphite surfaces, cyan signal color, amber accents, monospace system language, and motion only where it clarifies state. */
import {
  Activity,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDot,
  Clipboard,
  Code2,
  Command,
  Copy,
  FileCode2,
  Github,
  Globe2,
  Layers3,
  LockKeyhole,
  Menu,
  Network,
  Package,
  PanelLeft,
  Play,
  RotateCcw,
  Search,
  Server,
  Shield,
  Sparkles,
  Sun,
  Terminal,
  X,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const heroImage = "/manus-storage/brick-docs-hero_c9ca5dec.jpg";
const satureImage = "/manus-storage/brick-sature_a751fa92.jpg";
const securityImage = "/manus-storage/brick-security_a13799d3.jpg";
const brickMark = "/manus-storage/brick-mark_51742faa.png";

const navGroups = [
  {
    title: "START HERE",
    items: [
      { label: "Overview", id: "overview", icon: BookOpen, meta: "2 min" },
      { label: "Architecture", id: "architecture", icon: Layers3, meta: "8 min" },
      { label: "Installation", id: "installation", icon: Terminal, meta: "6 min" },
    ],
  },
  {
    title: "USER GUIDE",
    items: [
      { label: "User guide", id: "user-guide", icon: BookOpen, meta: "3 min" },
      { label: "Install & sign in", id: "user-install", icon: Terminal, meta: "5 min" },
      { label: "Deploy an app", id: "user-deploy", icon: Package, meta: "8 min" },
      { label: "Secure your panel", id: "user-security", icon: Shield, meta: "7 min" },
      { label: "Maintain & recover", id: "user-maintain", icon: RotateCcw, meta: "9 min" },
    ],
  },
  {
    title: "OPERATE",
    items: [
      { label: "SATURE updates", id: "sature", icon: RotateCcw, meta: "10 min" },
      { label: "Sentinel watchdog", id: "sentinel", icon: Activity, meta: "7 min" },
      { label: "App marketplace", id: "marketplace", icon: Package, meta: "9 min" },
    ],
  },
  {
    title: "SECURITY",
    items: [
      { label: "Security model", id: "security", icon: Shield, meta: "12 min" },
      { label: "Network monitoring", id: "network", icon: Network, meta: "8 min" },
      { label: "API & conventions", id: "api", icon: Code2, meta: "11 min" },
    ],
  },
];

const allItems = navGroups.flatMap((group) => group.items);

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SectionLabel({ children }: { children: string }) {
  return <p className="section-label">{children}</p>;
}

function CodeBlock({ children, label = "shell" }: { children: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard?.writeText(children);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="code-block">
      <div className="code-toolbar">
        <span className="code-language"><span className="code-dot" /> {label}</span>
        <button className="icon-button icon-button--dark" aria-label="Copy code" onClick={copy}>
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre><code>{children}</code></pre>
    </div>
  );
}

function StatusBadge({ children, tone = "cyan" }: { children: string; tone?: "cyan" | "amber" | "green" }) {
  return <span className={`status-badge status-badge--${tone}`}><span className="status-badge__dot" />{children}</span>;
}

function MiniDiagram() {
  return (
    <div className="mini-diagram" aria-label="Brick component relationship diagram">
      <div className="diagram-node diagram-node--primary"><Layers3 size={16} /><span>Brick Core</span><small>Go services</small></div>
      <div className="diagram-line diagram-line--right" />
      <div className="diagram-node"><Server size={16} /><span>Agent</span><small>system control</small></div>
      <div className="diagram-line diagram-line--down" />
      <div className="diagram-node"><RotateCcw size={16} /><span>SATURE</span><small>state safety</small></div>
      <div className="diagram-line diagram-line--left" />
      <div className="diagram-node"><Shield size={16} /><span>Security</span><small>defense layer</small></div>
    </div>
  );
}

function Home() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const [query, setQuery] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeId, setActiveId] = useState("overview");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return allItems;
    return allItems.filter((item) => item.label.toLowerCase().includes(normalized));
  }, [query]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "/" && document.activeElement?.tagName !== "INPUT") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (searchOpen) window.setTimeout(() => searchInputRef.current?.focus(), 40);
  }, [searchOpen]);

  useEffect(() => {
    const sections = allItems.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveId(visible.target.id);
    }, { rootMargin: "-20% 0px -60% 0px", threshold: [0.1, 0.25, 0.6] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navigate = (id: string) => {
    setMobileNavOpen(false);
    setSearchOpen(false);
    scrollToSection(id);
  };

  return (
    <div className={`docs-app ${lightMode ? "docs-app--light" : ""}`}>
      <a className="skip-link" href="#overview">Skip to documentation content</a>
      <header className="topbar">
        <div className="topbar__brand">
          <button className="mobile-menu-button" onClick={() => setMobileNavOpen((open) => !open)} aria-label="Toggle navigation"><Menu size={18} /></button>
          <img src={brickMark} className="brand-mark" alt="Brick mark" />
          <span className="brand-name">Brick <span>Docs</span></span>
          <span className="brand-version">v0.9 beta</span>
        </div>
        <div className="topbar__actions">
          <button className="search-trigger" onClick={() => setSearchOpen(true)}><Search size={15} /><span>Search docs</span><kbd><Command size={11} /> K</kbd></button>
          <a className="topbar-link" href="https://github.com/devrahmanbd/flamehoster" target="_blank" rel="noreferrer"><Github size={16} /> <span>GitHub</span></a>
          <button className="theme-toggle" onClick={() => setLightMode((enabled) => !enabled)} aria-label={lightMode ? "Switch to dark theme" : "Switch to light theme"} title={lightMode ? "Switch to dark theme" : "Switch to light theme"}><Sun size={16} /></button>
        </div>
      </header>

      <div className={`docs-frame ${mobileNavOpen ? "docs-frame--nav-open" : ""}`}>
        <aside className="sidebar">
          <div className="sidebar__intro"><span className="eyebrow-dot" /> <span>Documentation</span></div>
          <nav className="sidebar__nav" aria-label="Documentation navigation">
            {navGroups.map((group) => (
              <div className="nav-group" key={group.title}>
                <div className="nav-group__title"><span>{group.title}</span><ChevronDown size={13} /></div>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeId === item.id;
                  return <button key={item.id} className={`nav-item ${isActive ? "nav-item--active" : ""}`} aria-current={isActive ? "page" : undefined} onClick={() => navigate(item.id)}><Icon size={16} /><span>{item.label}</span><small>{item.meta}</small></button>;
                })}
              </div>
            ))}
          </nav>
          <div className="sidebar__bottom">
            <div className="sidebar-card"><div className="sidebar-card__top"><StatusBadge tone="green">Stable beta</StatusBadge><span>0.9.4</span></div><p>Track implementation status and rollout notes for each subsystem.</p><a href="#api" onClick={(event) => { event.preventDefault(); navigate("api"); }}>Read release notes <ArrowRight size={13} /></a></div>
            <div className="sidebar__footer"><span><Globe2 size={13} /> English</span><span>© 2026 Brick</span></div>
          </div>
        </aside>

        <main className="content-column">
          <section className="hero-card" id="overview">
            <img className="hero-card__image" src={heroImage} alt="Abstract Brick infrastructure illustration" />
            <div className="hero-card__overlay" />
            <div className="hero-card__content">
              <div className="hero-card__kicker"><span className="live-dot" /> <span>Documentation for operators & builders</span></div>
              <h1>Operate with<br /><em>confidence.</em></h1>
              <p>Brick is a security-first hosting panel for teams who need the control of a dedicated server and the ergonomics of a modern platform.</p>
              <div className="hero-card__actions"><button className="primary-button" onClick={() => navigate("installation")}>Install Brick <ArrowRight size={15} /></button><button className="ghost-button" onClick={() => navigate("architecture")}>Explore architecture</button></div>
            </div>
            <div className="hero-card__meta"><span><CircleDot size={12} /> Debian & RHEL ready</span><span><LockKeyhole size={12} /> Transactional updates</span></div>
          </section>

          <div className="content-intro"><div><SectionLabel>THE BRICK WAY</SectionLabel><h2>Documentation built for<br /><span>real-world failure modes.</span></h2></div><p>These guides map the system from first boot to production operations. They favor explicit boundaries, recoverable state, and commands you can audit before you run.</p></div>

          <section className="quick-links">
            <button className="quick-link" onClick={() => navigate("installation")}><div className="quick-link__icon quick-link__icon--cyan"><Terminal size={18} /></div><div><strong>Start in 60 seconds</strong><span>Install, secure, and sign in.</span></div><ChevronRight size={16} /></button>
            <button className="quick-link" onClick={() => navigate("sature")}><div className="quick-link__icon quick-link__icon--amber"><RotateCcw size={18} /></div><div><strong>Understand SATURE</strong><span>Updates with a way back.</span></div><ChevronRight size={16} /></button>
            <button className="quick-link" onClick={() => navigate("security")}><div className="quick-link__icon quick-link__icon--green"><Shield size={18} /></div><div><strong>Harden your edge</strong><span>MFA, WAF, FIM, and network defense.</span></div><ChevronRight size={16} /></button>
          </section>

          <section className="doc-section user-guide-section" id="user-guide">
            <SectionLabel>USER DOCUMENTATION</SectionLabel>
            <div className="section-heading"><div><h2>Run Brick, step by step.</h2><p>These are the operator guides for installing the panel, onboarding a team, deploying a production app, tightening the security boundary, and recovering safely when a change does not go to plan.</p></div><span className="heading-index">U0</span></div>
            <div className="user-guide-grid">
              <article className="user-guide-card" id="user-install"><div className="user-guide-card__number">01</div><div><h3>Install & sign in</h3><p>Prepare a supported host, open the setup entrance, create the first operator, and enable MFA before exposing Brick publicly.</p><span>5 min read <ArrowRight size={13} /></span></div></article>
              <article className="user-guide-card" id="user-deploy"><div className="user-guide-card__number">02</div><div><h3>Deploy an app</h3><p>Choose a marketplace template, review the port and FQDN plan, attach persistence, and verify health after launch.</p><span>8 min read <ArrowRight size={13} /></span></div></article>
              <article className="user-guide-card" id="user-security"><div className="user-guide-card__number">03</div><div><h3>Secure your panel</h3><p>Configure MFA, NFTables rules, malware and file-integrity scans, audit logs, and network monitoring.</p><span>7 min read <ArrowRight size={13} /></span></div></article>
              <article className="user-guide-card" id="user-maintain"><div className="user-guide-card__number">04</div><div><h3>Maintain & recover</h3><p>Run preflight, capture a state manifest, apply updates transactionally, and understand the Sentinel recovery path.</p><span>9 min read <ArrowRight size={13} /></span></div></article>
            </div>
            <div className="user-guide-callout"><Terminal size={18} /><div><strong>Operator rule of thumb</strong><p>If a change can affect customer traffic, storage, network binding, or boot, run the preflight and save the state manifest first.</p></div></div>
          </section>

          <section className="doc-section" id="architecture">
            <SectionLabel>01 / FOUNDATIONS</SectionLabel>
            <div className="section-heading"><div><h2>Architecture that stays legible.</h2><p>Brick keeps the control plane, host agent, safety engine, and security controls separated so each layer can be inspected, upgraded, or recovered without turning the whole system into a black box.</p></div><span className="heading-index">01</span></div>
            <MiniDiagram />
            <div className="architecture-grid"><div className="architecture-cell"><span className="architecture-cell__num">A1</span><h3>Control plane</h3><p>The Go service owns API routing, auth, settings, application lifecycle, and operator-facing workflows.</p></div><div className="architecture-cell"><span className="architecture-cell__num">A2</span><h3>Host agent</h3><p>System operations live behind an agent boundary for Docker, databases, Nginx, files, terminals, and firewall changes.</p></div><div className="architecture-cell"><span className="architecture-cell__num">A3</span><h3>Safety plane</h3><p>SATURE captures state before changes while Sentinel remains available to recover from boot or process-level failure.</p></div></div>
            <div className="note-box"><Sparkles size={17} /><div><strong>Design principle</strong><p>Every destructive-looking action should have an inspectable plan, a durable record, and an explicit recovery path.</p></div></div>
          </section>

          <section className="doc-section" id="installation">
            <SectionLabel>02 / FIRST BOOT</SectionLabel>
            <div className="section-heading"><div><h2>Install a panel you can explain.</h2><p>Run the installer on a clean supported host, verify prerequisites, then complete the first-run setup in the browser. Keep the panel port and security entrance private until the host is ready.</p></div><span className="heading-index">02</span></div>
            <CodeBlock label="bash">{`curl -fsSL https://get.brick.dev/install.sh | bash
sudo brickctl status
sudo brickctl setup --listen 0.0.0.0:20100`}</CodeBlock>
            <div className="steps-row"><div className="step-card"><span>01</span><h3>Preflight</h3><p>Check OS family, free disk, systemd, Docker, and the host's active firewall backend.</p></div><div className="step-card"><span>02</span><h3>Bootstrap</h3><p>Install Brick Core, the host agent, and the zero-dependency Sentinel binary.</p></div><div className="step-card"><span>03</span><h3>Secure</h3><p>Create the first operator, enable MFA, and set a non-default security entrance.</p></div></div>
          </section>

          <section className="image-section" id="sature"><img src={satureImage} alt="Layered transactional snapshots illustration" /><div className="image-section__content"><SectionLabel>03 / STATE SAFETY</SectionLabel><h2>Updates should feel reversible.</h2><p>SATURE is Brick's State-Aware Transactional Update & Rollback Engine. It captures a Brick State Manifest, stages the change, validates health, and keeps a recovery record before the system crosses a dangerous boundary.</p><div className="metric-row"><div><strong>BSM</strong><span>state manifest</span></div><div><strong>ZFS</strong><span>dataset snapshot</span></div><div><strong>GRUB</strong><span>kernel fallback</span></div></div><button className="text-button" onClick={() => navigate("sentinel")}>Read the recovery model <ArrowRight size={15} /></button></div></section>

          <section className="doc-section" id="sentinel">
            <SectionLabel>04 / RECOVERY</SectionLabel>
            <div className="section-heading"><div><h2>Sentinel watches the boundary.</h2><p>Brick Sentinel is a statically linked watchdog designed to run outside the panel's dependency graph. It audits prerequisites, records host state, and can trigger the recovery path when the control plane cannot report healthy after an update.</p></div><span className="heading-index">04</span></div>
            <div className="terminal-card"><div className="terminal-card__bar"><span /><span /><span /><small>brick-sentinel</small></div><div className="terminal-card__body"><p><i>$</i> sudo brick-sentinel -cmd check</p><p className="terminal-muted">[PASS] apt-get · [PASS] tar · [PASS] systemd</p><p className="terminal-muted">[PASS] disk space · 31,342 MB available</p><p className="terminal-success"><Check size={14} /> Audit passed. Recovery hooks armed.</p></div></div>
            <div className="warning-box"><Zap size={17} /><div><strong>Failure is a product state.</strong><p>Never treat a failed update as a log message only. Preserve the pre-update manifest, surface the reason, and make rollback behavior observable to the operator.</p></div></div>
          </section>

          <section className="image-section image-section--security" id="security"><img src={securityImage} alt="Brick security perimeter illustration" /><div className="image-section__content"><SectionLabel>05 / DEFENSE IN DEPTH</SectionLabel><h2>Make the host harder to surprise.</h2><p>Brick combines identity controls, file-integrity checks, malware scanning, modern firewall rules, and network visibility. The controls are layered so one missed signal does not become a full compromise.</p><div className="security-list"><div><LockKeyhole size={15} /><span>Passkeys + TOTP MFA</span></div><div><Shield size={15} /><span>NFTables rules & rate limits</span></div><div><Activity size={15} /><span>FIM, scanner, and audit trail</span></div></div><button className="text-button" onClick={() => navigate("network")}>Review security operations <ArrowRight size={15} /></button></div></section>

          <section className="doc-section" id="marketplace">
            <SectionLabel>06 / APPLICATIONS</SectionLabel>
            <div className="section-heading"><div><h2>Deploy apps without guessing.</h2><p>The marketplace expresses each application as an inspectable deployment contract: image, ports, volumes, health checks, environment, reverse proxy, and update policy. Brick resolves conflicts before the user can submit an unsafe plan.</p></div><span className="heading-index">06</span></div>
            <div className="app-table"><div className="app-table__head"><span>APPLICATION</span><span>DEPLOYMENT</span><span>STATUS</span></div><div className="app-row"><div className="app-id"><span className="app-icon app-icon--blue">C</span><strong>Copyparty</strong></div><span>Docker Compose</span><StatusBadge tone="green">Verified</StatusBadge></div><div className="app-row"><div className="app-id"><span className="app-icon app-icon--amber">N</span><strong>ntfy</strong></div><span>Docker Compose</span><StatusBadge tone="green">Verified</StatusBadge></div><div className="app-row"><div className="app-id"><span className="app-icon app-icon--violet">D</span><strong>Docmost</strong></div><span>Docker Compose</span><StatusBadge tone="amber">Review</StatusBadge></div><div className="app-row"><div className="app-id"><span className="app-icon app-icon--green">R</span><strong>Rclone</strong></div><span>Agent utility</span><StatusBadge tone="green">Verified</StatusBadge></div></div>
          </section>

          <section className="doc-section" id="network">
            <SectionLabel>07 / OBSERVABILITY</SectionLabel>
            <div className="section-heading"><div><h2>See the host in motion.</h2><p>Network monitoring should answer more than “is it up?” Capture saturation, connection behavior, rejected flows, service latency, and the events that explain why a customer-facing endpoint changed state.</p></div><span className="heading-index">07</span></div>
            <div className="observability-card"><div className="observability-card__top"><div><span className="tiny-label">HOST / brick-node-01</span><h3>Network health</h3></div><StatusBadge tone="green">Operational</StatusBadge></div><div className="chart"><div className="chart__grid" /><svg viewBox="0 0 600 160" preserveAspectRatio="none" aria-label="Network traffic line chart"><path d="M0 128 C44 122 52 94 90 108 S145 88 180 98 S235 58 270 72 S330 42 360 59 S408 30 448 48 S510 18 600 30" fill="none" stroke="currentColor" strokeWidth="3" /><path d="M0 128 C44 122 52 94 90 108 S145 88 180 98 S235 58 270 72 S330 42 360 59 S408 30 448 48 S510 18 600 30 L600 160 L0 160Z" fill="currentColor" opacity=".08" /></svg><div className="chart__labels"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>Now</span></div></div><div className="observability-stats"><div><span>Throughput</span><strong>812 <small>Mbps</small></strong></div><div><span>Rejected flows</span><strong>18 <small>/ hour</small></strong></div><div><span>p95 latency</span><strong>34 <small>ms</small></strong></div></div></div>
          </section>

          <section className="doc-section" id="api">
            <SectionLabel>08 / BUILDERS</SectionLabel>
            <div className="section-heading"><div><h2>Use the system's vocabulary.</h2><p>Brick's API and internal modules are organized around explicit services. Use stable nouns in integrations, log actions with context, and treat every mutation as a state transition rather than a fire-and-forget request.</p></div><span className="heading-index">08</span></div>
            <div className="api-grid"><div className="api-card"><FileCode2 size={19} /><span>REST API</span><p>Authenticated routes for settings, deployments, upgrades, and audit events.</p><a href="#installation" onClick={(event) => { event.preventDefault(); navigate("installation"); }}>View request pattern <ArrowRight size={13} /></a></div><div className="api-card"><Clipboard size={19} /><span>Audit events</span><p>Every operator action should carry actor, target, result, and failure context.</p><a href="#security" onClick={(event) => { event.preventDefault(); navigate("security"); }}>Read security model <ArrowRight size={13} /></a></div><div className="api-card"><PanelLeft size={19} /><span>Frontend contracts</span><p>Vue surfaces map to backend DTOs; branding and route names remain stable for operators.</p><a href="#architecture" onClick={(event) => { event.preventDefault(); navigate("architecture"); }}>Inspect architecture <ArrowRight size={13} /></a></div></div>
            <div className="closing-cta"><div><span className="closing-cta__eyebrow"><Play size={12} /> NEXT RECOMMENDED</span><h3>Start with the installation guide.</h3><p>Then run the Sentinel preflight before you touch production state.</p></div><button className="primary-button" onClick={() => navigate("installation")}>Begin setup <ArrowRight size={15} /></button></div>
          </section>
          <footer className="content-footer"><span>Brick Docs · built for operators who read the logs.</span><span>Last reviewed Aug 2026</span></footer>
        </main>

        <aside className="toc"><div className="toc__title">ON THIS PAGE</div><button className={activeId === "overview" ? "toc__item toc__item--active" : "toc__item"} onClick={() => navigate("overview")}>The Brick way</button><button className={activeId === "architecture" ? "toc__item toc__item--active" : "toc__item"} onClick={() => navigate("architecture")}>Architecture</button><button className={activeId === "installation" ? "toc__item toc__item--active" : "toc__item"} onClick={() => navigate("installation")}>First boot</button><button className={activeId === "sature" || activeId === "sentinel" ? "toc__item toc__item--active" : "toc__item"} onClick={() => navigate("sature")}>State safety</button><button className={activeId === "security" || activeId === "network" ? "toc__item toc__item--active" : "toc__item"} onClick={() => navigate("security")}>Defense in depth</button><div className="toc__rule" /><div className="toc__help"><span>Need a hand?</span><p>Open an issue with the command, logs, and host state attached.</p><a href="https://github.com/devrahmanbd/flamehoster/issues" target="_blank" rel="noreferrer">Ask on GitHub <ArrowRight size={13} /></a></div></aside>
      </div>

      {searchOpen && <div className="search-modal" role="dialog" aria-modal="true" aria-label="Search documentation" onClick={() => setSearchOpen(false)}><div className="search-dialog" onClick={(event) => event.stopPropagation()}><div className="search-dialog__input"><Search size={18} /><input ref={searchInputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Brick Docs..." /><kbd>ESC</kbd></div><div className="search-dialog__results">{filteredItems.length ? filteredItems.map((item) => { const Icon = item.icon; return <button key={item.id} onClick={() => navigate(item.id)}><Icon size={16} /><span>{item.label}</span><small>{item.meta}</small><ArrowRight size={14} /></button>; }) : <div className="search-empty"><Search size={18} /><span>No guides found for “{query}”.</span></div>}</div><div className="search-dialog__footer"><span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span><kbd>↵</kbd> open</span><span><kbd>esc</kbd> close</span></div></div></div>}
    </div>
  );
}

export default Home;
