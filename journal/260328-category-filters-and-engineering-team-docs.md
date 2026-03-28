# Category Filters, UI Polish, and Engineering Team Docs

## Summary

Added a global category filter to the sidebar, tracked `.engineering-team/` documents, and made several UI improvements: resizable sidebar, full-width markdown content, collapsed-by-default tree, acronym handling, and category label cleanup.

## Changes

### Category Filter (Sidebar)

- Added a collapsible "Filter categories" section between the search box and the document tree
- Four GOV.UK-style small checkboxes: Root Docs, Documentation Directory, Journal, Engineering Team
- Toggling a checkbox immediately hides/shows that category across all sources
- Document counts per source update reactively to reflect filtered state
- A "N hidden" badge appears on the filter toggle when categories are filtered out
- Filter state persists to localStorage across page reloads
- Category definitions centralized in a `CATEGORIES` constant in `stores.svelte.ts` for extensibility

### Resizable Sidebar

- Sidebar can be dragged wider/narrower via a handle on its right edge (250-800px range)
- Width persists to localStorage
- Default width is 20% wider on screens >= 1200px (384px vs 320px)
- On mobile, sidebar is always 100% width (no resize handle)

### Content Width Fixes

- Removed `max-width: 38em` from `.markdown-content` so it matches the `doc-header` width (960px parent constraint)
- Removed `max-width: 38em` from `pre code` and set `width: 100%` so code blocks fill the content area — important for diagrams and long strings

### Category Label Cleanup

- Renamed "Documentation" category to "Documentation Directory" for clarity
- Removed `text-transform: uppercase` from category toggles — labels now use normal title case
- Tree starts collapsed by default instead of fully expanded

### Acronym Handling

- Added `ACRONYMS` set to `titles.ts` so known acronyms (MCP, API, DNS, UI, etc.) display in uppercase rather than title case (e.g., "Documentation MCP Server" not "Documentation Mcp Server")

### Engineering Team Documents

- Tracked `.engineering-team/` directory in the documentation-ui git repo
- The MCP server already auto-discovers these and serves them under the `engineering_team` category

### Git Cleanup

- Both repos had `.gitignore` updated: added `.playwright-mcp/`, `.claude/`, `local-data/`, `config/sources.local.yaml`

## Design Decisions

- Researched GOV.UK Design System filter patterns (govuk-frontend checkboxes, MOJ filter component). Chose GOV.UK's small checkbox variant for a compact, non-distracting filter.
- Removed the 38em max-width on markdown content because this is a documentation viewer with code blocks, tables, and structured data — not long-form prose. The 960px parent constraint provides sufficient readability.
- Tree starts collapsed because with multiple sources indexed, expanding everything overwhelms the sidebar.
