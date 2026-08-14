/* Brick Docs design reminder: chrome should feel calm and utility-first, with keyboard search, clear contrast, and no host-terminal affordances. */
import { Github, Menu, MessageCircleQuestion, Moon, Search, Sun, X } from "lucide-react";
import { Link } from "wouter";
import { useTheme } from "../contexts/ThemeContext";
import { versionOptions, type DocsVersion } from "../lib/docs";

interface DocsHeaderProps {
  version?: DocsVersion;
  isGuide?: boolean;
  mobileOpen: boolean;
  onToggleMobile: () => void;
  onOpenSearch: () => void;
  onOpenAssistant: () => void;
  onVersionChange?: (version: DocsVersion) => void;
}

export default function DocsHeader({ version = "v0.9", isGuide = false, mobileOpen, onToggleMobile, onOpenSearch, onOpenAssistant, onVersionChange }: DocsHeaderProps) {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="kb-topbar">
      <div className="kb-topbar__inner">
        <div className="kb-brand-cluster">
          <button className="kb-mobile-toggle" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} onClick={onToggleMobile}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          {isGuide && <Link href="/docs" className="kb-wordmark-back" aria-label="Back to Brick Docs"><span>←</span></Link>}
          <Link href="/" className="kb-wordmark" aria-label="Brick Docs home">
            <span className="kb-wordmark__mark" aria-hidden="true"><i /><i /><i /></span>
            <span className="kb-wordmark__name">Brick</span>
            <span className="kb-wordmark__kind">Docs</span>
          </Link>
          <span className="kb-topbar-divider" aria-hidden="true" />
          <span className="kb-topbar-context">Knowledge base</span>
          {onVersionChange ? <select className="kb-version-select" value={version} onChange={(event) => onVersionChange(event.target.value as DocsVersion)} aria-label="Documentation release channel">{versionOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select> : <span className={`kb-version-badge kb-version-badge--${version === "v0.9" ? "stable" : "beta"}`}>{version === "v0.9" ? "Stable" : "Beta"}</span>}
        </div>
        <div className="kb-topbar__actions">
          <button className="kb-search-trigger" onClick={onOpenSearch} aria-label="Search Brick documentation">
            <Search size={15} /><span>Search documentation</span><kbd>⌘ K</kbd>
          </button>
          <button className="kb-assistant-trigger" onClick={onOpenAssistant} aria-label="Open documentation helper"><MessageCircleQuestion size={16} /><span>Ask docs</span></button>
          <a className="kb-icon-link" href="https://github.com/devrahmanbd/flamehoster" target="_blank" rel="noreferrer" aria-label="Open Brick on GitHub"><Github size={17} /></a>
          <button className="kb-icon-link" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}>
            {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
          </button>
        </div>
      </div>
    </header>
  );
}
