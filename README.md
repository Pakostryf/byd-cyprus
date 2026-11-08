# BYD Cyprus Community

A small community site for BYD owners and fans in Cyprus: upcoming events and an accessories store with a working cart. Built with Next.js, React and Tailwind CSS.

## Features

- Responsive layout with a mobile menu
- Events list sorted by date, with past events tucked away
- Accessories store with a cart (quantities, totals), saved in the browser (localStorage)

## Managing events

Only the site owner edits events. Open `app/data/events.ts`, add or change an entry, then commit and push; Vercel redeploys automatically.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` start the dev server
- `npm run build` production build
- `npm run start` run the production build
- `npm run lint` lint the code

## Project structure

- `app/page.tsx` page layout and hero
- `app/data/events.ts` the list of events (edit this to add events)
- `app/components/` Navbar, Events and Store
- `app/lib/useLocalStorage.ts` small persistence hook
- `app/globals.css` theme colours and base styles

## Next steps

- Add real products to `PRODUCTS` in `app/components/Store.tsx`
- Connect checkout to a backend (the cart is currently per-browser)
