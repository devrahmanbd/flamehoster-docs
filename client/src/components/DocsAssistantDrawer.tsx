/* Brick Docs design reminder: the assistant is a source-grounded Web UI guide helper; it never implies shell access or infrastructure control. */
import { BookOpen, MessageCircleQuestion, Send, ShieldCheck, Sparkles, Volume2, VolumeX, X } from "lucide-react";
import { FormEvent, MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { Streamdown } from "streamdown";
import { trpc } from "../lib/trpc";
import { getGuideHref, type DocsEdition } from "../lib/docs";

interface DocsAssistantDrawerProps {
  open: boolean;
  edition: DocsEdition;
  onClose: () => void;
  onOpen: () => void;
}

type AssistantStatus = "answer" | "boundary" | "not-found" | "limited";
type AssistantMessage = {
  role: "user" | "assistant";
  content: string;
  citations?: Array<{ slug: string; title: string; section: string }>;
  status?: AssistantStatus;
  redirectReason?: string;
};

const prompts: Record<DocsEdition, string[]> = {
  shared: ["Where do I configure SSL?", "How do I change my PHP version?", "How do I restore a backup?"],
  dedicated: ["How do I deploy an app?", "Where do I configure SSL?", "How do I restore a backup?"],
};
const SOUND_STORAGE_KEY = "brick-docs-ask-sound";
type Tone = "send" | "receive";

function editionLabel(edition: DocsEdition) {
  return edition === "shared" ? "Shared Hosting" : "Dedicated";
}

function playNotificationTone(contextRef: MutableRefObject<AudioContext | null>, tone: Tone) {
  if (typeof window === "undefined") return;
  const AudioContextClass = window.AudioContext ?? (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;
  const context = contextRef.current ?? new AudioContextClass();
  contextRef.current = context;
  void context.resume().then(() => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(tone === "receive" ? 720 : 520, now);
    oscillator.frequency.exponentialRampToValueAtTime(tone === "receive" ? 920 : 620, now + 0.09);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.045, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.13);
  }).catch(() => undefined);
}

function statusLabel(status?: AssistantStatus) {
  if (status === "boundary") return "Safety boundary";
  if (status === "not-found") return "No published match";
  if (status === "limited") return "Guide handoff";
  return "Source-checked";
}

export default function DocsAssistantDrawer({ open, edition, onClose, onOpen }: DocsAssistantDrawerProps) {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(SOUND_STORAGE_KEY) === "true";
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const askDocs = trpc.docs.ask.useMutation();
  const currentPrompts = useMemo(() => prompts[edition], [edition]);
  const activeEditionLabel = editionLabel(edition);
  const closeAssistant = () => {
    onClose();
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  useEffect(() => {
    setMessages([]);
    setQuery("");
  }, [edition]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAssistant();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, closeAssistant]);

  const toggleSound = () => {
    setSoundEnabled((enabled) => {
      const next = !enabled;
      window.localStorage.setItem(SOUND_STORAGE_KEY, String(next));
      if (next) playNotificationTone(audioContextRef, "receive");
      return next;
    });
  };

  const submitQuestion = (event?: FormEvent) => {
    event?.preventDefault();
    const question = query.trim();
    if (!question || askDocs.isPending) return;
    if (soundEnabled) playNotificationTone(audioContextRef, "send");
    setMessages((current) => [...current, { role: "user", content: question }]);
    setQuery("");
    askDocs.mutate(
      { question, edition },
      {
        onSuccess: (result) => {
          if (soundEnabled) playNotificationTone(audioContextRef, "receive");
          setMessages((current) => [...current, {
            role: "assistant",
            content: result.answer,
            citations: result.citations,
            status: result.status,
            redirectReason: result.redirectReason,
          }]);
        },
        onError: () => {
          if (soundEnabled) playNotificationTone(audioContextRef, "receive");
          setMessages((current) => [...current, {
            role: "assistant",
            content: "The documentation assistant is temporarily unavailable. Use search to open a verified Brick Web UI guide instead.",
            status: "limited",
          }]);
        },
      },
    );
  };

  return (
    <div className="docs-assistant-widget">
      {open && (
        <section id="brick-assistant-widget" className="docs-assistant-drawer" role="dialog" aria-modal="false" aria-label="Brick documentation assistant" aria-describedby="brick-assistant-description">
          <div className="docs-assistant-drawer__header">
            <div>
              <span className="docs-assistant-eyebrow"><Sparkles size={13} /> Guide-grounded help</span>
              <h2>Ask Brick Docs.</h2>
            </div>
            <div className="docs-assistant-drawer__actions">
              <button className="docs-icon-button" onClick={toggleSound} aria-label={soundEnabled ? "Mute assistant sounds" : "Enable assistant sounds"} title={soundEnabled ? "Mute assistant sounds" : "Enable assistant sounds"}>{soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}</button>
              <button className="docs-icon-button" onClick={closeAssistant} aria-label="Close documentation assistant"><X size={18} /></button>
            </div>
          </div>
          <p id="brick-assistant-description" className="docs-assistant-copy">Answers are limited to published <strong>{activeEditionLabel}</strong> guides and include source links. I cannot provide host, terminal, or account-secret instructions.</p>

          <div className="docs-assistant-edition" aria-label={`Assistant is answering from ${activeEditionLabel} guides`}><ShieldCheck size={14} /><span>{activeEditionLabel} source boundary</span></div>
          <div className="docs-assistant-thread" aria-busy={askDocs.isPending}>
            {!messages.length && (
              <div className="docs-assistant-welcome">
                <div className="docs-assistant-welcome__icon"><MessageCircleQuestion size={19} /></div>
                <strong>What are you working on?</strong>
                <span>Choose a published workflow or ask in your own words.</span>
                <div className="docs-assistant-prompts">{currentPrompts.map((prompt) => <button key={prompt} onClick={() => { setQuery(prompt); inputRef.current?.focus(); }}>{prompt}</button>)}</div>
              </div>
            )}
            {messages.map((message, index) => (
              <div className={`docs-assistant-message docs-assistant-message--${message.role}`} key={`${message.role}-${index}`}>
                <div className="docs-assistant-message__meta"><span>{message.role === "user" ? "You" : "Brick Docs"}</span>{message.role === "assistant" && <small className={`docs-assistant-status docs-assistant-status--${message.status ?? "answer"}`}>{statusLabel(message.status)}</small>}</div>
                <div className="docs-assistant-message__body"><Streamdown>{message.content}</Streamdown></div>
                {message.redirectReason && message.status !== "answer" ? <p className="docs-assistant-reason">{message.redirectReason}</p> : null}
                {message.citations?.length ? <div className="docs-assistant-citations" aria-label="Published guide sources">{message.citations.map((citation) => <Link key={`${citation.slug}-${citation.section}`} href={getGuideHref(citation.slug, edition)} onClick={closeAssistant}><BookOpen size={13} /><span>{citation.title}<small>{citation.section}</small></span></Link>)}</div> : null}
              </div>
            ))}
            {askDocs.isPending && <div className="docs-assistant-message docs-assistant-message--assistant"><div className="docs-assistant-message__meta"><span>Brick Docs</span><small className="docs-assistant-status">Checking sources</small></div><div className="docs-assistant-thinking"><span>Reviewing the published guides</span><span className="docs-assistant-typing" aria-label="Brick Docs is typing"><i /><i /><i /></span></div></div>}
          </div>
          <p className="sr-only" role="status" aria-live="polite">{askDocs.isPending ? "Brick Docs is reviewing published guides." : messages.at(-1)?.role === "assistant" ? "Brick Docs response is ready." : ""}</p>

          <form className="docs-assistant-composer" onSubmit={submitQuestion}>
            <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ask about a Web UI task…" aria-label="Ask Brick Docs a question" aria-describedby="brick-assistant-input-help" maxLength={600} />
            <button type="submit" aria-label="Ask documentation assistant" disabled={!query.trim() || askDocs.isPending}><Send size={16} /></button>
          </form>
          <div id="brick-assistant-input-help" className="docs-assistant-footnote">Published-guide grounding only · {soundEnabled ? "Sound on" : "Sound off"} · No host access</div>
        </section>
      )}
      <button ref={triggerRef} className={`docs-assistant-fab ${open ? "docs-assistant-fab--open" : ""}`} onClick={open ? closeAssistant : onOpen} aria-expanded={open} aria-controls="brick-assistant-widget" aria-label={open ? "Close Ask Brick Docs" : "Open Ask Brick Docs"}>
        <span className="docs-assistant-fab__icon"><MessageCircleQuestion size={19} /></span>
        <span className="docs-assistant-fab__copy"><strong>Ask Brick</strong><small>Source-checked help</small></span>
        <span className="docs-assistant-fab__pulse" aria-hidden="true" />
      </button>
    </div>
  );
}
