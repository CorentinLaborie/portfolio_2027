# Personal website (Corentin Laborie)

Showcase website built with Next.js 16 (App Router), in English and French.

## Pages and languages

- `/`: English version (default language), with English metadata.
- `/fr`: French version, with its own title and description.
- The EN / FR buttons link to these two addresses. Each page declares the other with `hreflang`, and the sitemap (`/sitemap.xml`) lists both.
- The home page is rendered on every request (`dynamic = "force-dynamic"`), so the age shown in the hero stays correct.
- The content of both languages is shared in `src/app/home-content.ts`.

## Commands

```bash
npm ci            # exact installation of the dependencies
npm run dev       # development
npm run build     # production build
npm start         # production Node server (port 3000 by default, or npm start -- -p 3001)
npm run typecheck # TypeScript
npm run lint      # ESLint
npm test          # unit tests (Vitest)
```

## Deployment

The site runs as a Node server (not a static export): the /api/contact route needs a server.

1. Install Node.js 24 LTS on the server.
2. `npm ci && npm run build`.
3. Run `npm start` under a process manager (systemd), behind an HTTPS reverse proxy.
