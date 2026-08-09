# Firose Enterprises

A corporate website for **FIROSE Enterprises**, established in 2018 and operating four divisions across fragrance, consumer care, housekeeping and hygiene, and enterprise technology. The business and product heritage dates back to 1980.

## Overview

FIROSE Enterprises operates AR Perfumes, Femison, Neat & Fresh, and Future Beyond Technology (FBT). The consumer-products catalogue covers the 55+ products presented under Femison and Neat & Fresh; it does not represent the AR Perfumes or FBT portfolios.

### Operating Divisions
- **AR Perfumes:** Premium luxury perfume brand with a Middle Eastern–inspired aesthetic.
- **Femison:** Consumer, baby, and personal-care product portfolio.
- **Neat & Fresh:** Housekeeping and hygiene product portfolio.
- **Future Beyond Technology / FBT:** Enterprise technology services.

---

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/), PostCSS
- **UI Components:** React 19

---

## Getting Started

### Requirements
- **Node.js:** 18.x or later (recommended 20+)
- **Package Manager:** npm (or yarn/pnpm)

### Setup & Run
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd firose-web
   ```

2. **Install dependencies:**
   ```bash
   npm ci
   ```

3. **Configure the environment:**
   ```bash
   cp .env.example .env.local
   ```

   Configure the enquiry delivery variables before testing form delivery. Do not publish a corporate email or social link until FIROSE has confirmed it.

4. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the result.

---

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint for code quality checks.
- `npm run typecheck`: Runs the TypeScript compiler without emitting files.

---

## Project Structure

```text
firose-web/
├── app/                # Next.js App Router (Pages, Layouts, Components)
│   ├── about/          # About page and corporate story
│   ├── brands/         # Brand-specific pages (AR Perfumes, Femison, etc.)
│   ├── lib/            # Shared utilities and data fetching
│   └── globals.css     # Global styles and Tailwind directives
├── docs/               # Architecture, cleanup, and migration documentation
├── public/             # Static assets (images, favicon)
├── next.config.js      # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

---

## Environment Variables

Copy `.env.example` to `.env.local`. The site remains buildable without secrets, but the business-enquiry form intentionally returns a temporary delivery error until `ENQUIRY_WEBHOOK_URL` points to an HTTPS server endpoint.

Server-only enquiry variables:

- `ENQUIRY_WEBHOOK_URL`: HTTPS endpoint that stores or delivers the validated enquiry.
- `ENQUIRY_WEBHOOK_TOKEN`: optional bearer token for that endpoint.
- `ENQUIRY_RECIPIENT_EMAIL`: optional confirmed delivery recipient passed to the endpoint.

Public variables:

- `NEXT_PUBLIC_SITE_URL`: canonical production origin; defaults to `https://firoseenterprises.in`.
- `NEXT_PUBLIC_CORPORATE_EMAIL`: confirmed public mailbox. It is hidden when empty.
- `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_YOUTUBE_URL`, `NEXT_PUBLIC_AMAZON_STOREFRONT_URL`: optional confirmed profiles; empty links are not rendered.
- `NEXT_PUBLIC_AR_BRAND_WEBSITE`: optional AR Perfumes website override.

---

## Tests
- TODO: Implement unit and integration tests (e.g., Jest, Playwright).
- Build validation: `npm run build`

---

## License

© FIROSE Enterprises. For corporate use only.
