# CourtSight Frontend

CourtSight is a Vite + React + TypeScript frontend using Tailwind and shadcn/ui for a modern legal-AI product experience. It integrates with a backend via a typed API layer and supports features like live chat (SSE streaming), semantic search, audio recording, and document views.

## Tech Stack
- React 18, TypeScript, Vite
- TailwindCSS, shadcn/ui (Radix UI), Lucide icons
- TanStack Query for async state
- Axios for REST, plus fetch for streaming (SSE)

## Getting Started
1) Install dependencies
```bash
npm install
```

2) Configure environment
Create `.env` (or `.env.local`) at the project root:
```bash
VITE_API_BASE_URL=http://localhost:8000
```

3) Run dev server
```bash
npm run dev
```

The app runs on the Vite dev server (usually `http://localhost:5173`).

## Project Structure
```text
src/
  components/           # Reusable UI (includes shadcn/ui primitives)
  hooks/                # Custom hooks
  lib/
    api/                # API layer (axios config, endpoints, services, types)
      config.ts         # apiClient, API_BASE_URL, buildApiUrl
      endpoints.ts      # API_ENDPOINTS map (incl. /api/v1/chat/stream)
      services.ts       # auth, search, documents, chatService.streamChat
      types.ts          # shared API types and models
  pages/                # Top-level routes (Index, Search, Recorder, Chat)
  assets/               # Images and static assets
```

## Features
- Chat (SSE streaming)
  - Page: `src/pages/Chat.tsx`
  - Streams from `POST /api/v1/chat/stream` and renders partial/final responses
  - Bot messages render Markdown (headings, lists, code, links)

- Search
  - Page: `src/pages/Search.tsx`
  - Uses `searchService.globalSearch` against `API_ENDPOINTS.SEARCH.GLOBAL`
  
- Navigation & Layout
  - `src/components/Navigation.tsx` wires routes and links (Home, Search, Recorder, Chat)

## API Integration
- Base URL is configured via `VITE_API_BASE_URL` env var.
- Axios instance in `src/lib/api/config.ts` sets headers and auth token (if present).
- Streaming calls use `fetch(buildApiUrl(path))` to preserve ReadableStream.

### Chat Streaming Contract
Request body (JSON):
```json
{
  "message": "Apa dasar hukum putusan tentang sengketa tanah?",
  "conversation_id": "string",
  "include_reasoning": true,
  "max_tokens": 100
}
```

Server should emit SSE-style lines prefixed with `data: {json}` where `{json}` has a `type` field among:
- `status` { message }
- `partial_response` { content }
- `final_response` { content }
- `complete` { conversation_id?, response_time, tools_used, workflow_used? }
- `error` { message }

Client handler: `chatService.streamChat(payload, onEvent)` in `src/lib/api/services.ts`.

## Development Scripts
- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run build:dev` — development-mode build
- `npm run preview` — preview production build
- `npm run lint` — run ESLint

## Styling
- TailwindCSS utilities; global styles in `src/index.css`.
- shadcn/ui components under `src/components/ui/*`.

## Routing
Defined in `src/App.tsx` using `react-router-dom`:
- `/` → `Index`
- `/search` → `Search`
- `/recorder` → `Recorder`
- `/chat` → `Chat`

## Environment & Auth
- Auth token (if any) stored in `localStorage.authToken` and added via axios interceptor.
- On 401 responses, client clears token and navigates to `/login`.

## Notes
- Ensure backend enables CORS for the frontend origin.
- For streaming, the server must flush SSE chunks without buffering.

## License
Proprietary — All rights reserved.
