# Automaker Architecture Directive: 2025 Edition

## 1. Monorepo Supremacy
**Tooling:** Turborepo + pnpm (Workspace Protocol)
**Structure:**
- `apps/*`: Deployable units (Web, API, Docs)
- `packages/*`: Granular, versioned libraries.
  - `@repo/ui`: Pure visual components (ShadCN)
  - `@repo/core`: Business logic & types
  - `@repo/config`: Shared TSConfig, ESLint, Tailwind
  - `@repo/database`: Prisma/Supabase client singleton

## 2. Domain-Driven Design (DDD)
Do not dump everything into `apps/web`.
- **Vertical Slicing:** Organize by feature domain (e.g., `modules/auth`, `modules/billing`) rather than technical layer (e.g., `controllers`, `components`).
- **Boundaries:** Each domain must have a clear public API (barrel export).

## 3. Strict TypeScript
- **Path Aliases:** Use `@/*` extensively to avoid `../../..` hell.
- **Type Sharing:** Backend (API) and Frontend (Web) must share types via `@repo/types`.
- **Validation:** Zod schemas are the source of truth for all data crossing boundaries.

## 4. Feature Flagging
- All new features must be wrapped in flags (e.g., LaunchDarkly or local env flags) to enable "Trunk-Based Development" without breaking production.
