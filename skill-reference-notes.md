# External skill review notes

## Sources reviewed

- https://github.com/anthropics/skills
- https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- https://github.com/Leonxlnx/taste-skill
- https://github.com/Jpisnice/shadcn-ui-mcp-server
- https://github.com/vercel-labs/agent-skills
- https://github.com/greensock/gsap-skills
- https://github.com/freshtechbro/claudedesignskills
- https://github.com/get-convex/agent-skills

## Findings

The Anthropic skills repository presents skills as self-contained folders with a required `SKILL.md`, optional scripts/references/templates, and progressive disclosure. Its organization favors reusable, modular instructions and clear documentation. The general takeaway is to keep motion and design guidance modular and reusable rather than scattering one-off patterns through page components.

The UI/UX Pro Max guidance emphasizes product-specific design systems, accessible contrast, visible focus, resilient wrapping, reduced motion, responsive checkpoints at 375/768/1024/1440 pixels, and anti-pattern filtering. The useful constraints for Brick Docs are a minimum target of 4.5:1 for text contrast, no tiny low-contrast metadata, and no bright neon or harsh animation that damages readability.

Taste Skill frames the work as anti-slop frontend design. It recommends explicit design-variance, motion-intensity, and visual-density decisions, plus a redesign audit and canonical GSAP patterns. The relevant direction is restrained color, deliberate spacing, a real typographic hierarchy, and rejecting boilerplate-looking AI UI.

GSAP Skills recommends scoped React animation contexts/useGSAP cleanup, timelines over chained delays, transforms and opacity over layout animation, ScrollTrigger for scroll-linked motion, and reduced-motion safeguards. Brick Docs should use GSAP for a small number of high-value transitions, not as a constant spectacle.

The shadcn UI MCP repository is treated as a component-discovery reference only. No MCP server or unreviewed external code is enabled or executed for this redesign. The Vercel, Claude design, and Convex skill repositories are treated as portable workflow references, not runtime dependencies.

## Brick Docs visual implication

The public site remains a knowledge base, not an AI/terminal product surface. Motion supports wayfinding and hierarchy while content, accessibility, and maintainable component boundaries remain primary.

The selected design direction is a restrained technical editorial system:

- Deep graphite as the default base, warm paper as the light-mode base, and one disciplined signal color (oxidized cyan/blue) with a restrained amber status color.
- A slow, low-opacity aurora is used only as a background depth layer. Reader surfaces remain opaque enough for comfortable reading.
- GSAP drives one composed page-intro timeline, subtle navigation transitions, and low-frequency aurora drift. There are no high-frequency loops, no animation blocking reading, and no terminal access implied.
- Preserve the existing three-column docs workstation, route-aware search, guide routes, embedded guide assistant, SEO, and web-UI-only content.
- Validate 375px, 768px, 1024px, and 1440px widths, keyboard focus, light/dark contrast, and `prefers-reduced-motion`.
