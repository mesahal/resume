# The Walkable Home — 3D Prototype

Delivered October 20, 2026. Available for local review at **http://127.0.0.1:4174/__concepts/house**.

Following the approved design manifesto in [home_design.md](/Users/bs01100/.gemini/antigravity/brain/dbababb3-2d7f-4020-8a04-eb9894cec68b/home_design.md), this prototype expands the single-room 3D concept into a multi-room miniature house where walking between rooms reveals different chapters of Md Sahal's portfolio.

## Scope of Phase 1 (Hall & Workshop)

In accordance with user confirmation, this phase builds the foundational two rooms:
1. **The Hall (Welcome & Identity)**:
   - Architectural entrance with monumental extruded cobalt 'S' sculpture and signature typography.
   - Interactive `BUILD` wooden letter tiles that bounce when tapped and validate spelling.
   - Floor welcome mat, planter, floor lamp, and wall-mounted light switch.
   - Verified credentials: **Software Engineer II** at Brain Station 23 (Company tenure: April 2024–Present).
2. **The Workshop (Projects & Arsenal)**:
   - Architectural doorway arch bridging Hall and Workshop.
   - Woodworking desk with metal-and-screen Accelera GP laptop (illustrative website-builder study).
   - Sculptural green & pink plinths carrying real mobile devices with authentic app screens for **Word Detective** (Android) and **My Butterfly** (iOS).
   - Wall-mounted perforated pegboard with five toolsets representing the verified skills domains: Backend, Frontend, AI Tooling, Databases, and DevOps.
   - Shelf with brass and ceramic artifacts, potted plant, and stacked sculpture.

## Interaction & Navigation

- **Doorway & Room Transitions**: Clicking the orange doorway arch or the prev/next arrow buttons glides the orthographic camera through the architectural opening into the adjacent room.
- **Object Focus (Exhibits)**: Clicking any physical exhibit (Word Detective phone, My Butterfly phone, Accelera laptop, or the Pegboard) zooms the camera into focus, updates the URL hash (e.g. `#workshop/word`), and displays full verified specifications with external store links. Pressing `Escape` or clicking "Back to the workshop" smoothly returns to the room view and restores focus.
- **Interactive Light Switch & Night Mode**: Clicking the physical wall switch in the Hall (or using the UI pill) flips the switch lever and transitions the house between warm daylight and cozy night illumination. Point lights in lamps turn on, sun directional light softens into moonlight, and screens glow. Also supports URL deep linking via `?lights=off`.
- **Floor-Plan Minimap**: A persistent 6-station architectural floor plan in the footer indicates current position and enables direct room navigation, clearly displaying future rooms (Study, Lounge, Studio, Porch) as upcoming extensions.
- **Multimodal Controls**: Supports mouse look parallax, mouse clicks, keyboard arrows (`←` / `→` / `Esc`), and touch swipes on mobile.

## Accessibility & Performance

- **Progressive Enhancement**: Every piece of information, navigation action, and project link exists as semantic, accessible HTML in the DOM alongside the WebGL canvas.
- **Focus Management**: Focus automatically moves to the new section heading upon room transition or exhibit opening.
- **Reduced Motion**: Respects `prefers-reduced-motion: reduce` and features an in-UI toggle to make all camera and lighting transitions instant.
- **WebGL Failure Fallback**: Tested and verified fallback path ensures 100% of the content and navigation works seamlessly if WebGL is unavailable.
- **Demand Rendering**: The render loop is bounded and only executes while camera lerping, bouncing, or light blending is active.

## Verification Evidence

- **Automated Tests**: 10 tests across 3 suites pass (`CI=true npm test -- --watchAll=false --runInBand`).
- **Production Build**: Successfully compiled with zero ESLint warnings (`react-scripts build`).
- **Visual Evidence**: Captured via headless Chrome with SwiftShader WebGL rendering in `docs/superpowers/reports/house/`:
  - `hall-desktop.png`: Hall entrance, letter tiles, and wall switch in daylight.
  - `workshop-desktop.png`: Workshop overview with phones, laptop, and pegboard.
  - `exhibit-word.png`: Focused camera zoom on Word Detective exhibit.
  - `exhibit-accelera.png`: Focused camera zoom on Accelera laptop.
  - `exhibit-tools.png`: Focused camera zoom on skills pegboard.
  - `hall-night.png` & `workshop-night.png`: Night mode with active lamp illumination.
  - `workshop-mobile.png`: Responsive stacked layout for small viewports.
  - `hall-tablet.png`: Tablet layout.
