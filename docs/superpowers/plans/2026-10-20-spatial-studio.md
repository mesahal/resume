# Spatial studio — fourth hero prototype

The user rejected the three flat compositions and explicitly requested trying 3D. Scope remains an independently viewable hero, not the full-site replacement.

Art direction: an inhabitable miniature idea room, with architectural curves, sculptural physical objects and real app screens. Warm chalk background, cobalt furniture, orange architecture, soft directional shadows. Three project exhibits correspond to the same supported work: Word Detective, My Butterfly and Accelera GP. The room is an original portfolio metaphor, not a claim about Sahal's physical office.

- [x] Add Three.js as a lazy dependency for /__concepts/studio only.
- [x] Build a real WebGL scene: rounded objects, curved architectural arch, project screen textures, a game-piece desk, floor and shadows. Pointer drag rotates within bounds. Project buttons/clickable exhibits trigger smooth camera focus. Reset returns to overview. Finite introductory motion; no endless orbit.
- [x] Provide native HTML identity, project selectors, readable project details and public links. Keyboard controls work independently of canvas. Reduced-motion uses immediate camera changes. Handle rendering failure with actual screenshot imagery and the same project access.
- [x] Check resource cleanup, renderer/context loss, resize, low mobile resolution, visibility and frame scheduling. Preserve existing homepage and all other prototypes. No deployment or commits.
- [x] Render desktop/mobile, exercise focus/reset/drag and reduced-motion toggle, capture actual screenshots/animation, run tests and production build. Stop at design-selection checkpoint.
