# Portfolio Website Monolith

A personal website and portfolio built with **Next.js 15 (App Router)** and **PayloadCMS v3** using a monolithic architecture.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **CMS:** PayloadCMS v3 (embedded)
- **Database:** PostgreSQL (via connection pooler)
- **ORM:** Payload Database Adapter PostgreSQL (Drizzle ORM)
- **Storage:** S3-compatible (Cloudflare R2 / AWS S3)
- **Styling:** Tailwind CSS v4 + Glassmorphism
- **Language:** TypeScript

## Architecture

Single repository, single application, monolithic architecture. PayloadCMS runs natively inside Next.js.

## Getting Started

```bash
# Copy environment variables
cp .env.example .env

# Install dependencies
pnpm install

# Start the development server (PostgreSQL needs to be running)
pnpm dev
```

### Docker (PostgreSQL)

```bash
docker compose up -d
pnpm dev
```

### Seed Data

Visit `/api/seed` in the browser (development mode only) to populate sample data.

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm payload generate:types` - Regenerate Payload TypeScript types
- `pnpm lint` - Run ESLint

## Collections

- **Users** - Admin authentication with brute-force protection
- **Media** - File uploads via S3-compatible storage
- **Posts** - Blog posts with rich text (Lexical)
- **Projects** - Portfolio projects with tech stack tags
- **Tags** - Taxonomy for projects
- **Messages** - Contact form submissions
- **Comments** - Blog comments with moderation

## Deployment

- **Frontend + CMS:** Vercel (single project)
- **Database:** Railway (PostgreSQL via connection pooler)
- **Storage:** Cloudflare R2 / AWS S3
