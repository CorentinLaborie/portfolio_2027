# Site personnel (Corentin Laborie)

Site vitrine en Next.js 16 (App Router), en français et en anglais.

## Pages et langues

- `/` : version anglaise (langue par défaut), métadonnées en anglais.
- `/fr` : version française, avec ses propres titre et description.
- Les boutons EN / FR sont des liens vers ces deux adresses. Chaque page déclare l'autre avec `hreflang`, et le plan du site (`/sitemap.xml`) les liste toutes les deux.
- La page d'accueil est rendue à chaque requête (`dynamic = "force-dynamic"`), pour que l'âge affiché dans le hero reste juste.
- Le contenu des deux langues est partagé dans `src/app/home-content.ts`.

## Identité visuelle

- L'en-tête affiche le monogramme « CL » (dégradé indigo, composant `src/components/site/BrandMark.tsx`) à la place du nom. Le nom reste disponible comme étiquette accessible.
- Le favicon est `src/app/icon.svg`.

## Projets

- Les données des projets sont dans `src/content/fr/projects.ts` et `src/content/en/projects.ts`. Les deux fichiers doivent rester identiques en structure (même options, mêmes clés).
- Le sélecteur affiche deux groupes : « Professionnels » d'abord, puis « Personnels ». Le groupe d'une option est défini par son champ `kind`.
- Chaque fiche avec carrousel a ses captures dans `public/images/` ; les fichiers référencés doivent exister (un test le vérifie).
- Les boutons de sélection et les boutons du site utilisent le jeton `--radius-button` (12 px), défini dans `design/tokens.json`. `npm run build:tokens` régénère `src/ui/styles/tokens.css` à partir de ce fichier.

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

## Variables d'environnement

- BREVO_API_KEY : clé API Brevo pour envoyer les messages du formulaire de contact. Sans elle (ou sans MAIL_FROM_ADDRESS), le formulaire répond 503.
- MAIL_FROM_ADDRESS : adresse d'expédition vérifiée chez Brevo.
- SITE_URL : adresse publique du site (sitemap, robots, métadonnées). Sans elle, la valeur est http://localhost:3000.

Ces valeurs ne vont jamais dans Git.

## Formulaire de contact

POST /api/contact reçoit name, email, phone, message (JSON). Les règles de validation sont dans src/lib/contact/validate.ts. Un champ company_website rempli est traité comme un robot : rien n'est envoyé. Limites : 5 messages par adresse IP toutes les 10 minutes (429), corps de 10 Ko au plus (413), Content-Type application/json obligatoire (415). Le proxy doit remplacer (et non compléter) l'en-tête X-Forwarded-For.