# AGENTS.md

## Cursor Cloud specific instructions

### Architecture overview
- **Frontend only runs locally**: Vite + React + TypeScript SPA (shadcn/ui). The backend consists of 11 Python serverless functions deployed to Poehali.dev — they are NOT run locally.
- The frontend calls remote backend functions at `functions.poehali.dev` (URL mappings in `backend/func2url.json`).

### Running the dev server
```
npm run dev
```
Starts Vite on `http://localhost:5173` (host `0.0.0.0`).

### Linting
```
npm run lint
```
Uses ESLint 9 flat config (`eslint.config.js`). The codebase has pre-existing lint warnings/errors — do not try to fix them unless specifically asked.

### Building
```
npm run build
```
Production build via `vite build`. Note: the `vite` package is overridden to `rolldown-vite@7.1.13`.

### Key notes
- **No automated test suite** — there are no unit/integration test scripts in `package.json`.
- **Environment**: `.env` at root contains `VITE_DADATA_API_KEY` (company lookup API). No other secrets are needed for frontend development.
- **Backend functions** live in `backend/` with individual `requirements.txt` files but are deployed remotely, not run locally.
- **Database migrations** are in `db_migrations/` — only relevant if modifying backend function logic that affects the DB schema.
- **Lockfile**: `package-lock.json` (npm) is the primary lockfile. A `bun.lock` also exists but npm is the standard package manager.
