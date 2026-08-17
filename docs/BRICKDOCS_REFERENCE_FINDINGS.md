# BrickDocs Reference Findings

## Scope

This record captures external design and workflow references reviewed for the business-critical BrickDocs rebuild. References inform design decisions only; BrickDocs must retain its own content model, safety boundaries, and product identity.

## OpenHands Docs

The OpenHands reference demonstrates a calm documentation product with an immediately available keyboard search entry point, a compact product navigation layer, clear left-side section hierarchy, a separate right-side **On this page** context rail, a page-level **Copy page** action, and explicit next-page navigation. BrickDocs should borrow this information architecture and interaction discipline rather than copy its visual identity.

## Anthropic Skills

The requested Anthropic Skills repository describes skills as reusable, task-specific instruction packages and cautions that demonstrated implementations must be tested in the target environment. For BrickDocs, this reinforces a component and verification workflow: document the reusable system, test actual interactions, and do not rely on visual imitation alone.

## UI/UX Pro Max

The requested UI/UX Pro Max reference promotes a design loop that includes planning, committing to an intentional visual direction, implementation, multi-viewport screenshots, and review. Its public repository also identifies responsive review, accessibility, curated component guidance, and release checks as part of the workflow. BrickDocs should use this as process discipline, not as a source of copied UI.

## Taste Skill

The requested Taste Skill reference emphasizes audit-led redesign, a design-system map, dark-mode consistency, typography and layout quality, interaction completeness, and a prioritized remediation order. Its anti-pattern guidance directly supports the BrickDocs brief: remove generic visual decoration, avoid badges and pills used only as ornament, and validate complete behavior rather than shipping a screenshot-shaped interface.

## Shadcn UI MCP Server

The requested Shadcn-oriented reference exposes component source, usage examples, metadata, and blocks. BrickDocs already has a component library; the relevant takeaway is to compose accessible primitives consistently rather than add one-off bespoke controls for navigation, search, dialogs, and menus.

## Vercel Agent Skills

The requested Vercel reference packages instructions, optional automation scripts, and supporting references. Its documentation and writing-related material reinforces a maintainable BrickDocs workflow: retain the final architecture as documented project guidance, keep validation scripts close to the UI, and treat content quality as part of product readiness.

## GSAP Skills

The requested GSAP reference includes explicit performance guidance: animate transforms rather than layout properties, use batching where appropriate, and keep animation implementation mindful of scrolling and runtime cost. For BrickDocs, this confirms that any motion must be small, secondary to reading, disabled for reduced motion, and never relied on to explain core navigation.

## Claude Design Skillstack

The requested Claude Design Skillstack collects animation and interactive-graphics resources. Its relevant contribution is a menu of optional interaction patterns, not an instruction to introduce 3D, scroll effects, or animated components indiscriminately. BrickDocs will maintain a documentation-first system; motion is permitted only after navigation, contrast, content relationships, and responsive readability are demonstrably sound.

## Convex Agent Skills

The requested Convex reference stresses that reusable workflows should be narrow and action-oriented, with reference material supporting a concrete task rather than substituting for it. BrickDocs will follow this by maintaining explicit system documentation and validation checks for each specific capability—navigation, editions, search, theme, reading layout, and responsive controls—instead of a single vague “redesign complete” claim.

## Sources

- [OpenHands Docs — Introduction](https://docs.openhands.dev/overview/introduction)
- [Anthropic Skills repository](https://github.com/anthropics/skills)
- [UI/UX Pro Max Skill repository](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
- [Taste Skill repository](https://github.com/Leonxlnx/taste-skill)
- [Shadcn UI MCP Server repository](https://github.com/Jpisnice/shadcn-ui-mcp-server)
- [Vercel Agent Skills repository](https://github.com/vercel-labs/agent-skills)
- [GSAP Skills repository](https://github.com/greensock/gsap-skills)
- [Claude Design Skillstack repository](https://github.com/freshtechbro/claudedesignskills)
- [Convex Agent Skills repository](https://github.com/get-convex/agent-skills)
