# Horizon Properties

A premium real estate website for a private advisory representing architectural homes and
considered investments. Built with Vite, React, TypeScript and Tailwind CSS.

## Run locally

```bash
npm ci
npm run dev      # http://localhost:5173
npm run build    # typecheck + production bundle
npm run preview  # serve the production build
```

Requires Node.js 22+.

## Structure

```
src/
  components/
    layout/      Header, Footer, page shell
    home/        Hero, sections and the search panel
    property/    PropertyCard, carousel, gallery, agent card, favourite button
    forms/       InquiryForm + modal
    team/        TeamCard
    shared/      PageHero, CtaBand
    ui/          Button, Icon, Photo, Reveal, SectionHeading, Field primitives
  context/       FavoritesProvider (localStorage)
  data/          properties.ts and site.ts — all editable content
  hooks/         usePageTitle
  lib/           image helpers, formatting, inquiry persistence
  pages/         Home, Properties, PropertyDetail, About, Services, Team, Contact, NotFound
```

## Editing content

- **Properties** — `src/data/properties.ts`: name, location, price, type, beds, baths,
  area, description, features, amenities, gallery image ids and the assigned agent.
  Add a property by appending to the array; cards, filters, detail routes and similar
  properties all derive from this data.
- **Agents, services, values, stats** — `src/data/site.ts`.
- **Design tokens** — colours, typography and spacing live in `tailwind.config.js` and
  `src/index.css` (`shell`, headings, form fields, reveal animation).
- **Photography** — image ids are Unsplash photo ids resolved by `src/lib/images.ts`.
  Replace `photoUrl`/`photoSrcSet` (or the ids) with your own CDN or local assets for
  production.

## Functionality

- Property search, location/type/price/bed/bath filters and sorting are URL-driven
  (`/properties?location=Malibu&type=Villa`), so results are shareable.
- Property detail pages include a keyboard-accessible lightbox gallery, save button,
  agent contact and viewing request modal.
- Favourites persist in `localStorage` under `horizon:favorites`.
- Enquiries persist under `horizon:inquiries` through `src/lib/inquiries.ts`. That
  module is the single integration point for a CRM or API — swap `saveInquiry` for a
  `POST` when a backend is available. Newsletter signup is handled client-side in the
  footer.
- Motion respects `prefers-reduced-motion`; images are responsive, lazy-loaded below
  the fold and sized with `srcset`.

## Deployment

`npm run build` outputs a static bundle in `dist/`. Serve it from any static host with
a SPA fallback to `index.html` (e.g. Netlify `/* /index.html 200`, Vercel rewrite, or
Nginx `try_files $uri /index.html`).

The Base44 sandbox preview runs the Vite dev server from the live source; environment
configuration is documented separately in the environment repository.
