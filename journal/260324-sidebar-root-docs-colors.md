# Sidebar: Root Docs, Colored Tags, and Layout Fix

**Date:** 2026-03-24

## Changes

### Root-level documents in tree

Added `root_docs` field to `TreeSource` interface (matching backend API change). Root-level documents like README.md now appear directly under each source in the sidebar, before the Documentation and Journal subcategories.

### Collapse/expand button moved

The expand/collapse toggle was previously in the `.tree-actions` bar alongside "All Journal Entries", separated from the document tree by a horizontal line. This was unintuitive — it controls the tree but was visually disconnected from it. Moved it into a new `.tree-header` inside the `<nav class="tree">` section with a "Documents" label.

### Colored source tags

Each source now gets a deterministic subtle color tag based on a hash of the source name. Colors use an 8-color palette of muted tones (blue, emerald, orange, violet, red, teal, yellow, pink) at 15% opacity backgrounds. Tags appear in both the tree navigation and search results, replacing the old plain `.item-source` and `.source-name` classes.

### Node version pin

Added `.nvmrc` pinning Node 22 for the project. The `@sveltejs/vite-plugin-svelte` dependency requires `styleText` from `node:util` (Node 20.12+). Also set fnm default to Node 22 system-wide.

## Testing

- Updated `api.test.ts` mock data to include `root_docs` field
- All 16 tests pass with Node 22
