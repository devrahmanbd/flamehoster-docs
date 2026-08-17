import { ExternalLink, Menu, Moon, Search, Sun, X } from "lucide-react";
import { useEffect } from "react";
import { Link } from "wouter";
import { useTheme } from "../contexts/ThemeContext";
import type { DocsEdition } from "../lib/docs";

interface DocsHeaderProps {
  edition: DocsEdition;
  mobileOpen: boolean;
  onToggleMobile: () => void;
  onOpenSearch: () => void;
  onEditionChange: (edition: DocsEdition) => void;
}

export default function DocsHeader({ edition, mobileOpen, onToggleMobile, onOpenSearch, onEditionChange }: DocsHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleSearchShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener("keydown", handleSearchShortcut);
    return () => window.removeEventListener("keydown", handleSearchShortcut);
  }, [onOpenSearch]);

  return (
    <header className="docs-header">
      <div className="docs-header__start">
        <button className="docs-icon-button docs-menu-trigger" type="button" onClick={onToggleMobile} aria-label={mobileOpen ? "Close documentation navigation" : "Open documentation navigation"} aria-controls="docs-sidebar" aria-expanded={mobileOpen}>
          {mobileOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
        <Link href="/docs/shared" className="docs-brand" aria-label="BrickDocs home">
          <span className="docs-brand__mark" aria-hidden="true">B</span>
          <span>Brick<span>Docs</span></span>
        </Link>
        <div className="docs-edition-switch" aria-label="Documentation edition" role="group">
          <button type="button" aria-pressed={edition === "shared"} className={edition === "shared" ? "is-active" : ""} onClick={() => onEditionChange("shared")}>Shared</button>
          <button type="button" aria-pressed={edition === "dedicated"} className={edition === "dedicated" ? "is-active" : ""} onClick={() => onEditionChange("dedicated")}>Dedicated</button>
        </div>
      </div>
      <div className="docs-header__end">
        <button type="button" className="docs-search-trigger" onClick={onOpenSearch} aria-label="Search BrickDocs">
          <Search size={16} aria-hidden="true" />
          <span>Search documentation</span>
          <kbd>⌘ K</kbd>
        </button>
        <button type="button" className="docs-icon-button" onClick={toggleTheme} aria-label={theme === "dark" ? "Use light theme" : "Use dark theme"}>
          {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <a className="docs-github-link" href="https://github.com/devrahmanbd/flamehoster" target="_blank" rel="noreferrer">
          <span>Project</span><ExternalLink size={14} aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
