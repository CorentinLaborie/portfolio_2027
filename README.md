# Site personnel (Corentin Laborie)

Site vitrine en Next.js 16 (App Router), en français et en anglais.

## Commandes

`ash
npm ci            # installation exacte des dépendances
npm run dev       # développement
npm run build     # build de production
npm start         # serveur Node de production (port 3000 par défaut, ou npm start -- -p 3001)
npm run typecheck # TypeScript
npm run lint      # ESLint
npm test          # tests unitaires (Vitest)
`

## Déploiement

Le site tourne comme serveur Node (pas d'export statique) : la route /api/contact a besoin d'un serveur.

1. Installer Node.js 24 LTS sur le serveur.
2. 
pm ci && npm run build.
3. Lancer 
pm start sous un gestionnaire de processus (systemd), derrière un reverse proxy HTTPS.

## Variables d'environnement

- BREVO_API_KEY : clé API Brevo pour envoyer les messages du formulaire de contact. Pas encore branchée : sans elle, le formulaire répond 503.
- MAIL_FROM_ADDRESS : adresse d'expédition vérifiée chez Brevo.
- SITE_URL : adresse publique du site (sitemap, robots, métadonnées). Sans elle, la valeur est http://localhost:3000.

Ces valeurs ne vont jamais dans Git.

## Formulaire de contact

POST /api/contact reçoit name, email, phone, message (JSON). Les règles de validation sont dans src/lib/contact/validate.ts. Un champ company_website rempli est traité comme un robot : rien n'est envoyé. Limites : 5 messages par adresse IP toutes les 10 minutes (429), corps de 10 Ko au plus (413), Content-Type application/json obligatoire (415). Le proxy doit remplacer (et non compléter) l'en-tête X-Forwarded-For.