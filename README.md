# Cur365

Klein Curaçao tours from Curaçao. Compare day trips, yachts, powerboats and private charters that actually land on the uninhabited island — then book with free cancellation on most tours.

Live site: [cur365.com](https://cur365.com)

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and add a Viator Partner API key if you want live prices and images. Without it, the site uses static product summaries.

```bash
VIATOR_API_KEY=your_partner_api_key
```

## Build

```bash
npm run build
npm start
```

## What this site is

Cur365 is a Viator affiliate focused on Klein Curaçao. Bookings go to Viator and the operator. Category pages, tour listings and guides compare boats that land on the island — not generic Curaçao coast tours.
