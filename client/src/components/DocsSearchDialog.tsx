/* Brick Docs design reminder: search is a primary route to knowledge, not a decorative control; results must be fast, readable, and keyboard reachable. */
import { ArrowUpRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { Link } from "wouter";
import { searchGuides, getGuideHref, type DocsVersion } from "../lib/docs";

interface DocsSearchDialogProps {
  open: boolean;
  query: string;
  version: DocsVersion;
  onQueryChange: (value: string) => void;
  onClose: () => void;
}

export default function DocsSearchDialog({ open, query, version, onQueryChange, onClose }: DocsSearchDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => searchGuides(query).slice(0, 8), [query]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="kb-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="kb-search-dialog" role="dialog" aria-modal="true" aria-label="Search Brick documentation" onMouseDown={(event) => event.stopPropagation()}>
        <div className="kb-search-dialog__header">
          <div className="kb-search-input"><Search size={18} /><input ref={inputRef} value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search guides, topics, and procedures" /><kbd>ESC</kbd></div>
          <button className="kb-dialog-close" onClick={onClose} aria-label="Close search"><X size={18} /></button>
        </div>
        <div className="kb-search-dialog__meta"><span>{query ? `${results.length} matching guide${results.length === 1 ? "" : "s"}` : "Search all public Brick guides"}</span><span>Use your keyboard to navigate</span></div>
        <div className="kb-search-results" role="listbox">
          {results.map((guide) => <Link key={guide.slug} href={getGuideHref(guide.slug, version)} className="kb-search-result" onClick={onClose}><span className="kb-search-result__index">{guide.category}</span><span className="kb-search-result__body"><strong>{guide.title}</strong><small>{guide.intro}</small></span><ArrowUpRight size={16} /></Link>)}
          {!results.length && <div className="kb-search-empty"><strong>No public guide matches “{query}”.</strong><span>Try “database”, “SSL”, “PHP”, “WordPress”, or “backup”.</span></div>}
        </div>
      </div>
    </div>
  );
}
