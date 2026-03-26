# Consistent Desktop Content Widths

Standardized the main panel layout across all pages to match the journal timeline page design.

## Changes

Using `/journal` as the source of truth, aligned these properties across all pages:

- **Home page (`/`)**: Reduced `max-width` from 900px to 800px, fixed h1 margin-bottom (0.5rem to 0.25rem), added subtitle font-size 1.5rem
- **Source page (`/source/[name]`)**: Added subtitle font-size 1.5rem, updated h2 section headers to match journal's month headers (1.2rem, uppercase, letter-spacing 0.05em)
- **Category page (`/source/[name]/[category]`)**: Added subtitle font-size 1.5rem, increased doc-list link size from 0.95rem to 1.25rem, increased date size from 0.8rem to 1rem
- **Breadcrumbs component**: Updated font-size from 1.2rem to 1.25rem, margin-bottom from 1rem to 2rem

## Bug Fix

Fixed a typo on the source page where the mobile subtitle had `font-size: 5rem` instead of `1rem`.
