# Creative reset — three rendered hero studies

Delivered October 20, 2026. This is a design-selection checkpoint, not a full-site redesign.

## Local previews

- Gallery: http://127.0.0.1:4174/__concepts/
- A — The short film: http://127.0.0.1:4174/__concepts/cinema
- B — Field notes: http://127.0.0.1:4174/__concepts/editorial
- C — The word workshop: http://127.0.0.1:4174/__concepts/workshop

The existing server on port 3000 was a separate static server. It was not replaced. A React development server was started on 127.0.0.1:4174. The root route still renders the existing Portfolio. Only App.js gains a lazy preview entry; the concept code and styles are isolated under src/concepts. No production component, contact form, SEO source, or existing style was edited. All pre-existing modified files were hashed at the start and verified unchanged at completion. New work remains uncommitted and unstaged on codex/creative-reset-prototypes.

## Why the current concept feels generic

The current opening gives similar weight to the statement, graph, filters, node controls, project inspector and metrics. A visitor must decode interface categories before meeting the person. The repetition of framed modules and small technical labels dominates the actual work. Adding more effects would amplify that hierarchy. The prototypes instead organize attention through a project sequence, a personal publication, or a finite playful activity.

## Comparison

| Direction | Originality and visual impact | Personality and connection to the work | Feasibility / trade-off |
| --- | --- | --- | --- |
| A — The short film | Warm cinematic stage, expressive serif title, large project typography, manually advanced scenes. | Product-led; actual Android and iOS screens become the story. Accelera is explicitly illustrative. | Moderate effort to extend into coordinated case-study scenes. Strong presentation, but less personal than B. |
| B — Field notes | Oversized name as a publication masthead, blue ink/paper, asymmetric orange notebook cover. Works as a static composition. | Most personal: existing illustrated portrait, greeting, current role, specific contributions inside the notebook. | Lowest extension risk. Can support varied editorial case studies without adding interaction overhead. Best balance for freelance clients. |
| C — The word workshop | Tactile letter objects, a short solvable interaction, then a real independent product. | Most participatory; connects directly to Word Detective and Sahal's problem-solving interests. | Moderate effort. Memorable, but risks overemphasizing games; keep skip/contact paths obvious when extending. |

Recommendation: B. It establishes a recognizable personal identity before asking visitors to interact, remains strong without motion, and leaves room for the full breadth of professional work. A is the stronger project-showreel choice. C is the most playful and exploratory choice. The user should select a direction before any full-site implementation.

## Actual validation

- `CI=true npm test -- --watchAll=false --runInBand`: 1 suite / 3 tests pass. Includes scene cycling, notebook open/close, puzzle mistakes/reset/success/skip, and focus transfer into disclosed content. Evidence: creative-reset/tests.txt.
- `BUILD_PATH=/tmp/sahal-creative-reset-build ./node_modules/.bin/react-scripts build`: exit 0, compiled successfully. Used the existing production compiler directly to avoid the unrelated image-optimization prebuild mutation and preserve the current build/server. Evidence: creative-reset/build.txt.
- Lazy prototype chunk: 4.93 kB JS and 5.68 kB CSS gzip; no new dependencies. Existing Browserslist database notice remains.
- Rendered and inspected all three concepts in the Codex browser at 1440×1000, 768×1024, and 390×844. No document horizontal overflow observed. No broken project images observed. Browser error/warning log was empty at the final desktop check.
- Keyboard Enter was used to advance the cinema, open the notebook, and solve the workshop. After opening the notebook, focus moves to its heading; Tab reaches the Android link. After solving/skipping, focus moves to the story heading; Tab reaches Google Play. Review identified these two focus defects and both were fixed, with failing-then-passing focus assertions.
- Motion pause was exercised; the story's computed animation name became `none`. The explicit prefers-reduced-motion rule disables transitions/animations for all prototype descendants. OS preference itself was not toggled during QA. All interactions remain stateful without animation; no autoplay.
- Real desktop/mobile screenshots are in creative-reset/. b-editorial-motion.gif is composed from sequential browser screenshots of the actual notebook opening, with held initial/final frames; it is not a generated mockup. No performance score or screen-reader audit is claimed.
- Preview document title and noindex/nofollow metadata are scoped to the mounted preview. Original title/robots metadata is restored on unmount. Preview contact links use the existing public email; no message was sent. A fresh navigation to the existing /#contact was observed to remain at the top, so previews do not rely on that anchor. The original contact form and its normal navigation are unchanged.

## Content and scope

Shared identity is Software Engineer II at Brain Station 23, with company tenure since April 2024. No promotion date or total experience badge is inferred. Word Detective, My Butterfly and Accelera GP use supported descriptions from the earlier verified content supplement. Android/iOS assets were restored from the previously implemented branch; the game repository was not modified. The portfolio puzzle is clearly labelled as a new portfolio interaction inspired by Word Detective, not the shipped game's interface. No invented metrics, testimonials, customer screenshots, or private architecture were used.

The root portfolio and downloadable résumé still contain the older baseline content. This task deliberately prepares three isolated hero directions; it does not claim to update the entire site. No deployment, commit, push, email, purchase, or full redesign was performed.
