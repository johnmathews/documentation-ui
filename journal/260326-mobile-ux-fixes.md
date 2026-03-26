# Mobile UX Fixes

## Issues (from screenshots/round-1/)

Four mobile UX problems were identified from iPhone screenshots:

1. **Grey bar at bottom obscures content** — Content and sidebar didn't extend behind the iOS safe area inset, leaving an ugly grey gap at the bottom in portrait mode.
2. **Send button hidden when keyboard opens** — iOS Safari auto-zooms inputs with font-size < 16px. The base font is 14px, so `1rem` = 14px triggered zoom, pushing the send button off-screen.
3. **Content doesn't reach bottom of screen** — Same root cause as issue 1; safe area padding wasn't applied to the content area.
4. **File picker too small in landscape** — In landscape (844x390), the sidebar was only 280px wide because the `max-width: 600px` breakpoint doesn't apply. Should be a full-screen modal.

## Fixes

### Safe area bottom handling (`+layout.svelte`)
- Added `padding-bottom: env(safe-area-inset-bottom, 0)` to `.sidebar`
- Added `padding-bottom: calc(2rem + env(safe-area-inset-bottom, 0))` to `.content`
- Mobile content padding also includes safe area inset

### Input zoom prevention (`ChatPanel.svelte`, `Sidebar.svelte`)
- Changed mobile input `font-size` from `1rem` (14px) to explicit `16px`
- Applies to both chat input and sidebar search input
- 16px is the threshold below which iOS Safari auto-zooms

### Landscape phone full-screen modals (`+layout.svelte`)
- Added `@media (max-height: 500px) and (max-width: 1024px)` breakpoint
- Forces sidebar and chat panel to `width: 100%` on short viewports
- Covers landscape phones without affecting tablets

## Tests Added (`e2e/mobile-ux.test.ts`)

9 new Playwright tests covering:
- Safe area bottom padding on content, sidebar, and chat input
- Input font-size >= 16px on mobile for both chat and search inputs
- Sidebar full-width in landscape viewport
- Chat panel full-width in landscape viewport
- Sidebar open/close in landscape full-screen mode
- Send button visibility and touch target sizing on mobile

All 29 tests pass (20 existing + 9 new).
