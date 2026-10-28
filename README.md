# Site personnel (Corentin Laborie)

Site vitrine en Next.js 16 (App Router), en français et en anglais.

## Pages et langues

- `/` : version anglaise (langue par défaut), métadonnées en anglais.
- `/fr` : version française, avec ses propres titre et description.
- Les boutons EN / FR sont des liens vers ces deux adresses. Chaque page déclare l'autre avec `hreflang`, et le plan du site (`/sitemap.xml`) les liste toutes les deux.
- La page d'accueil est rendue à chaque requête (`dynamic = "force-dynamic"`), pour que l'âge affiché dans le hero reste juste.
- Le contenu des deux langues est partagé dans `src/app/home-content.ts`.

## Commandes

```bash
npm ci            # installation exacte des dépendances
npm run dev       # développement
npm run build     # build de production
npm start         # serveur Node de production (port 3000 par défaut, ou npm start -- -p 3001)
npm run typecheck # TypeScript
npm run lint      # ESLint
npm test          # tests unitaires (Vitest)
```

## Déploiement

Le site tourne comme serveur Node (pas d'export statique) : la route /api/contact a besoin d'un serveur.

1. Installer Node.js 24 LTS sur le serveur.
2. `npm ci && npm run build`.
3. Lancer `npm start` sous un gestionnaire de processus (systemd), derrière un reverse proxy HTTPS.

