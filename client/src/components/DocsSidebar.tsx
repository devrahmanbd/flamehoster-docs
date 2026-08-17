import { ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { editionOptions, getGuideHref, groupsForEdition, type DocsEdition } from "../lib/docs";

interface DocsSidebarProps {
  edition: DocsEdition;
  activeSlug?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function DocsSidebar({ edition, activeSlug, isOpen, onClose }: DocsSidebarProps) {
  const groups = groupsForEdition(edition);
  const editionLabel = editionOptions.find((option) => option.value === edition)?.label ?? "Shared Hosting";
  const drawerRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen || window.matchMedia("(min-width: 901px)").matches) return;

    previouslyFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = drawerRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trapFocus);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", trapFocus);
      const returnTarget = previouslyFocusedRef.current;
      if (returnTarget?.isConnected) {
        window.setTimeout(() => returnTarget.focus(), 0);
      }
      previouslyFocusedRef.current = null;
    };
  }, [isOpen, onClose]);

  return (
    <>
      <button className={`docs-nav-scrim ${isOpen ? "is-visible" : ""}`} type="button" aria-label="Close navigation menu" onClick={onClose} tabIndex={isOpen ? 0 : -1} />
      <aside ref={drawerRef} id="docs-sidebar" className={`docs-sidebar ${isOpen ? "is-open" : ""}`} aria-label="Documentation navigation" role={isOpen ? "dialog" : undefined} aria-modal={isOpen || undefined}>
        <div className="docs-sidebar__mobile-bar">
          <span>Documentation</span>
          <button ref={closeButtonRef} className="docs-icon-button" type="button" onClick={onClose} aria-label="Close navigation menu"><X size={18} /></button>
        </div>
        <div className="docs-sidebar__edition"><span>Viewing</span><strong>{editionLabel}</strong></div>
        <nav className="docs-nav-tree">
          {groups.map((group) => (
            <section className="docs-nav-group" key={group.id} aria-labelledby={`nav-group-${group.id}`}>
              <h2 id={`nav-group-${group.id}`}>{group.label}</h2>
              <ul>
                {group.guides.map((guide) => {
                  const isActive = guide.slug === activeSlug;
                  return <li key={guide.slug}><Link href={getGuideHref(guide.slug, edition)} className={isActive ? "is-active" : ""} onClick={onClose} aria-current={isActive ? "page" : undefined}><span>{guide.title}</span>{isActive ? <ChevronRight size={14} aria-hidden="true" /> : null}</Link></li>;
                })}
              </ul>
            </section>
          ))}
        </nav>
        <div className="docs-sidebar__footnote">Public panel guides only. Account-level actions stay within the Brick Web UI.</div>
      </aside>
    </>
  );
}
