/* OpenHands-style professional documentation homepage */
import { useState } from "react";
import { Link } from "wouter";
import DocsHeader from "../components/DocsHeader";
import DocsSidebar from "../components/DocsSidebar";
import DocsSearchDialog from "../components/DocsSearchDialog";
import { allGuides } from "../data/guides";
import { docsGroups } from "../lib/docs";
import { BookOpen, ShieldCheck, Server, Database, Lock, Wrench, ArrowRight } from "lucide-react";

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [edition, setEdition] = useState<"shared" | "dedicated">("shared");

  const domainIcons: Record<string, React.ReactNode> = {
    "Start here": <BookOpen size={20} />,
    "Data & storage": <Database size={20} />,
    "Security & network": <Lock size={20} />,
    "Application runtime": <Server size={20} />,
    "Operations": <Wrench size={20} />,
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--kb-bg)", color: "var(--kb-text)" }}>
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
          <div style={{ marginBottom: "36px" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 10px",
              borderRadius: "4px",
              background: "var(--kb-accent-bg)",
              color: "var(--kb-accent)",
              fontSize: "12px",
              fontWeight: "600",
              marginBottom: "16px",
            }}>
              <ShieldCheck size={14} /> Official {edition === "shared" ? "Shared Hosting" : "Dedicated Enterprise"} Documentation
            </div>
            <h1 style={{ fontSize: "36px", fontWeight: "800", letterSpacing: "-0.02em", color: "var(--kb-text)", marginBottom: "12px" }}>
              Brick Documentation Hub
            </h1>
            <p style={{ fontSize: "16px", color: "var(--kb-text-muted)", lineHeight: "1.6", maxWidth: "720px" }}>
              Production-grade reference manuals for managing shared hosting tenants, configuring secure databases, issuing SSL/TLS certificates, and operating through the Brick Web UI.
            </p>
          </div>

          {/* Product Domains Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px", marginBottom: "48px" }}>
            {docsGroups.map((group) => {
              const icon = domainIcons[group.label] || <BookOpen size={20} />;
              const firstSlug = group.slugs[0];
              const firstGuide = allGuides.find((g) => g.slug === firstSlug);

              return (
                <div
                  key={group.label}
                  style={{
                    backgroundColor: "var(--kb-surface)",
                    border: "1px solid var(--kb-border)",
                    borderRadius: "8px",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "6px",
                      backgroundColor: "var(--kb-surface-soft)",
                      border: "1px solid var(--kb-border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--kb-accent)",
                      marginBottom: "16px",
                    }}>
                      {icon}
                    </div>
                    <h3 style={{ fontSize: "18px", fontWeight: "700", color: "var(--kb-text)", marginBottom: "8px" }}>
                      {group.label}
                    </h3>
                    <p style={{ fontSize: "14px", color: "var(--kb-text-muted)", lineHeight: "1.5", marginBottom: "20px" }}>
                      {group.description}
                    </p>
                  </div>

                  {firstGuide && (
                    <Link
                      href={`/docs/v0.9/${firstSlug}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "var(--kb-accent)",
                        textDecoration: "none",
                      }}
                    >
                      <span>Explore {group.label}</span>
                      <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* All Guides Directory */}
          <div style={{
            backgroundColor: "var(--kb-surface)",
            border: "1px solid var(--kb-border)",
            borderRadius: "8px",
            padding: "28px",
          }}>
            <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px", color: "var(--kb-text)" }}>
              Complete Guide Index
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
              {allGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/docs/v0.9/${guide.slug}`}
                  style={{
                    display: "block",
                    padding: "14px 16px",
                    borderRadius: "6px",
                    backgroundColor: "var(--kb-surface-soft)",
                    border: "1px solid var(--kb-border)",
                    textDecoration: "none",
                    transition: "border-color 0.15s ease",
                  }}
                >
                  <div style={{ fontSize: "15px", fontWeight: "600", color: "var(--kb-text)", marginBottom: "4px" }}>
                    {guide.title}
                  </div>
                  <div style={{ fontSize: "13px", color: "var(--kb-text-muted)" }}>
                    {guide.category}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>

      <DocsSearchDialog
        open={searchOpen}
        query={searchQuery}
        version="v0.9"
        onQueryChange={setSearchQuery}
        onClose={() => setSearchOpen(false)}
      />
    </div>
  );
}
