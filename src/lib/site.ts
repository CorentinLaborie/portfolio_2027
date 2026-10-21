/**
 * Public address of the site, used for the metadata, the robots file and the sitemap.
 * Set SITE_URL on the server (never in Git); without it the address is the local development one.
 */
export const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
