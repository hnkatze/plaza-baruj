# Plaza Baruj

One-page landing for Plaza Baruj: five commercial units on the ground floor and
five hotel units on the second floor (two bedrooms each, plus bathroom, kitchen
and living room), under a single address.

Built with [Astro](https://astro.build) 7 (static output, no client framework) and
[Tailwind CSS](https://tailwindcss.com) 4 through `@tailwindcss/vite`.

## Requirements

Node.js `>=22.22.0`; the pinned version is in `.nvmrc` (24.22.0). Astro aborts the
build on older releases.

## Commands

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Install dependencies                        |
| `astro dev`       | Start the dev server (see note below)        |
| `npm run build`   | Build the production site into `dist/`       |
| `npm run preview` | Preview the production build                 |

This repository runs the dev server in background mode:

```sh
astro dev --background
astro dev status
astro dev logs
astro dev stop
```

## Structure

```text
src/
├── components/        # One component per section of the landing
│   ├── Header.astro
│   ├── Hero.astro     # Includes the two-floor elevation diagram
│   ├── Plaza.astro
│   ├── Locales.astro  # Six commercial units
│   ├── Hotel.astro    # Two rooms + amenities
│   ├── Contacto.astro
│   └── Footer.astro
├── data/site.ts       # All content and contact channels
├── layouts/Layout.astro
├── pages/index.astro
└── styles/global.css  # Tailwind entry: @theme tokens + @utility page + base layer
```

Design tokens (colors, fonts, section spacing, radius) are declared once in the
`@theme` block of `src/styles/global.css`, so they are consumed as normal Tailwind
utilities: `bg-sand`, `text-ink-soft`, `py-section`, `rounded-brand`.

The `page` utility (`max-width` + responsive gutter + centering) is the shell every
section uses instead of repeating container classes.

## SEO and machine discovery

- Every absolute URL derives from `site.url` in `src/data/site.ts`. While it is empty, the
  canonical link, `og:url` and the sitemap line are omitted instead of pointing at a wrong
  origin — set it once and they all switch on.
- `src/layouts/Layout.astro` emits the title/description, Open Graph and Twitter tags, and a
  schema.org `@graph`: `LocalBusiness` for the plaza plus `Hotel` for the upper floor, with
  postal address, coordinates and `amenityFeature` per unit.
- `/robots.txt`, `/llms.txt` and `/index.md` are generated from the same data, so they cannot
  drift from the page. `llms.txt` follows spec v2 (llmstxt.org): H1, blockquote summary,
  details, then H2 sections with link lists; the layout links both files with
  `rel="describedby"` and `rel="alternate" type="text/markdown"`.
- Location data was reverse-geocoded from the map pin: San Marcos, Ocotepeque, Honduras.
  There is still no street address or sitemap integration (the latter needs `site.url`).

## Content status

Everything textual comes from `src/data/site.ts`. Values tagged `TODO(content)`
are placeholders — the site is not ready to publish until they are replaced:

- [x] Brand name: **Plaza Baruj**.
- [x] WhatsApp: +504 9601-5933 (`site.whatsapp`, digits only for the `wa.me` link).
- [x] Location: Google Maps pin at 14.4146486, -88.9527101 (`site.mapsUrl`); there is
      no street address yet, so the pin is shown instead of an invented address.
- [x] Equipment confirmed by the owner: air conditioning, wifi, TV, hot water and
      parking (`hotel.equipamiento`).
- [ ] Real name and category for each of the five units (`locales`).
- [ ] Confirm the hotel layout: five independent units, **two bedrooms each plus one
      shared bathroom, kitchen and living room inside that unit** (`hotel`).
- [ ] Email and Instagram (`site.email`, `site.instagram`) — currently hidden because empty.
- [ ] Domain and deployment target (no `git remote` is configured).
- [ ] Set `site.url` to the final origin, then add `@astrojs/sitemap` and its `Sitemap:` line.

Photography is served from `https://cdn.flujoo.dev/plaza-baru/` and declared in
`images` inside `src/data/site.ts`. Each entry carries its own alt text and real
dimensions (all 16:9), so swap a file by editing that map only — no component knows
file names.
