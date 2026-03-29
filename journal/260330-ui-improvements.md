# UI Improvements: Title, Navbar, and Search Panel

**Date:** 2026-03-30

## Changes

### App title renamed from "Documentation" to "Library"

The product name in the top bar header was changed from "Documentation" to "Library" to better reflect the broader scope of the application (documents, journals, engineering team reports, PDFs).

### Navbar icon grouping

The header action icons were split into two visually separated groups:

1. **Utility actions** (left group): theme toggle, server status, print
2. **Panel toggles** (right group): search, chat

This makes it clearer which icons open persistent panels versus triggering one-off actions.

### File Picker and Search panel mutual exclusion

Opening the File Picker (sidebar) now automatically closes the Search panel, and vice versa. Both panels occupy the same screen region, so having both open simultaneously caused layout conflicts. The backdrop click handler also closes whichever panel is open.

### Source filter promoted to always-visible

In the Search panel, the source filter dropdown was moved out of the collapsible "More filters" section and is now always visible below the search input. This makes the most common filter (narrowing results to a specific documentation source) immediately accessible without an extra click. Date filters remain in the collapsible section.

### Coming soon: documentation type filter

A filter for documentation type (e.g., markdown vs PDF) is planned for the search panel but not yet implemented.

## Files changed

- `src/routes/+layout.svelte` -- title rename, navbar icon grouping, panel mutual exclusion logic
- `src/lib/components/SearchPanel.svelte` -- source filter promoted to always-visible section
