/* Brick Docs design reminder: the sidebar is a task index, not a decorative rail; every state must be clear, reachable, and responsive. */
import { ChevronRight, CircleHelp, PanelLeftClose, PanelLeftOpen, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { allGuides } from "../data/guides";
import { docsGroups, getGuideHref, versionOptions, type DocsVersion } from "../lib/docs";

interface DocsSidebarProps {
  version: DocsVersion;
  activeSlug?: string;
  open?: boolean;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onNavigate?: () => void;
  onVersionChange?: (version: DocsVersion) => void;
}

export default function DocsSidebar({ version, activeSlug, open = false, collapsed = false, onToggleCollapse, onNavigate, onVersionChange }: DocsSidebarProps) {
  return (
    <aside className={`kb-sidebar ${open ? "kb-sidebar--open" : ""} ${collapsed ? "kb-sidebar--collapsed" : ""}`} aria-label="Documentation navigation">
      <div className="kb-sidebar__heading-row">
        <div className="kb-sidebar__topline"><span className="kb-status-dot" /> Public user documentation</div>
        {onToggleCollapse && <button className="kb-sidebar-collapse-toggle" onClick={onToggleCollapse} aria-label={collapsed ? "Expand documentation sidebar" : "Collapse documentation sidebar"} aria-expanded={!collapsed} title={collapsed ? "Expand sidebar" : "Collapse sidebar"}>{collapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}</button>}
      </div>
      <div className="kb-sidebar__release">
        <div>
          <span className="kb-sidebar__eyebrow">Documentation release</span>
          <strong>{version === "v0.9" ? "Stable channel" : "Beta preview"}</strong>
        </div>
        {onVersionChange ? (
          <select
            className="kb-sidebar__version-select"
            value={version}
            onChange={(event) => onVersionChange(event.target.value as DocsVersion)}
            aria-label="Choose documentation release"
          >
            {versionOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        ) : <span className="kb-sidebar__version-label">{version}</span>}
      </div>
      <nav className="kb-sidebar__nav">
        {docsGroups.map((group) => (
          <section className="kb-nav-group" key={group.label}>
            <div className="kb-nav-group__heading"><span>{group.label}</span><small>{group.description}</small></div>
            {group.slugs.map((slug) => {
              const guide = allGuides.find((item) => item.slug === slug);
              if (!guide) return null;
              const active = guide.slug === activeSlug;
              return (
                <Link
                  key={guide.slug}
                  href={getGuideHref(guide.slug, version)}
                  onClick={onNavigate}
                  className={`kb-nav-link ${active ? "kb-nav-link--active" : ""}`}
                  data-motion-source="skiper-hover-members"
                  aria-current={active ? "page" : undefined}
                  title={collapsed ? guide.title : undefined}
                >
                  <span className="kb-nav-link__title">{guide.title}</span>
                  <ChevronRight className="kb-nav-link__arrow" size={14} strokeWidth={1.8} aria-hidden="true" />
                </Link>
              );
            })}
          </section>
        ))}
      </nav>
      <div className="kb-sidebar__footer">
        <div className="kb-sidebar-note"><ShieldCheck size={16} /><span>Operator guidance only. Brick Docs never exposes terminal access.</span></div>
        <Link href="/docs/troubleshooting" className="kb-help-link" onClick={onNavigate}><CircleHelp size={15} /> Troubleshooting index <ChevronRight size={13} /></Link>
      </div>
    </aside>
  );
}
