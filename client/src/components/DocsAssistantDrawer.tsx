/* Brick Docs design reminder: the assistant is a Web UI guide helper only; it never implies shell access or infrastructure control. */
import { BookOpen, MessageCircleQuestion, Send, Sparkles, Volume2, VolumeX, X } from "lucide-react";
import { FormEvent, MutableRefObject, useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Streamdown } from "streamdown";
import { trpc } from "../lib/trpc";
import { getGuideHref, type DocsVersion } from "../lib/docs";

interface DocsAssistantDrawerProps {
  open: boolean;
  version: DocsVersion;
  onClose: () => void;
  onOpen: () => void;
}

type AssistantMessage = {
  role: "user" | "assistant";
  content: string;
  citations?: Array<{ slug: string; title: string; section: string }>;
};

const prompts = ["How do I deploy an app?", "Where do I configure SSL?", "How do I restore a backup?"];
const SOUND_STORAGE_KEY = "brick-docs-ask-sound";

type Tone = "send" | "receive";

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

export default function DocsAssistantDrawer({ open, version, onClose, onOpen }: DocsAssistantDrawerProps) {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(SOUND_STORAGE_KEY) === "true";
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
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
      { question, version },
      {
        onSuccess: (result) => {
          if (soundEnabled) playNotificationTone(audioContextRef, "receive");
          setMessages((current) => [...current, { role: "assistant", content: result.answer, citations: result.citations }]);
        },
        onError: () => {
          if (soundEnabled) playNotificationTone(audioContextRef, "receive");
          setMessages((current) => [...current, { role: "assistant", content: "The documentation assistant is temporarily unavailable. Use search to open a verified Brick Web UI guide instead." }]);
        },
      },
    );
  };

  return (
    <div className="kb-assistant-widget">
      {open && (
        <section id="brick-assistant-widget" className="kb-assistant-drawer" role="dialog" aria-modal="false" aria-label="Brick documentation assistant" aria-describedby="brick-assistant-description">
          <div className="kb-assistant-drawer__header">
            <div>
              <span className="kb-assistant-eyebrow"><Sparkles size={13} /> Guide-grounded help</span>
              <h2>Ask Brick Docs.</h2>
            </div>
            <div className="kb-assistant-drawer__actions">
              <button className="kb-dialog-close" onClick={toggleSound} aria-label={soundEnabled ? "Mute assistant sounds" : "Enable assistant sounds"} title={soundEnabled ? "Mute assistant sounds" : "Enable assistant sounds"}>{soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}</button>
              <button className="kb-dialog-close" onClick={onClose} aria-label="Close documentation assistant"><X size={18} /></button>
            </div>
          </div>
          <p id="brick-assistant-description" className="kb-assistant-copy">Welcome. Ask about a Brick Web UI task and I’ll point you to the published workflow, without host access or terminal instructions.</p>

          <div className="kb-assistant-thread" aria-live="polite">
            {!messages.length && (
              <div className="kb-assistant-welcome">
                <div className="kb-assistant-welcome__icon"><MessageCircleQuestion size={19} /></div>
                <strong>What are you working on?</strong>
                <span>Choose a starting point or ask in your own words.</span>
                <div className="kb-assistant-prompts">{prompts.map((prompt) => <button key={prompt} onClick={() => { setQuery(prompt); inputRef.current?.focus(); }}>{prompt}</button>)}</div>
              </div>
            )}
            {messages.map((message, index) => (
              <div className={`kb-assistant-message kb-assistant-message--${message.role}`} key={`${message.role}-${index}`}>
                <span className="kb-assistant-message__label">{message.role === "user" ? "You" : "Brick Docs"}</span>
                <div className="kb-assistant-message__body"><Streamdown>{message.content}</Streamdown></div>
                {message.citations?.length ? <div className="kb-assistant-citations">{message.citations.map((citation) => <Link key={`${citation.slug}-${citation.section}`} href={getGuideHref(citation.slug, version)} onClick={onClose}><BookOpen size={13} /><span>{citation.title}<small>{citation.section}</small></span></Link>)}</div> : null}
              </div>
            ))}
            {askDocs.isPending && <div className="kb-assistant-message kb-assistant-message--assistant"><span className="kb-assistant-message__label">Brick Docs</span><div className="kb-assistant-thinking"><span>Reviewing the published guides</span><span className="kb-assistant-typing" aria-label="Brick Docs is typing"><i /><i /><i /></span></div></div>}
          </div>

          <form className="kb-assistant-composer" onSubmit={submitQuestion}>
            <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ask about a Web UI task…" aria-label="Ask Brick Docs a question" maxLength={600} />
            <button type="submit" aria-label="Ask documentation assistant" disabled={!query.trim() || askDocs.isPending}><Send size={16} /></button>
          </form>
          <div className="kb-assistant-footnote">Public guide grounding only · {soundEnabled ? "Sound on" : "Sound off"} · No host access</div>
        </section>
      )}
      <button className={`kb-assistant-fab ${open ? "kb-assistant-fab--open" : ""}`} onClick={open ? onClose : onOpen} aria-expanded={open} aria-controls="brick-assistant-widget" aria-label={open ? "Close Ask Brick Docs" : "Open Ask Brick Docs"}>
        <span className="kb-assistant-fab__icon"><MessageCircleQuestion size={19} /></span>
        <span className="kb-assistant-fab__copy"><strong>Ask Brick</strong><small>Web UI help</small></span>
        <span className="kb-assistant-fab__pulse" aria-hidden="true" />
      </button>
    </div>
  );
}
