# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**FlairForge** — AI-powered flyer/marketing material generator. Users create flyers via AI, with a React frontend and Node.js backend API deployed to Netlify.

## Tech Stack

- **Frontend**: React + Vite + TypeScript
- **Backend**: Node.js (Netlify Functions), `src/server.js`
- **Shared**: `packages/shared/`
- **Monorepo**: pnpm workspaces + Turborepo
- **Testing**: Vitest (unit), Playwright (E2E), k6 (performance)
- **Deployment**: Netlify

## Key Commands

```bash
pnpm install              # Install all workspace dependencies
pnpm run dev              # Start frontend + backend concurrently
pnpm run dev:frontend     # Frontend only (Vite)
pnpm run dev:backend      # Backend only (nodemon)
pnpm run build            # Build frontend (tsc + vite) + backend
pnpm run test             # Unit tests (frontend + backend via Vitest)
pnpm run test:e2e         # Playwright E2E tests
pnpm run test:integration # Backend integration tests
pnpm run lint             # Lint frontend + backend
pnpm run type-check       # TypeScript type checking (frontend)
pnpm run coverage:merge   # Merge lcov reports from all apps
```

## Architecture

- `apps/frontend/` — React + Vite SPA (flyer editor UI)
- `apps/backend/` — Node.js API (Netlify Functions, `src/server.js`)
- `packages/shared/` — Shared types and utilities
- `docs/` — Project documentation
- `scripts/` — Build and deployment automation
- `tests/` — Shared test config, fixtures, mocks, and scripts

## AgentKit Forge

This project has not yet been onboarded to [AgentKit Forge](https://github.com/phoenixvc/agentkit-forge). To request onboarding, [create a ticket](https://github.com/phoenixvc/agentkit-forge/issues/new?title=Onboard+FlairForge&labels=onboarding).

## Baton Integration

Baton is the shared task graph for cross-repo work. When the `baton` MCP server is available, agents should check for existing work with `task_check` at the start of meaningful tasks, create or claim visible work with `task_notify`/`log_agent_message`, update the task when significant new information becomes available, and log completion or blockers before handing off.
