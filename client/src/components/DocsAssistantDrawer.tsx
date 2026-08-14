/* Brick Docs design reminder: the assistant is a documentation helper only; it may answer from public guide content but must never imply shell access or infrastructure control. */
import { BookOpen, Loader2, MessageCircleQuestion, Send, Sparkles, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Streamdown } from "streamdown";
import { trpc } from "../lib/trpc";
import { getGuideHref, type DocsVersion } from "../lib/docs";

interface DocsAssistantDrawerProps {
  open: boolean;
  version: DocsVersion;
  onClose: () => void;
}

type AssistantMessage = {
  role: "user" | "assistant";
  content: string;
  citations?: Array<{ slug: string; title: string; section: string }>;
};

const prompts = ["How do I deploy an app?", "Where do I configure SSL?", "How do I restore a backup?"];

export default function DocsAssistantDrawer({ open, version, onClose }: DocsAssistantDrawerProps) {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const askDocs = trpc.docs.ask.useMutation();

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const submitQuestion = (event?: FormEvent) => {
    event?.preventDefault();
    const question = query.trim();
    if (!question || askDocs.isPending) return;
    setMessages((current) => [...current, { role: "user", content: question }]);
    setQuery("");
    askDocs.mutate(
      { question, version },
      {
        onSuccess: (result) => {
          setMessages((current) => [
            ...current,
            { role: "assistant", content: result.answer, citations: result.citations },
          ]);
        },
        onError: () => {
          setMessages((current) => [
            ...current,
            {
              role: "assistant",
              content: "The documentation assistant is temporarily unavailable. Use search to open a verified Brick Web UI guide instead.",
            },
          ]);
        },
      },
    );
  };

  return (
    <div className="kb-drawer-layer" role="presentation" onMouseDown={onClose}>
      <aside className="kb-assistant-drawer" role="dialog" aria-modal="true" aria-label="Brick documentation assistant" onMouseDown={(event) => event.stopPropagation()}>
        <div className="kb-assistant-drawer__header">
          <div>
            <span className="kb-assistant-eyebrow"><Sparkles size={13} /> Documentation assistant</span>
            <h2>Find a verified answer.</h2>
          </div>
          <button className="kb-dialog-close" onClick={onClose} aria-label="Close documentation assistant"><X size={18} /></button>
        </div>
        <p className="kb-assistant-copy">Answers are grounded in the published Brick Web UI guides. The assistant cannot access your host, run commands, or provide terminal instructions.</p>

        <div className="kb-assistant-thread" aria-live="polite">
          {!messages.length && (
            <div className="kb-assistant-welcome">
              <div className="kb-assistant-welcome__icon"><MessageCircleQuestion size={19} /></div>
              <strong>Ask about a panel task</strong>
              <span>Try one of these starting points.</span>
              <div className="kb-assistant-prompts">{prompts.map((prompt) => <button key={prompt} onClick={() => setQuery(prompt)}>{prompt}</button>)}</div>
            </div>
          )}
          {messages.map((message, index) => (
            <div className={`kb-assistant-message kb-assistant-message--${message.role}`} key={`${message.role}-${index}`}>
              <span className="kb-assistant-message__label">{message.role === "user" ? "You" : "Brick Docs"}</span>
              <div className="kb-assistant-message__body"><Streamdown>{message.content}</Streamdown></div>
              {message.citations?.length ? <div className="kb-assistant-citations">{message.citations.map((citation) => <Link key={`${citation.slug}-${citation.section}`} href={getGuideHref(citation.slug, version)} onClick={onClose}><BookOpen size={13} /><span>{citation.title}<small>{citation.section}</small></span></Link>)}</div> : null}
            </div>
          ))}
          {askDocs.isPending && <div className="kb-assistant-message kb-assistant-message--assistant"><span className="kb-assistant-message__label">Brick Docs</span><div className="kb-assistant-thinking"><Loader2 size={15} className="spin" /> Checking the published guides…</div></div>}
        </div>

        <form className="kb-assistant-composer" onSubmit={submitQuestion}>
          <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ask about a web panel task…" aria-label="Ask Brick Docs a question" maxLength={600} />
          <button type="submit" aria-label="Ask documentation assistant" disabled={!query.trim() || askDocs.isPending}><Send size={16} /></button>
        </form>
        <div className="kb-assistant-footnote">Public guide grounding only · No host access · No terminal assistance</div>
      </aside>
    </div>
  );
}
