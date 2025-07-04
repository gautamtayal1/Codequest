# Codequest

Codequest is a self-hosted coding-practice platform that lets you browse
algorithm problems, write code directly in the browser, and have your
solution evaluated automatically with the Judge0 API. The project is
organised as a **Turborepo** monorepo powered by **pnpm** workspaces.

## Features

- 🖥 Modern **Next.js 15** web interface with Monaco code editor
- 🔐 Google OAuth login via **NextAuth**
- ⚙️ Automatic boilerplate/starter-code generation for every problem
- 🗄️ **Prisma + PostgreSQL** persistence layer
- 🛰️ Real-time submission status updates through an Express webhook
- ♻️ Shared React UI library and internal ESLint/TS configs

## Repository layout

```
apps/
  web/                    – Next.js front-end (port 3000)
  submission-webhook/     – Express service receiving Judge0 callbacks (8080)
  boilerplate-generator/  – CLI that rebuilds problem boilerplates
packages/
  db/                     – Prisma schema & database client
  ui/                     – Shared React UI primitives (Tailwind + Radix UI)
  eslint-config/          – Internal ESLint presets
  typescript-config/      – Reusable tsconfig bases
```

## Prerequisites

1. Node ≥ 18
2. pnpm ≥ 9 – `corepack enable && corepack prepare pnpm@latest --activate`
3. Docker + Docker Compose (for PostgreSQL)
4. Google OAuth 2 credentials (for sign-in)

## Quick start

```bash
# 1. Install dependencies
git clone https://github.com/<you>/codequest.git
cd codequest
pnpm install

# 2. Environment variables
cp apps/web/env.example apps/web/.env
# Edit the file and set the following
# DATABASE_URL=postgresql://postgres:postgres@localhost:5440/postgres
# NEXTAUTH_SECRET=<random-string>
# GOOGLE_CLIENT_ID=<your-id>
# GOOGLE_CLIENT_SECRET=<your-secret>

# 3. Start Postgres (and keep it running in the background)
docker compose up -d postgres

# 4. Apply database migrations
pnpm --filter @repo/db exec prisma migrate deploy

# 5. Launch all dev servers
pnpm dev
```

Open http://localhost:3000 to try it out.

`pnpm dev` triggers `turbo run dev`, which concurrently launches:

- `next dev` in `apps/web` (web UI)
- `tsx` in `apps/submission-webhook` (submission callback API)
- `tsx` in `apps/boilerplate-generator` (watches for problem changes)

## Production

```bash
docker compose up --build
```

The compose file builds the web and webhook apps and wires them to the
Postgres container.

## Adding a new problem

1. Create a folder under `apps/problems/<my-problem>` containing:
   - `Problem.md` – statement
   - `Structure.md` – signature definition
   - `tests/inputs/*.txt` and `tests/outputs/*.txt`
2. Run `pnpm --filter boilerplate-generator dev` to generate
   `boilerplate/` & `full-boilerplate/` starter code.
3. Commit the changes – the web UI will automatically pick up the new
   problem.

## Tooling

- **Turborepo** – task orchestration & caching
- **Prisma** – typed ORM & migrations
- **Tailwind CSS** – utility-first styling
- **ESLint + Prettier** – code quality
