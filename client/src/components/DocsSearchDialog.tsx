import { ArrowUpRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "wouter";
import { getGuideHref, searchGuides, type DocsEdition } from "../lib/docs";

interface DocsSearchDialogProps {
  open: boolean;
  edition: DocsEdition;
  onClose: () => void;
}

export default function DocsSearchDialog({ open, edition, onClose }: DocsSearchDialogProps) {
  const [, navigate] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const results = useMemo(() => searchGuides(query, edition).slice(0, 8), [query, edition]);

  useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setQuery("");
    setActiveIndex(0);
    window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus();
    };
  }, [open, edition]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); }
      if (event.key === "ArrowDown" && results.length) { event.preventDefault(); setActiveIndex((index) => (index + 1) % results.length); }
      if (event.key === "ArrowUp" && results.length) { event.preventDefault(); setActiveIndex((index) => (index - 1 + results.length) % results.length); }
      if (event.key === "Enter" && results[activeIndex]) { event.preventDefault(); navigate(getGuideHref(results[activeIndex].slug, edition)); onClose(); }
      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('input, button:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, edition, navigate, onClose, open, results]);

  if (!open) return null;
  return (
    <div className="docs-search-overlay" role="presentation" onMouseDown={onClose}>
      <section ref={dialogRef} className="docs-search-dialog" role="dialog" aria-modal="true" aria-label="Search Brick documentation" onMouseDown={(event) => event.stopPropagation()}>
        <div className="docs-search-dialog__input">
          <Search size={19} aria-hidden="true" />
          <input ref={inputRef} value={query} onChange={(event) => { setQuery(event.target.value); setActiveIndex(0); }} placeholder={`Search ${edition === "shared" ? "Shared" : "Dedicated"} guides`} aria-label="Search documentation" />
          <button className="docs-icon-button" type="button" onClick={onClose} aria-label="Close search"><X size={18} /></button>
        </div>
        <div className="docs-search-dialog__hint"><span>{query ? `${results.length} matching guides` : `Search ${edition === "shared" ? "Shared Hosting" : "Dedicated"} documentation`}</span><span>↑↓ navigate · Enter open · Esc close</span></div>
        <div className="docs-search-results" role="listbox" aria-label="Guide results">
          {results.map((guide, index) => (
            <button type="button" role="option" aria-selected={activeIndex === index} className={activeIndex === index ? "is-active" : ""} key={guide.slug} onMouseEnter={() => setActiveIndex(index)} onClick={() => { navigate(getGuideHref(guide.slug, edition)); onClose(); }}>
              <span className="docs-search-result__category">{guide.category}</span>
              <span className="docs-search-result__body"><strong>{guide.title}</strong><small>{guide.intro}</small></span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </button>
          ))}
          {!results.length ? <div className="docs-search-empty"><strong>No guide matches “{query}”.</strong><span>Try a product, task, or panel feature such as “SSL”, “backup”, or “PHP”.</span></div> : null}
        </div>
      </section>
    </div>
  );
}
