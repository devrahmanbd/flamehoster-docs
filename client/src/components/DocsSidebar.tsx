/* Brick Docs design reminder: group guides by operator task, keep labels concrete, and make every navigation item a real route. */
import { ChevronRight, CircleHelp, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { allGuides } from "../data/guides";
import { docsGroups, getGuideHref, type DocsVersion } from "../lib/docs";

interface DocsSidebarProps {
  version: DocsVersion;
  activeSlug?: string;
  open?: boolean;
  onNavigate?: () => void;
}

export default function DocsSidebar({ version, activeSlug, open = false, onNavigate }: DocsSidebarProps) {
  return (
    <aside className={`kb-sidebar ${open ? "kb-sidebar--open" : ""}`} aria-label="Documentation navigation">
      <div className="kb-sidebar__topline"><span className="kb-status-dot" /> Public user documentation</div>
      <div className="kb-sidebar__version-row"><span>Release channel</span><strong>{version === "v0.9" ? "v0.9 stable" : "v1.0 beta"}</strong></div>
      <nav className="kb-sidebar__nav">
        {docsGroups.map((group) => (
          <section className="kb-nav-group" key={group.label}>
            <div className="kb-nav-group__heading"><span>{group.label}</span><small>{group.description}</small></div>
            {group.slugs.map((slug) => {
              const guide = allGuides.find((item) => item.slug === slug);
              if (!guide) return null;
              const active = guide.slug === activeSlug;
              return <Link key={guide.slug} href={getGuideHref(guide.slug, version)} onClick={onNavigate} className={`kb-nav-link ${active ? "kb-nav-link--active" : ""}`} aria-current={active ? "page" : undefined}><span>{guide.title}</span><ChevronRight size={14} /></Link>;
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
