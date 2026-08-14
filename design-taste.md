# Brick Docs: Motion & Visual Design System (Taste Contract)

## 1. Aesthetic Goal & Rejection of "AI Slop"
To avoid generic, oversaturated, low-contrast "AI slop" aesthetics, the redesigned Brick Documentation knowledge base adopts a **restrained engineering aesthetic** inspired by high-end developer platforms (Vercel, Linear, OpenHands, Omnivore). 

Key principles:
- **Calm, Immersive Canvas**: Deep obsidian background tones (`#090a0f`, `#0d1117`) paired with subtle slate structure (`#161b22`) and electric cyan/emerald highlights (`#06b6d4`, `#10b981`), avoiding harsh neon splashes or muddy gradients.
- **Accessible Contrast**: All text must meet WCAG AA/AAA contrast ratios against both dark and light surfaces. Light mode uses crisp off-white papers (`#f8fafc`, `#f1f5f9`) with slate ink (`#0f172a`), while dark mode uses rich obsidian with high-contrast text (`#f8fafc`, `#94a3b8`).
- **Purposeful Motion**: GSAP-powered transitions and subtle organic background flows (aurora gradient mesh) must enhance navigation and spatial orientation rather than distracting the reader.

---

## 2. The Aurora & GSAP Motion Architecture
- **Aurora Background Mesh**: A fixed, multi-layered SVG / CSS radial gradient mesh in the background that slowly shifts in position using subtle keyframe or GSAP ticker interpolation. It provides organic depth without high CPU overhead or visual clutter.
- **GSAP Micro-Interactions**:
  - **Page Entrances**: Staggered fade-up entrances for hero elements, section headings, and guide cards.
  - **Card Hover Elevation**: Smooth spring/power2 easing on hover for documentation cards and code panels.
  - **Command Palette & Drawer Animations**: Fast, origin-aware scale and opacity transitions (`0.2s` ease-out) for search dialogs and the assistant drawer.
- **Reduced Motion Support**: All GSAP and CSS animations check `prefers-reduced-motion: reduce` and disable non-essential motion instantly.

---

## 3. Typography & Information Hierarchy
- **Primary Typeface**: Inter / Geist sans-serif with optimized letter-spacing (`tracking-tight` for headings, `tracking-normal` for body).
- **Monospace Code & Badges**: JetBrains Mono / Fira Code for code blocks, CLI commands, and status badges.
- **Structure**: Three-column workstation layout (left persistent task sidebar, center reading measure with `max-w-3xl`, right sticky table of contents).
