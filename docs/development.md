# Development

## Prerequisites

- Node.js 22+
- The documentation MCP server running locally on port 8085

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (connects to MCP server at localhost:8085)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Configuration

Create a `.env` file (already included with defaults):

```
API_URL=http://localhost:8085
```

## Project Structure

```
src/
  lib/
    api.ts              # Client-side API functions
    stores.svelte.ts    # Shared reactive state
    server/
      api.ts            # Server-side proxy utilities
    components/
      Sidebar.svelte    # Tree navigation + search
      ChatPanel.svelte  # Chat interface
  routes/
    +layout.svelte      # Main layout (sidebar + content + chat)
    +page.svelte        # Home page (source overview)
    doc/[id]/
      +page.svelte      # Document viewer
    api/                # Server-side proxy routes
      tree/
      search/
      documents/[...id]/
      chat/
```

## Docker

```bash
# Build
docker build -t documentation-ui .

# Run
docker run -p 3001:3000 -e API_URL=http://host.docker.internal:8085 documentation-ui
```
