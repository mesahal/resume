# Full house portfolio demo

Local preview: http://127.0.0.1:4174/__concepts/house

This extends the earlier two-room prototype into the user's requested exterior and complete six-room journey. The existing portfolio at `/` and earlier concepts remain available. Nothing was published, staged or committed.

## Delivered

- Exterior: pitched cobalt roof, orange hinged door, nameplate bearing Md Sahal and Software Engineer II, planters and a welcome step. Clicking the physical door or the native Enter button opens the house.
- Hall: greeting, current title and company tenure, letter tiles and light switch.
- Workshop: Word Detective, My Butterfly, Accelera GP and the tools pegboard; expandable details for City Remit, Omnizia and all six additional projects.
- Study: all three career entries, confirmed dates, skill groups and historical career notes.
- Lounge: university, earlier education, contest placements, historical peak ratings and problem-solving totals.
- Studio: all ten writing entries and ten videos, with original public links.
- Porch: service selection, validated local email draft, direct email and social links. Preparing the draft does not send a message; visitors review/send in their email application.
- Persistent résumé download and direct room navigation; keyboard navigation, phone layout, motion toggle, reduced-motion preference and readable WebGL fallback.

The house is a guided miniature diorama tour, not a first-person walking simulator. The existing Hall/Workshop share a connected scene; the other rooms are individual furnished scene groups. This remains a separate design demo for review, not the production homepage.

## Résumé

The existing `public/resume.pdf` was found to contain the old Software Engineer I title. It is preserved unchanged. The demo downloads the newly generated `public/resume-2026.pdf`, a one-page résumé with the confirmed Software Engineer II title, company tenure, latest projects, skills and university education. Reproducible source: `scripts/build-house-resume.py`. No promotion date or aggregate experience total was invented.

## Content provenance and limits

Public portfolio content was restored from `codex/engineering-mind-portfolio:src/data` into prototype-specific files. Confirmed user facts take priority. App-store URLs and app screenshots are the previously verified assets. The Accelera screen is an explicitly labelled illustration. Historical ratings, problem counts and old career impact notes remain labelled as historical; external archive URLs and current rankings were not independently reverified in this turn.

## Verification

- `CI=true npm test -- --watchAll=false --runInBand`: 3 suites, **14 tests passed**, no console test warnings. Covers navigation/focus, all rooms, deep links, media switching, project links, light switch, résumé link, local contact draft and WebGL fallback.
- `BUILD_PATH=/tmp/sahal-house-build ./node_modules/.bin/react-scripts build`: successful production compilation. Only existing outdated Browserslist data notices.
- `git diff --check`: clean.
- Browser: checked at 1440×1000, 1280×900, 768×1024, 390×844 and 320×740. No observed horizontal document overflow. Header stayed at top 0 and navigation at bottom 844 after scrolling 1692px through the mobile writing archive.
- Browser: actual 3D door click entered the hall; night mode worked; project details and local enquiry draft worked. No browser error/warning entries during the check.
- PDF: HTTP 200 with application/pdf; one page verified using Poppler and visual inspection. Existing PDF left intact.
- Read-only code review caught a sticky-container issue on mobile. Fixed the overflow ancestor and made the mobile floor plan fixed; verified with actual scrolling.
- All 13 original dirty baseline files matched their saved SHA-256 hashes. No changes in the Android game repository.

## Evidence

`docs/superpowers/reports/house-tour/` contains desktop screenshots of every room, entrance/porch mobile views, 320px project detail, tablet lounge, mobile sticky navigation, night hall, tests/build logs and `enter-the-house.gif` recorded from actual browser frames.

Browser viewport emulation was used; performance on physical low-end phones and Safari still needs device validation before production rollout. No real emails were sent. No deployment occurred.
