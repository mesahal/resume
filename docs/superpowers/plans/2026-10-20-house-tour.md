# Complete house tour demo

Goal: extend the approved 3D style into an exterior and six fully usable rooms at /__concepts/house, keeping production and earlier concepts intact.

Architecture: React owns accessible navigation and content; the existing lazy Three renderer supplies an exterior and furnished interior scenes. All content remains available without WebGL. Guided transitions replace free walking on mobile.

Constraints: preserve existing work; no staging, commits, publishing or test emails. Use verified user career dates and prior portfolio content. Preserve the original resume PDF; generate a separate current download when stale content is found.

- [x] Add behavior tests for exterior entry, every room, resume link, deep links and contact draft.
- [x] Restore canonical public content into prototype-only data files; render projects, career, education, historical achievements, skills, writing, videos and contact.
- [x] Build facade/nameplate/opening door plus study, lounge, studio and porch furniture. Keep two existing rooms, night switch and reduced motion.
- [x] Make header and room navigation persistent; mobile scene above content, native controls and touch-friendly targets.
- [x] Run all tests, production compile, responsive browser checks and save real screenshots. Write implementation report.
