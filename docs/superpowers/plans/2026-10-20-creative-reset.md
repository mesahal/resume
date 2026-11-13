# Creative Reset — Three Hero Prototypes

> For execution in this session. The user's brief explicitly requests rendered prototypes before selecting a full-site direction. Build only the prototypes; stop for selection. No deployment or commit.

Goal: compare three genuinely distinct art directions using the same verified identity and work.
Technology: existing React 18 / CRA, scoped CSS, native buttons, existing optimized assets. No dependencies.
Isolation: new lazy-loaded component via /__concepts/, /__concepts/cinema, /__concepts/editorial, /__concepts/workshop. Production Portfolio stays the default route. No changes to production content, styles, SEO or contact. Preview pages set noindex and a temporary document title only while mounted.

## Diagnosis
The current hero repeats its hierarchy through navigation, network filters, node controls, an inspector, and metric rows. Labels and controls occupy space that should establish personality. The network makes visitors decode categories before understanding the work. Current checkout also contains an older Engineer I title; prototypes use the confirmed current Engineer II title without inferring a promotion date.

## Shared factual spine
Md Sahal. Software Engineer II at Brain Station 23. Company tenure April 2024–Present. Dhaka, Bangladesh. Word Detective is an independent Flutter/Dart/Supabase Android game. My Butterfly is a professional iOS contribution. Accelera GP — Noshinow is current website-builder work, not a claimed public launch. Public-facing facts come from the previously verified content supplement on codex/engineering-mind-portfolio, plus the user's messages. Existing illustrated portrait is an illustration, not presented as photography. No new metrics.

## Tasks
- [x] Preserve current dirty files and create isolated prototype entry; restore real approved assets from the earlier portfolio branch.
- [x] A / The short film: dramatic serif opening, warm project stage, three manually controlled scenes. Stage and caption change together; no autoplay. Includes actual Word Detective and My Butterfly screenshots; Accelera uses a clearly labelled illustrative composition.
- [x] B / Field notes: blue and paper editorial masthead, asymmetry, existing portrait, a working notebook that opens to concrete project contributions. Open/close via native button and aria-expanded. Same identity and projects.
- [x] C / Word workshop: physical letter composition, a compact original portfolio puzzle inspired by Word Detective. Clicking letters builds BUILD; success opens the product story. Wrong guesses give clear feedback; reset and skip available. Explicitly not the shipped game's UI. Product and work remain reachable without solving.
- [x] Verify interactions, keyboard, desktop/mobile layout, reduced-motion CSS and no broken images. Build the existing application; preserve pre-existing dirty files. Save actual rendered screenshots and comparison.
- [x] Present three standalone links and screenshot evidence; recommend a direction and stop for user selection.

## Constraints
All prototype CSS is scoped. No global visual changes. Reduced-motion removes animation and transitions. No hover-only content or custom cursor. At small widths linearize compositions while retaining their distinct visual identities. No private code, internal URLs, customer data or invented production outcomes. Keep all new work uncommitted for review.
