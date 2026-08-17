/* OpenHands-style professional documentation guide reader page */
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Clipboard, Copy, FileText, Link2, Terminal, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import DocsAssistantDrawer from "../components/DocsAssistantDrawer";
import DocsHeader from "../components/DocsHeader";
import DocsSearchDialog from "../components/DocsSearchDialog";
import DocsSidebar from "../components/DocsSidebar";
import SeoMeta from "../components/SeoMeta";
import { allGuides } from "../data/guides";
import { findGuide, getGuideHref, type DocsVersion } from "../lib/docs";

function ChevronSlash() {
  return <ChevronRight size={13} style={{ color: "var(--kb-text-faint)" }} aria-hidden="true" />;
}

interface GuideProps {
  slug: string;
  version?: DocsVersion;
}

export default function Guide({ slug, version = "v0.9" }: GuideProps) {
  const [, navigate] = useLocation();
  const guide = findGuide(slug);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [pageCopied, setPageCopied] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [edition, setEdition] = useState<"shared" | "dedicated">("shared");

  const currentIndex = allGuides.findIndex((item) => item.slug === guide.slug);
  const previousGuide = currentIndex > 0 ? allGuides[currentIndex - 1] : null;
  const nextGuide = currentIndex >= 0 && currentIndex < allGuides.length - 1 ? allGuides[currentIndex + 1] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [guide.slug]);

  const copyCode = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      window.setTimeout(() => setCopiedIndex(null), 1500);
    } catch {
      // Fallback
    }
  };

  const copyPageLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      // Fallback
    }
    setPageCopied(true);
    window.setTimeout(() => setPageCopied(false), 1500);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--kb-bg)", color: "var(--kb-text)" }}>
      <SeoMeta
        title={guide.title}
        description={guide.intro}
        path={`/docs/${version}/${guide.slug}`}
        type="article"
        section={guide.category}
        keywords={[guide.title, guide.category, "Brick Web UI", "hosting panel", "operator guide"]}
      />
      <DocsHeader
        mobileOpen={mobileOpen}
        onToggleMobile={() => setMobileOpen(!mobileOpen)}
        onOpenSearch={() => setSearchOpen(true)}
        edition={edition}
        onEditionChange={setEdition}
      />
      <div className="kb-layout">
        <DocsSidebar isOpen={mobileOpen} edition={edition} />
        <main className="kb-main-content">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--kb-text-muted)", marginBottom: "20px" }}>
            <Link href="/" style={{ color: "var(--kb-text-muted)", textDecoration: "none" }}>Brick Docs</Link>
            <ChevronSlash />
            <span>{guide.category}</span>
            <ChevronSlash />
            <span style={{ color: "var(--kb-text)", fontWeight: "500" }}>{guide.title}</span>
          </div>

          <article style={{ lineHeight: "1.7" }}>
            <div style={{ fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--kb-accent)", marginBottom: "8px" }}>
              {guide.eyebrow}
            </div>
            <h1 style={{ fontSize: "32px", fontWeight: "800", color: "var(--kb-text)", letterSpacing: "-0.02em", marginBottom: "16px" }}>
              {guide.title}
            </h1>
            <p style={{ fontSize: "16px", color: "var(--kb-text-muted)", marginBottom: "24px" }}>
              {guide.intro}
            </p>

            <div style={{ display: "flex", gap: "12px", marginBottom: "32px", paddingBottom: "24px", borderBottom: "1px solid var(--kb-border)" }}>
              <button
                onClick={copyPageLink}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "1px solid var(--kb-border)",
                  background: "var(--kb-surface-soft)",
                  color: "var(--kb-text)",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                <Link2 size={14} /> {pageCopied ? "Link copied" : "Copy link"}
              </button>
              <button
                onClick={() => setAssistantOpen(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "1px solid var(--kb-border)",
                  background: "var(--kb-surface-soft)",
                  color: "var(--kb-text)",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                <FileText size={14} /> Ask assistant
              </button>
            </div>

            {guide.sections.map((section, index) => (
              <section key={section.title} id={`section-${index + 1}`} style={{ marginBottom: "40px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: "700", color: "var(--kb-text)", marginBottom: "12px" }}>
                  {index + 1}. {section.title}
                </h2>
                <p style={{ fontSize: "15px", color: "var(--kb-text-muted)", marginBottom: "16px" }}>
                  {section.body}
                </p>

                {section.bullets && (
                  <ul style={{ listStyle: "disc", paddingLeft: "20px", marginBottom: "16px", color: "var(--kb-text-muted)" }}>
                    {section.bullets.map((bullet) => (
                      <li key={bullet} style={{ marginBottom: "6px", fontSize: "14px" }}>{bullet}</li>
                    ))}
                  </ul>
                )}

                {section.code && (
                  <div style={{
                    backgroundColor: "var(--kb-code-bg)",
                    border: "1px solid var(--kb-border)",
                    borderRadius: "6px",
                    overflow: "hidden",
                    marginBottom: "16px",
                  }}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 12px",
                      backgroundColor: "var(--kb-surface-soft)",
                      borderBottom: "1px solid var(--kb-border)",
                      fontSize: "12px",
                      color: "var(--kb-text-muted)",
                    }}>
                      <span>Terminal / Configuration Example</span>
                      <button
                        onClick={() => copyCode(section.code!, index)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "var(--kb-accent)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        {copiedIndex === index ? <Clipboard size={13} /> : <Copy size={13} />}
                        {copiedIndex === index ? "Copied" : "Copy"}
                      </button>
                    </div>
                    <pre style={{ padding: "16px", margin: 0, overflowX: "auto", fontFamily: "var(--kb-font-mono)", fontSize: "13px", color: "var(--kb-text)" }}>
                      <code>{section.code}</code>
                    </pre>
                  </div>
                )}
              </section>
            ))}

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "48px",
              paddingTop: "24px",
              borderTop: "1px solid var(--kb-border)",
            }}>
              {previousGuide ? (
                <Link
                  href={getGuideHref(previousGuide.slug, version)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    textDecoration: "none",
                    padding: "12px 16px",
                    borderRadius: "6px",
                    backgroundColor: "var(--kb-surface)",
                    border: "1px solid var(--kb-border)",
                  }}
                >
                  <span style={{ fontSize: "12px", color: "var(--kb-text-faint)", display: "flex", alignItems: "center", gap: "4px" }}>
                    <ArrowLeft size={12} /> Previous guide
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--kb-text)" }}>{previousGuide.title}</span>
                </Link>
              ) : <div />}

              {nextGuide ? (
                <Link
                  href={getGuideHref(nextGuide.slug, version)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    textDecoration: "none",
                    padding: "12px 16px",
                    borderRadius: "6px",
                    backgroundColor: "var(--kb-surface)",
                    border: "1px solid var(--kb-border)",
                    textAlign: "right",
                  }}
                >
                  <span style={{ fontSize: "12px", color: "var(--kb-text-faint)", display: "flex", alignItems: "center", gap: "4px", justifyContent: "flex-end" }}>
                    Next guide <ArrowRight size={12} />
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--kb-text)" }}>{nextGuide.title}</span>
                </Link>
              ) : <div />}
            </div>
          </article>
        </main>
      </div>

      <DocsSearchDialog
        open={searchOpen}
        query={searchQuery}
        version={version}
        onQueryChange={setSearchQuery}
        onClose={() => setSearchOpen(false)}
      />
      <DocsAssistantDrawer
        open={assistantOpen}
        version={version}
        onOpen={() => setAssistantOpen(true)}
        onClose={() => setAssistantOpen(false)}
      />
    </div>
  );
}
