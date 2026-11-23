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

## Contact form

- The form posts to `/api/contact`. It sends the message through Brevo (`src/lib/contact/brevo.ts`).
- Two environment variables are read: `BREVO_API_KEY` and `MAIL_FROM_ADDRESS`. Set neither in the repository; put their values on the server only.
- Without both values, the route answers 503 and no message is lost silently.
- The client address comes from `x-forwarded-for`: the reverse proxy in front of the site must add it.

## Security headers

- `src/lib/security/security-headers.ts` sends these headers on every page: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, a strict `Referrer-Policy`, a restrictive `Permissions-Policy`, `Strict-Transport-Security` and `Content-Security-Policy: frame-ancestors 'none'`.
- The policy only restricts framing. A full Content-Security-Policy would need nonces for the scripts Next.js injects; it is not set yet.
- The header list is tested in `security-headers.test.ts`.
