# Initial Documentation UI Build

**Date:** 2026-03-24

## What was done

Built a SvelteKit web UI for the documentation MCP server. The app provides:

1. **Tree navigation** — Documents organized by Source > Category (Documentation / Development Journal) > Individual documents
2. **Document viewer** — Renders markdown content with metadata (source, file path, dates)
3. **Chat interface** — Claude-powered chat that knows what page you're viewing, with full RAG context from the documentation
4. **Search** — Debounced semantic search across all documentation via the sidebar

## Backend changes (documentation-mcp-server)

Added REST API endpoints to the MCP server to support the UI:

- `GET /api/tree` — Returns documents organized as a tree structure
- `GET /api/documents/:doc_id` — Returns full document content
- `GET /api/search` — Semantic search returning deduplicated parent documents
- `POST /api/chat` — RAG-powered chat endpoint (search docs + call Claude API)

Added `anthropic` SDK as a dependency for the chat endpoint.

Added two new methods to `KnowledgeBase`:
- `get_document_tree()` — Organizes documents by source and category
- `search_documents()` — Deduplicates chunk search results back to parent documents

## Key decisions

- **SvelteKit** over React/Next.js — simpler mental model, smaller bundles, good TypeScript support
- **Server-side proxy** — SvelteKit server routes proxy API requests to the backend, avoiding CORS and build-time URL configuration. The `API_URL` env var is read at runtime.
- **adapter-node** — For Docker deployment (not static/auto adapter)
- **Dark theme** — Consistent with developer tooling aesthetics
- **Responsive** — Three breakpoints: desktop (sidebar + content + chat), tablet (overlapping panels), phone (full-width panels)

## Docker setup

- UI runs as a separate container in the same docker-compose stack
- Connects to backend via internal Docker network (`http://docserver:8080`)
- Exposed on port 3001

## Follow-up items

- Add `ANTHROPIC_API_KEY` to the deployment environment
- Create GitHub repo and push to trigger CI/CD
- Consider adding syntax highlighting for code blocks (e.g., highlight.js)
- Consider adding breadcrumb navigation in the document viewer
