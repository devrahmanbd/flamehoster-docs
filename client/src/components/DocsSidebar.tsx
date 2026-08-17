/* OpenHands-style professional documentation sidebar navigation */
import { Link, useRoute } from "wouter";
import { allGuides } from "../data/guides";
import { docsGroups } from "../lib/docs";

interface DocsSidebarProps {
  isOpen?: boolean;
  edition?: "shared" | "dedicated";
}

export default function DocsSidebar({ isOpen = false, edition = "shared" }: DocsSidebarProps) {
  return (
    <aside className={`kb-sidebar ${isOpen ? "open" : ""}`} aria-label="Documentation Navigation">
      <div style={{ padding: "24px 20px" }}>
        <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--kb-text-faint)", marginBottom: "16px" }}>
          {edition === "shared" ? "Shared Hosting Edition" : "Dedicated Enterprise Edition"}
        </div>
        
        {docsGroups.map((group) => (
          <div key={group.label} style={{ marginBottom: "28px" }}>
            <div style={{
              fontSize: "12px",
              fontWeight: "700",
              color: "var(--kb-text)",
              marginBottom: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.04em"
            }}>
              {group.label}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {group.slugs.map((slug: string) => {
                const guide = allGuides.find((g) => g.slug === slug);
                if (!guide) return null;
                const path = `/docs/v0.9/${slug}`;
                const [match] = useRoute(path);

                return (
                  <Link
                    key={slug}
                    href={path}
                    style={{
                      display: "block",
                      padding: "6px 10px",
                      borderRadius: "6px",
                      fontSize: "13px",
                      fontWeight: match ? "600" : "400",
                      color: match ? "var(--kb-accent)" : "var(--kb-text-muted)",
                      backgroundColor: match ? "var(--kb-accent-bg)" : "transparent",
                      textDecoration: "none",
                      transition: "background 0.15s ease, color 0.15s ease",
                    }}
                  >
                    {guide.title}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
