# Header and Navigation Redesign

Redesigned the header and service navigation bar based on GOV.UK Design System research,
focusing on separation of concerns, typography scale, and responsive spacing.

## Changes

### Header restructure
- Moved "File Picker" out of the service navigation bar into the header as a "Files"
  button with a folder icon, grouped alongside Search and Chat after a vertical divider.
  This fixes a mixing of concerns: the service nav now contains only page-level navigation
  links, while the header groups all panel toggles together (Files, Search, Chat).
- The vertical divider now separates utility actions (theme, status, print) from panel
  toggles (Files, Search, Chat), creating two clear semantic groups.
- Removed dead CSS for `.govuk-service-nav__link--btn` which was only used by the old
  File Picker button.

### Typography
- Reduced header product name from 30px to 24px (desktop) and 24px to 20px (mobile),
  aligning with the GOV.UK type scale where 24px is `govuk-heading-m`.
- Renamed "Documentation" to "Documentation Library" (desktop) / "Library" (mobile)
  using a responsive `display: none` span prefix.
- Updated all 8 page `<title>` tags to use "Documentation Library" as the suffix.

### Spacing
- Increased service nav item spacing from 20px to 30px on desktop (matches GOV.UK
  `govuk-responsive-margin(6)` at large screens).
- Increased header actions gap from 5px to 8px on desktop.
- Added responsive mobile overrides: header actions gap reduced to 2px, button padding
  tightened, and divider margin reduced on narrow screens.

### Search panel
- Renamed the collapsible "Filters" section to "Date Filters" since it only contains
  created-date and modified-date filters.

## Test updates
- Updated selectors in 3 e2e test files (`mobile-ux.test.ts`, `panel-switching.test.ts`,
  `responsive-panels.test.ts`) from `getByRole('button', { name: 'File Picker' })` to
  `getByTitle('File picker')` — works at all viewport sizes since the `title` attribute
  is always present regardless of whether the label text is hidden on mobile.
- Updated the navbar separator test to check the Files button instead of Search.
- All 48 e2e tests pass.

## Research basis
Decisions were informed by GOV.UK Design System documentation:
- Service Navigation component: links navigate, buttons act — mixing is an anti-pattern
- GOV.UK type scale: 19px for nav text, 24px for headings, no 30px in the scale
- Spacing: 20-30px responsive margins between nav items, whitespace as separator (no
  vertical borders between items)
- Left-alignment preferred over centering for navigation
