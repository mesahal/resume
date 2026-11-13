# The idea room — 3D prototype

User requested a 3D direction after rejecting the prior three compositions. Delivered as a fourth isolated preview at http://127.0.0.1:4174/__concepts/studio. The gallery links to it. This remains a hero design study; the full portfolio has not been replaced.

## Design and interaction

A real Three.js/WebGL miniature room with an extruded S sculpture, curved orange architecture, physical plinths, a laptop, phones carrying actual app screen textures, dimensional letter tiles, a plant, and directional shadows. These objects are original code-built geometry. The room is explicitly an imagined portfolio environment, not Sahal's actual workplace.

Word Detective, My Butterfly and Accelera GP map to the three exhibits. Dragging rotates the view within bounds. Pointer hit-testing selects an exhibit; ordinary HTML buttons offer equivalent access. A selected exhibit remains visible while neighbouring objects clear away and the camera moves toward it. The project description remains readable outside the canvas. Return restores overview and keyboard focus. Mobile uses a stacked composition and adjusted camera framing. Reduced motion or the manual motion-off control makes camera transitions immediate.

The Android/iOS screen assets and career facts are retained from the verified content. The restaurant website on the laptop is a newly drawn, explicitly illustrative builder study. No private screen, achievement or capability was invented.

## Verification

- Actual browser rendering inspected at 1440×1000, 768×1024 and 390×844. Document horizontal overflow checks returned false. Phone and tablet framing reviewed. Desktop scene intentionally fills the frame, including the stage edges.
- Real pointer drag changed the room's camera angle. Clicking the laptop geometry opened Accelera GP. Native keyboard selection opened Word Detective and focused its heading. All three exhibit views, return to overview, and motion-off selection were exercised. Browser error/warning log was empty in the final desktop inspection.
- Five tests across two suites pass using `CI=true npm test -- --watchAll=false --runInBand`. New coverage includes accessible project controls, focus transfer, public destination links, returning to overview, scene disposal, and simulated WebGL initialization failure with working project stories. Tests of the renderer failure path use a mock; the successful WebGL path was tested in the real browser.
- Production compilation succeeded with `BUILD_PATH=/tmp/sahal-studio-build ./node_modules/.bin/react-scripts build`. Existing image prebuild and original build output were left alone. Existing stale Browserslist notice remains.
- Three.js 0.180.0 is the only newly added dependency. The 166.04 kB gzip rendering library chunk is lazy-loaded for the studio route. The native UI and scene code are separate chunks. No external 3D models/HDR downloads are needed.
- The renderer caps pixel ratio, schedules frames only while the camera is changing or new textures/resize require them, stops when the tab is hidden, and disposes textures, materials, geometry, environment, shadow map, observer, listeners and renderer on unmount. Review found an initial duplicated animation-frame scheduling path; it was corrected before final verification.
- OS reduced-motion preference is observed in code, including changes. The manual motion-off state was tested in the browser; OS settings were not changed. No Lighthouse or physical mobile-device performance measurement is claimed.
- Evidence: spatial-studio/desktop.jpg, mobile.jpg, tablet.jpg and rotation.gif. The GIF is made from consecutive actual browser screenshots of camera rotation, with held first/last frames, not generated imagery. Logs: spatial-studio/tests.txt and build.txt.

## Scope and state

All pre-existing modified production files were rechecked against baseline hashes and remain identical. Changes are confined to the prototype files, lazy App route, gallery invitation, package/lock dependency additions and documentation. No commit, push or deployment. Branch remains codex/creative-reset-prototypes. The local development server stays available on port 4174 for review.
