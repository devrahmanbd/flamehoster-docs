/* Brick Docs design reminder: the assistant is a documentation helper only; it may suggest public pages but must never imply shell access or infrastructure control. */
import { BookOpen, MessageCircleQuestion, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { searchGuides, getGuideHref, type DocsVersion } from "../lib/docs";

interface DocsAssistantDrawerProps {
  open: boolean;
  version: DocsVersion;
  onClose: () => void;
}

const prompts = ["How do I deploy an app?", "What should I check before an update?", "Where do I configure SSL?"];

export default function DocsAssistantDrawer({ open, version, onClose }: DocsAssistantDrawerProps) {
  const [query, setQuery] = useState("");
  const matches = useMemo(() => (query ? searchGuides(query).slice(0, 2) : []), [query]);
  if (!open) return null;

  return (
    <div className="kb-drawer-layer" role="presentation" onMouseDown={onClose}>
      <aside className="kb-assistant-drawer" role="dialog" aria-modal="true" aria-label="Brick documentation helper" onMouseDown={(event) => event.stopPropagation()}>
        <div className="kb-assistant-drawer__header"><div><span className="kb-assistant-eyebrow"><Sparkles size={13} /> Documentation helper</span><h2>Find your next answer.</h2></div><button className="kb-dialog-close" onClick={onClose} aria-label="Close documentation helper"><X size={18} /></button></div>
        <p className="kb-assistant-copy">Ask about a public guide and Brick Docs will point you to the relevant knowledge. This helper does not access your host or run commands.</p>
        <div className="kb-assistant-input"><MessageCircleQuestion size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ask about a guide..." /></div>
        {!query && <div className="kb-assistant-prompts">{prompts.map((prompt) => <button key={prompt} onClick={() => setQuery(prompt)}>{prompt}</button>)}</div>}
        {query && <div className="kb-assistant-matches">{matches.map((guide) => <Link key={guide.slug} href={getGuideHref(guide.slug, version)} onClick={onClose} className="kb-assistant-match"><BookOpen size={16} /><span><strong>{guide.title}</strong><small>{guide.intro}</small></span></Link>)}{!matches.length && <div className="kb-assistant-empty">No matching public guide yet. Try a task such as “database”, “SSL”, “backup”, or “WordPress”.</div>}</div>}
        <div className="kb-assistant-footnote">AI answers can be added later without changing the public route contract. For now, results stay grounded in the published Brick knowledge base.</div>
      </aside>
    </div>
  );
}
