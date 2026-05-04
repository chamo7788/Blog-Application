# Full-Stack Blog App

Short, maintainable Next.js + Prisma blog application used for demonstrations and local development.

**Tech stack:** Next.js (App Router), TypeScript, Prisma, SQLite/Postgres (via DATABASE_URL), Tailwind CSS.

## Quick Start (for maintainers)

Prerequisites:

- Node.js 18+ (use nvm or similar)
- npm or pnpm

Clone, install, and run locally:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create an environment file `.env.local` (copy from `.env.example` if present) and set the required variables:

- `DATABASE_URL` — Prisma database URL (e.g. `file:./dev.db` or Postgres URL)
- `GEMINI_API_KEY` — (optional) API key used by the app for AI features
- `NEXTAUTH_URL` and `NEXTAUTH_SECRET` — if using next-auth in this project

3. Prepare the database (Prisma):

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

   Or, if you prefer to push the schema without migrations for quick local setup:

   ```bash
   npx prisma db push
   ```

4. Seed initial data (categories):

   ```bash
   node seed-categories.js
   ```

5. Run the app in development:

   ```bash
   npm run dev
   ```

## Important Files & Where to Look

- Project root: `package.json` (npm scripts)
- Prisma schema: [prisma/schema.prisma](prisma/schema.prisma)
- Seed script: [seed-categories.js](seed-categories.js)
- App entry (Next.js App Router): [src/app/page.tsx](src/app/page.tsx)
- Main components: [src/components](src/components)
- Auth helpers: [src/lib/auth-utils.ts](src/lib/auth-utils.ts) and [src/lib/auth-context.tsx](src/lib/auth-context.tsx)

## Scripts

- `npm run dev` — start Next.js in development
- `npm run build` — build for production
- `npm start` — run the production build

Check `package.json` for the exact script names.

## Maintenance Notes

- When changing the Prisma schema, run `npx prisma migrate dev` and update the seed script if needed.
- Keep environment variables required for CI/deploy in your secret store (do not commit `.env.local`).
- If you add new dependencies, run `npm install` and verify the app builds with `npm run build`.

## Contribution / Handoff

1. Create a feature branch named `feature/<short-desc>`.
2. Run the app and verify functionality locally.
3. Open a PR with a short description and screenshots if the change affects UI.

If you need context about auth flows or data models, start with [src/lib/auth-utils.ts](src/lib/auth-utils.ts) and [prisma/schema.prisma](prisma/schema.prisma).

## Contact

Leave a comment on the PR or reach out to the original author in the repo's issue tracker for handoff questions.

---

This README is intended to help the next developer pick up maintenance quickly. If you'd like, I can also add a CI checklist or GitHub Actions workflow next.
