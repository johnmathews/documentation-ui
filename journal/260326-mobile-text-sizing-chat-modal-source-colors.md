# Mobile Text Sizing, Chat Panel Modal, Source Card Colors

**Date:** 2026-03-26

## Changes

### Mobile typography overhaul
- Increased base font size from 14px to 16px on mobile (≤600px breakpoint), following Apple HIG
  and Material Design guidelines for minimum readable text on phone screens
- Bumped all component-level font sizes on mobile:
  - Sidebar: tree items (1rem), category toggles (0.9rem), source tags (0.875rem), journal links (1rem)
  - Chat panel: message bubbles (1rem), empty state (1rem), restore hints (0.9rem), context hints (0.85rem)
  - All pages: doc links (1rem), dates (0.875rem), subtitles (1rem), stats (0.875rem)
  - Breadcrumbs: added vertical padding for touch targets

### Chat panel full-screen modal on mobile
- Added CSS slide-in/out transition (`translateX(100%)` ↔ `translateX(0)`) for the chat panel
  at ≤1024px, matching the sidebar's existing animation pattern
- Chat panel now stays in DOM when hidden (`display: flex`) to enable the CSS transition
- Hidden the expand/collapse button on mobile via `display: none` on `.expand-btn` — it was
  redundant since the chat panel is always full-width on narrow screens

### Homepage source card colors
- Each source card on the homepage now uses the source's deterministic tag color (from `sourceColor()`)
  as background tint and border color, creating visual identity consistency between the sidebar
  tags and the homepage cards

## Testing
- Added 8 new Playwright E2E tests covering:
  - Base font size ≥16px on mobile
  - Sidebar tree items and document links have readable font sizes
  - Chat message bubbles have readable font sizes
  - Expand button is hidden on mobile
  - Chat panel takes full viewport width on mobile
  - Chat panel slide animation works correctly
  - Chat panel stays in DOM when hidden
- Updated 5 existing Playwright tests to wait for chat panel slide transition
- All 37 E2E tests and 40 unit tests pass
- svelte-check: 0 errors, 0 warnings

## Research
- Apple HIG: 44pt minimum touch targets, 17pt recommended body text
- Material Design 3: 48dp touch targets, 16sp minimum body text
- iPhone Max viewport: 430-440 CSS pixels in portrait
- iOS Safari auto-zoom prevention requires ≥16px on form inputs
