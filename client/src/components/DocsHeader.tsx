/* Brick Docs design-system v1.0: compact, calm header with predictable controls */
import { ExternalLink, Menu, Moon, Search, Sun, X } from "lucide-react";
import { Link } from "wouter";
import { useTheme } from "../contexts/ThemeContext";

interface DocsHeaderProps {
  mobileOpen?: boolean;
  isGuide?: boolean;
  onToggleMobile?: () => void;
  onOpenSearch?: () => void;
}

export default function DocsHeader({ mobileOpen = false, isGuide = false, onToggleMobile, onOpenSearch }: DocsHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="kb-header" style={{ height: "64px", borderBottom: "1px solid var(--kb-line)", background: "var(--kb-surface)", position: "sticky", top: 0, zIndex: 40, display: "flex", alignItems: "center", padding: "0 24px", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {onToggleMobile && (
          <button
            onClick={onToggleMobile}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            style={{ display: "flex", background: "transparent", border: "1px solid var(--kb-line)", borderRadius: "6px", padding: "6px", cursor: "pointer", color: "var(--kb-ink)", alignItems: "center", justifyContent: "center" }}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        )}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{ width: "26px", height: "26px", borderRadius: "6px", background: "var(--kb-accent)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "700", fontSize: "13px", fontFamily: "var(--kb-font-mono)" }}>
            B
          </div>
          <span style={{ fontSize: "16px", fontWeight: "700", fontFamily: "var(--kb-font-display)", color: "var(--kb-ink-strong)", letterSpacing: "-.02em" }}>
            BrickDocs
          </span>
        </Link>
        <span style={{ fontSize: "11px", fontFamily: "var(--kb-font-mono)", padding: "2px 6px", borderRadius: "4px", background: "var(--kb-accent-wash)", color: "var(--kb-accent-strong)", border: "1px solid var(--kb-line)" }}>
          Shared User Edition v1.0
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {onOpenSearch && (
          <button
            onClick={onOpenSearch}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "6px 14px",
              borderRadius: "8px",
              border: "1px solid var(--kb-line)",
              background: "var(--kb-surface-soft)",
              color: "var(--kb-muted)",
              fontSize: "13px",
              cursor: "pointer",
              width: "min(260px, 40vw)",
              justifyContent: "space-between",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Search size={14} /> Search documentation...
            </span>
            <kbd style={{ fontSize: "10px", padding: "1px 5px", background: "var(--kb-surface)", borderRadius: "4px", color: "var(--kb-faint)", border: "1px solid var(--kb-line)", fontFamily: "var(--kb-font-mono)" }}>
              ⌘K
            </kbd>
          </button>
        )}

        <button
          onClick={toggleTheme}
          aria-label="Toggle color theme"
          style={{
            background: "var(--kb-surface-soft)",
            border: "1px solid var(--kb-line)",
            borderRadius: "8px",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--kb-ink)",
          }}
        >
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
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
            borderRadius: "8px",
            background: "var(--kb-surface-soft)",
            border: "1px solid var(--kb-line)",
            color: "var(--kb-ink)",
            fontSize: "12px",
            fontWeight: "500",
            textDecoration: "none",
          }}
        >
          <span>Repository</span>
          <ExternalLink size={13} style={{ color: "var(--kb-faint)" }} />
        </a>
      </div>
    </header>
  );
}
