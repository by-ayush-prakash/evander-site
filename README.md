# Evander

This Astro site is the source for evander.life. The homepage preserves the Evander page previously on CIF, and the Wellington routes retain their existing URLs and layouts. Retired prototypes are included in source and keep their existing production redirects.

Run `npm ci` and `npm run dev` for local development. Run `npm run build` to generate `dist/`.

The Netlify configuration builds and publishes `dist/`. Enable Netlify Forms before the initial production deploy so Netlify detects the Wellington signup form. Connect evander.life to the Netlify site and verify the landing page and signup flow before switching the CIF redirect.
