import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import DocsHeader from "../components/DocsHeader";
import DocsSidebar from "../components/DocsSidebar";
import DocsSearchDialog from "../components/DocsSearchDialog";
import { docsGroups, type DocsVersion } from "../lib/docs";
import { allGuides } from "../data/guides";

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [edition, setEdition] = useState<"shared" | "dedicated">("shared");
  const [, setVersion] = useState<DocsVersion>("v0.9");

  const filteredGroups = docsGroups.map(group => ({
    ...group,
    guides: group.slugs
      .map((slug: string) => allGuides.find(g => g.slug === slug))
      .filter((g): g is NonNullable<typeof g> => {
        if (!g) return false;
        if (edition === "shared") {
          return !g.slug.includes("kernel") && !g.slug.includes("dedicated");
        }
        return true;
      })
  })).filter(g => g.guides.length > 0);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--kb-bg)", color: "var(--kb-text)", display: "flex", flexDirection: "column" }}>
      <DocsHeader
        mobileOpen={mobileOpen}
        onToggleMobile={() => setMobileOpen(!mobileOpen)}
        onOpenSearch={() => setSearchOpen(true)}
        edition={edition}
        onEditionChange={setEdition}
      />

      <div className="kb-layout" style={{ display: "flex", flex: 1 }}>
        <DocsSidebar
          isOpen={mobileOpen}
          edition={edition}
        />

        <main className="kb-main-content" style={{ flex: 1, padding: "48px 64px", maxWidth: "960px", margin: "0 auto" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "4px 12px",
            borderRadius: "9999px",
            background: "var(--kb-accent-bg)",
            border: "1px solid var(--kb-border)",
            fontSize: "12px",
            fontWeight: "600",
            color: "var(--kb-accent)",
            marginBottom: "20px",
          }}>
            <CheckCircle2 size={13} />
            Official {edition === "shared" ? "Shared Hosting" : "Dedicated Enterprise"} Documentation
          </div>

          <h1 style={{ fontSize: "36px", fontWeight: "800", letterSpacing: "-0.03em", marginBottom: "16px", lineHeight: "1.2" }}>
            Brick {edition === "shared" ? "Shared Hosting" : "Dedicated"} Reference Manual
          </h1>
          <p style={{ fontSize: "16px", color: "var(--kb-text-muted)", lineHeight: "1.6", marginBottom: "40px", maxWidth: "720px" }}>
            Production-grade operational guides for managing tenants, configuring databases, issuing SSL/TLS certificates, and controlling your hosting infrastructure through the Brick Web UI.
          </p>

          <div style={{
            padding: "20px",
            borderRadius: "8px",
            background: "var(--kb-surface)",
            border: "1px solid var(--kb-border)",
            marginBottom: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}>
            <div>
              <h3 style={{ fontSize: "15px", fontWeight: "600", marginBottom: "4px" }}>
                Currently viewing: {edition === "shared" ? "Shared Hosting Edition" : "Dedicated Enterprise Edition"}
              </h3>
              <p style={{ fontSize: "13px", color: "var(--kb-text-muted)", margin: 0 }}>
                {edition === "shared" 
                  ? "Optimized for multi-tenant isolation, caged terminal execution, and automated resource quotas."
                  : "Provides full root access, dedicated container clusters, and advanced AI automation hooks."}
              </p>
            </div>
            <button
              onClick={() => setEdition(edition === "shared" ? "dedicated" : "shared")}
              style={{
                padding: "8px 14px",
                borderRadius: "6px",
                background: "var(--kb-surface-soft)",
                border: "1px solid var(--kb-border)",
                color: "var(--kb-text)",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Switch to {edition === "shared" ? "Dedicated" : "Shared"}
            </button>
          </div>

          <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "20px" }}>Core Documentation Domains</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "48px" }}>
            {filteredGroups.map((group) => {
              const firstGuide = group.guides[0];
              return (
                <div key={group.label} style={{
                  background: "var(--kb-surface)",
                  border: "1px solid var(--kb-border)",
                  borderRadius: "8px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}>
                  <div>
                    <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "4px", color: "var(--kb-text)" }}>
                      {group.label}
                    </h3>
                    <p style={{ fontSize: "12px", color: "var(--kb-text-faint)", marginBottom: "12px" }}>{group.description}</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px 0", display: "flex", flexDirection: "column", gap: "8px" }}>
                      {group.guides.map(guide => (
                        <li key={guide.slug}>
                          <Link href={`/docs/v0.9/${guide.slug}`} style={{
                            color: "var(--kb-text-muted)",
                            textDecoration: "none",
                            fontSize: "13px",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}>
                            <span style={{ color: "var(--kb-accent)" }}>›</span> {guide.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {firstGuide && (
                    <Link href={`/docs/v0.9/${firstGuide.slug}`} style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "var(--kb-accent)",
                      textDecoration: "none",
                    }}>
                      Explore {group.label} <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              );
            })}
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
