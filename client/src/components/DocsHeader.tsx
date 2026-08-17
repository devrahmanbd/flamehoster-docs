/* OpenHands-style professional documentation header */
import { ExternalLink, Menu, Moon, Search, Sun, X } from "lucide-react";
import { Link } from "wouter";
import { useTheme } from "../contexts/ThemeContext";

interface DocsHeaderProps {
  mobileOpen?: boolean;
  onToggleMobile?: () => void;
  onOpenSearch?: () => void;
  edition: "shared" | "dedicated";
  onEditionChange: (edition: "shared" | "dedicated") => void;
}

export default function DocsHeader({ mobileOpen = false, onToggleMobile, onOpenSearch, edition, onEditionChange }: DocsHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header style={{
      height: "60px",
      backgroundColor: "var(--kb-surface)",
      borderBottom: "1px solid var(--kb-border)",
      position: "sticky",
      top: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {onToggleMobile && (
          <button
            onClick={onToggleMobile}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "1px solid var(--kb-border)",
              borderRadius: "6px",
              width: "36px",
              height: "36px",
              color: "var(--kb-text)",
              cursor: "pointer",
            }}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        )}

        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{
            width: "28px",
            height: "28px",
            borderRadius: "6px",
            backgroundColor: "var(--kb-accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontWeight: "700",
            fontSize: "14px",
            fontFamily: "var(--kb-font-mono)",
          }}>
            B
          </div>
          <span style={{ fontSize: "16px", fontWeight: "700", color: "var(--kb-text)", letterSpacing: "-0.01em" }}>
            BrickDocs
          </span>
        </Link>

        {/* Edition Switcher */}
        <div style={{
          display: "flex",
          background: "var(--kb-surface-soft)",
          border: "1px solid var(--kb-border)",
          borderRadius: "6px",
          padding: "2px",
          marginLeft: "8px",
        }}>
          <button
            onClick={() => onEditionChange("shared")}
            style={{
              padding: "4px 10px",
              borderRadius: "4px",
              border: "none",
              background: edition === "shared" ? "var(--kb-accent)" : "transparent",
              color: edition === "shared" ? "#ffffff" : "var(--kb-text-muted)",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Shared
          </button>
          <button
            onClick={() => onEditionChange("dedicated")}
            style={{
              padding: "4px 10px",
              borderRadius: "4px",
              border: "none",
              background: edition === "dedicated" ? "var(--kb-accent)" : "transparent",
              color: edition === "dedicated" ? "#ffffff" : "var(--kb-text-muted)",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Dedicated
          </button>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {onOpenSearch && (
          <button
            onClick={onOpenSearch}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "240px",
              height: "36px",
              padding: "0 12px",
              background: "var(--kb-surface-soft)",
              border: "1px solid var(--kb-border)",
              borderRadius: "6px",
              color: "var(--kb-text-muted)",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Search size={14} /> Search documentation...
            </span>
            <kbd style={{
              fontSize: "11px",
              padding: "1px 5px",
              background: "var(--kb-surface)",
              borderRadius: "4px",
              border: "1px solid var(--kb-border)",
              fontFamily: "var(--kb-font-mono)",
              color: "var(--kb-text-faint)",
            }}>
              ⌘K
            </kbd>
          </button>
        )}

        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          style={{
            background: "var(--kb-surface-soft)",
            border: "1px solid var(--kb-border)",
            borderRadius: "6px",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--kb-text)",
          }}
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <a
          href="https://github.com/devrahmanbd/flamehoster"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 12px",
            borderRadius: "6px",
            background: "var(--kb-surface-soft)",
            border: "1px solid var(--kb-border)",
            color: "var(--kb-text)",
            fontSize: "13px",
            fontWeight: "500",
            textDecoration: "none",
          }}
        >
          <span>GitHub</span>
          <ExternalLink size={13} style={{ color: "var(--kb-text-faint)" }} />
        </a>
      </div>
    </header>
  );
}
