# Reference Notes

## OpenHands Docs

The reference uses a persistent top bar with a prominent search command, theme control, repository link, and product-level navigation. A left sidebar organizes the content into semantic groups such as Get Started, Essential Guidelines, Use Cases, Product Guides, and Community. The center column is a calm reading surface with strong heading hierarchy, and a right-side on-page navigation makes long pages easy to scan. The overall experience is developer-first, with search and keyboard access treated as primary navigation.

## Omnivore Docs

The reference uses a persistent, expandable sidebar with clear product sections and nested pages. The main reading column stays narrow and typography-led, with a simple table-of-contents structure and next-page navigation. The information architecture favors task-based grouping: installation, usage, organization, integrations, development, and self-hosting. A theme toggle and simple global utility controls remain in the chrome.

## Brick decision

Brick Docs keeps the shared strengths—persistent navigation, command-style search, semantic sections, right-side page context, and task-oriented information architecture—but gives them an obsidian/slate operator console treatment. Cyan is the signal color, amber marks caution and checkpoints, and stacked modular blocks repeat the Brick infrastructure motif in diagrams, badges, cards, and the hero artwork.


## Updated reference observations

OpenHands also exposes a prominent search trigger with a keyboard hint, theme preference, source/repository links, feedback, page-copy controls, and optional assistant entry points. Omnivore emphasizes a simple brand header, expandable task-based sections, predictable route slugs, external community/source links, edit/source utilities, and next-page navigation.

## Brick boundary decision

Brick Docs is a knowledge base, not a host console. Public guidance must not imply terminal access or expose executable host operations. Search may index guide metadata and article text, and the optional assistant must remain a documentation helper rather than an interface for operating Brick infrastructure. Public pages should stay under clean `/docs/...` URLs and remain deployable behind a custom domain such as `docs.anything.tld`.
