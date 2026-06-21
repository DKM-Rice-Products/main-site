# Sri Durai Kannammal Rice Products

A Next.js (App Router) application for a rice distribution business — a public marketing website plus an admin portal for managing brands, enquiries, and pricing.

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router)
- React 18
- [Recharts](https://recharts.org/) — admin dashboard charts
- [lucide-react](https://lucide.dev/) — icons

## Getting started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the development server         |
| `npm run build` | Create an optimized production build |
| `npm run start` | Run the production build             |
| `npm run lint`  | Run ESLint                           |

## Admin portal

The admin portal lives at a deliberately non-obvious path and is **not linked**
from any public page. Navigate directly to
[`/dkm-backoffice`](http://localhost:3000/dkm-backoffice) and sign in with the demo credentials:

- **Username:** `admin`
- **Password:** `rice2025`

> Note: these demo credentials are hard-coded on the client for prototyping only. Replace with real server-side authentication before production use.

## API

A REST API backs the contact/enquiry flow and admin portal. Data is served from
an in-memory store (`lib/store.js`) seeded from the editable files in `data/`,
so it resets on server restart — swap the store for a real database later.

| Method               | Endpoint               | Description                          |
| -------------------- | ---------------------- | ------------------------------------ |
| `GET`                | `/api/enquiries`       | List enquiries (`?status=&type=&search=`) |
| `POST`               | `/api/enquiries`       | Submit a contact enquiry (validated) |
| `GET/PATCH/DELETE`   | `/api/enquiries/:id`   | Read, update status, or delete       |
| `GET`                | `/api/brands`          | List rice brands (`?tag=`)           |
| `POST`               | `/api/brands`          | Create a brand                       |
| `GET/PATCH/DELETE`   | `/api/brands/:id`      | Read, update, or delete a brand      |
| `GET`                | `/api/settings`        | Read pricing banner + company info   |
| `PUT`                | `/api/settings`        | Update pricing banner / company info |

## Editing content

All seed/dummy content lives in `data/` so it can be changed without touching
component code:

- `data/brands.js` — rice brands + filter options
- `data/enquiries.js` — sample enquiries + status/type options
- `data/company.js` — company info, pricing, stats, features, delivery options
- `data/charts.js` — admin dashboard chart data

## Project structure

```
app/
  (public)/             # Public site route group (shares Navbar/Footer layout)
    layout.jsx          #   PublicProvider + Navbar + Footer + FloatingWhatsApp
    page.jsx            #   Home
    brands/page.jsx     #   Brand catalogue
    enquiry/page.jsx    #   Contact / enquiry form
    delivery/page.jsx   #   Delivery info
    about/page.jsx      #   About
    contact/page.jsx    #   Contact details
  dkm-backoffice/page.jsx # Admin portal (unlisted path, outside the public layout)
  api/                  # REST API route handlers
  globals.css           # Global styles + keyframes
  layout.jsx            # Root layout + metadata
components/
  ui/                   # Reusable primitives (Badge, Field, Modal, Toast, …)
  layout/               # Navbar, Footer, FloatingWhatsApp
  home/                 # Home page sections
  brands/               # Brand card + explorer
  enquiry/              # Enquiry form + quick modal
  admin/                # Admin dashboard, brands, enquiries, prices, settings
  providers/            # PublicProvider (toast + enquiry modal context)
data/                   # Editable seed/dummy content
hooks/                  # useToast
lib/                    # store, validation, theme, api-client
next.config.mjs
jsconfig.json
```
