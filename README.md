<div align="center">
  <img src="public/og-image.png" alt="DevFusion Portfolio Banner" width="100%" style="border-radius: 12px; margin-bottom: 20px;" />

  # DevFusion — Fullstack Developer Portfolio
  
  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white" alt="Cloudflare" />
    <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </p>

  <p align="center">
    A bilingual (English 🇬🇧 / French 🇫🇷) fullstack portfolio website for a fullstack developer, built from a dark, orange-accented reference design. Next.js 16 + Tailwind CSS 4 + shadcn/ui on the front, Prisma + SQLite on the back, with a working contact inbox, database-driven projects & testimonials, and a live visitor counter.
  </p>
</div>

---

## ✨ Features

| Area | What you get |
|------|--------------|
| **Language toggler (EN–FR)** | One-click switch in the navbar (desktop + mobile). UI strings, DB content (projects, testimonials), tab title and `<html lang>` all switch instantly. Preference persists in `localStorage` and syncs across tabs. |
| **Hero** | Typing-effect roles, glowing ring portrait, 4 floating tech badges, reading progress bar. |
| **About** | Animated stat counters, info card, cursive signature, downloadable resume PDF. |
| **Services / Skills** | 4 service cards; 6 animated skill bars with 15 hand-crafted SVG brand icons (no CDN dependency). |
| **Projects** | Loaded from the database via `GET /api/projects`, with bilingual descriptions & categories, skeleton loading states. |
| **Testimonials** | Database-driven, mobile snap-carousel with dots, bilingual quotes/roles. |
| **Contact form** | Full validation (bilingual error messages), `POST /api/contact` → SQLite persistence, toast feedback ("Message sent!" / "Message envoyé"). |
| **Live analytics** | `GET /api/stats` counts real visits (session-guarded) — shown as "visitor #N" in the footer. |
| **Extras** | Scroll-spy navbar, scroll-reveal animations, fully responsive (390px+ verified), custom orange favicon. |

## 🧱 Tech Stack

- **Framework**: Next.js 16 (App Router, React 19)
- **Deploy target**: Cloudflare Workers via [OpenNext](https://opennext.js.org/cloudflare) (`opennextjs-cloudflare`)
- **Styling**: Tailwind CSS 4, shadcn/ui components, custom keyframe animations
- **Animations**: Framer Motion, CSS keyframes, typing effect
- **Database**: Prisma ORM — Cloudflare D1 (production) / SQLite file (local dev)
- **Auth**: NextAuth.js v4 with GitHub provider (guards `/admin`)
- **Email**: Resend — notifies on every contact form submit
- **Spam protection**: Cloudflare Turnstile (optional, gracefully disabled when keys not set)
- **Rate limiting**: D1-backed IP bucket (5 msgs / hour per IP)
- **Validation**: Zod
- **Language**: TypeScript throughout
- **Runtime**: Node.js ≥ 20 (Cloudflare remote build handles the Worker runtime)

## 🚀 Quick Start

> Prerequisites: [Bun](https://bun.sh) (or Node.js 20+ with npm). The repo ships with a **pre-seeded SQLite database**, so it works out of the box.

```bash
# 1. Install dependencies
bun install          # or: npm install

# 2. Point the app at the bundled database
cp .env.example .env # contains DATABASE_URL=file:../db/custom.db (relative to prisma/)

# 3. Generate the Prisma client
bunx prisma generate # or: npx prisma generate

# 4. Run the dev server
bun dev              # or: npm run dev
```

Open **http://localhost:3000** — done. The site starts in English; hit the **EN | FR** pill in the navbar to switch.

### Database already includes

3 bilingual projects, 3 bilingual testimonials. To reset/reseed:

```bash
bun run db:push      # recreate schema (or: npm run db:push)
bun run db:seed      # seed demo content (or: npx tsx scripts/seed.ts)
```

### Production build

```bash
bun run build        # or: npm run build
bun run start        # serves the standalone build on port 3000
```

## 🔌 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/projects` | All projects (tags expanded, EN + FR fields) |
| `GET` | `/api/testimonials` | All testimonials (EN + FR fields) |
| `GET` | `/api/stats?count=1` | Live visitor counter (upserts a visit when `count=1`) |
| `POST` | `/api/contact` | Validate + persist a contact message |
| `GET` | `/api/contact` | List contact messages (admin/inbox use) |

## 🌍 How the i18n works

- `src/lib/i18n.tsx` — typed `en` / `fr` dictionaries covering **every** UI string. The `Dictionary = typeof en` type guarantees both languages stay in sync at compile time.
- `src/components/portfolio/language-provider.tsx` — `LanguageProvider` + `useI18n()` + the `LanguageToggle` pill. State is kept in an external store read via `useSyncExternalStore` (hydration-safe: server always renders `en`, then the stored preference is picked up on the client).
- Database content carries parallel columns (`descriptionFr`, `categoryFr`, `quoteFr`, `roleFr`). Components pick `lang === 'fr' ? fr-field ?? en-field : en-field`, so toggling never triggers a refetch.
- `LanguageProvider` also renders a hoisted `<title>` so the tab title localizes (React 19-safe).

## 🔍 SEO (built in)

The site ships with a complete technical SEO layer:

- **Metadata API** (`src/app/layout.tsx`) — canonical URL, EN/FR + `x-default` hreflang, Open Graph (`og:image` 1200×630), Twitter `summary_large_image` card, robots directives (`max-image-preview:large`), theme-color for light & dark, bilingual keywords (EN + FR).
- **`src/lib/site.ts`** — single source of truth for the site URL, name, email and social links. Every SEO tag resolves from it; override `NEXT_PUBLIC_SITE_URL` in `.env` when deploying to your own domain and everything (canonical, OG, sitemap, robots, JSON-LD) updates automatically.
- **JSON-LD structured data** (`src/components/portfolio/structured-data.tsx`) — one `@graph` with `ProfilePage` + `Person` + `WebSite` nodes (name, job title, email, social `sameAs`, languages, skills). Validate after deploy with [Google's Rich Results Test](https://search.google.com/test/rich-results).
- **`/robots.txt`** (`src/app/robots.ts`) — allows everything except `/api/`, references the sitemap.
- **`/sitemap.xml`** (`src/app/sitemap.ts`) — canonical homepage entry with EN/FR hreflang alternates.
- **`/manifest.webmanifest`** (`src/app/manifest.ts`) — installable PWA manifest with the AG icons.
- **Brand assets** — `public/og-image.png` (social share card), `public/icons/icon-{32,192,512}.png` + `apple-touch-icon.png` (regenerate with `python3 scripts/seo_assets.py`).
- **Semantic markup** — one `<h1>` per page, `alt` text on every image, `lang` attribute that follows the EN/FR toggle, `rel="noopener noreferrer"` on external links.

> After deploying: point Google Search Console at the sitemap (`https://your-domain/sitemap.xml`), and update the social handles in `hero.tsx` / `footer.tsx` / `src/lib/site.ts` if yours differ from the `atongglory` placeholders.

## ♿ UX & Accessibility

- **Keyboard navigation** — "Skip to content" link appears on first Tab press (localized EN/FR), visible orange `:focus-visible` ring on every interactive element.
- **Reduced motion** — CSS animations/transitions and Framer Motion reveals (`MotionConfig reducedMotion="user"`) all respect `prefers-reduced-motion`.
- **Themed slim scrollbar** — orange-tinted for dark & light modes.
- **Form autofill** — `autoComplete`/`inputMode` on contact fields for password managers and mobile keyboards.
- **Branded bilingual 404** (`src/app/not-found.tsx`) — EN/FR copy, orange gradient, back-home CTA.
- Anchor clicks respect the fixed navbar via `scroll-margin-top` on all sections.

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/            # contact, projects, stats, testimonials routes
│   │   ├── layout.tsx      # fonts, SEO metadata, ThemeProvider
│   │   ├── robots.ts       # /robots.txt (metadata route)
│   │   ├── sitemap.ts      # /sitemap.xml (metadata route)
│   │   ├── manifest.ts     # /manifest.webmanifest (metadata route)
│   │   ├── page.tsx        # composes all sections
│   │   └── globals.css     # Tailwind 4 theme + custom keyframes
│   ├── components/
│   │   ├── portfolio/      # navbar, hero, about, services, skills,
│   │   │                   # projects, testimonials, contact, footer,
│   │   │                   # language-provider, tech-icons, shared
│   │   └── ui/             # shadcn/ui primitives
│   └── lib/                # i18n dictionaries, prisma client, utils
├── prisma/schema.prisma    # ContactMessage, Project, Testimonial, VisitorStat
├── db/custom.db            # pre-seeded SQLite database
├── public/                 # AI-generated images, resume PDF, favicon
├── scripts/seed.ts         # idempotent bilingual seed script
├── scripts/resume_pdf.py   # (optional) regenerates public/Atong-Glory-Resume.pdf
└── design/reference-design.jpg  # original UI reference this was built from
```

## 🎨 Customization Cheat-Sheet

| I want to… | Edit… |
|------------|-------|
| Change my name/roles/text | `src/lib/i18n.tsx` (both `en` and `fr` objects) |
| Add a project | `scripts/seed.ts` (or insert directly into the `Project` table) |
| Change colors | `src/app/globals.css` (orange accent = `#f97316` family) & section components |
| Swap the portrait/images | `public/images/` (keep the same filenames) |
| Regenerate the resume | `python scripts/resume_pdf.py` then rebuild |
| Point at Postgres/MySQL | change `provider` in `prisma/schema.prisma` + `DATABASE_URL`, then `bun run db:push` |
| Change the site URL for SEO | `.env` → `NEXT_PUBLIC_SITE_URL` (or `src/lib/site.ts` default) |
| Update social profile links | `src/components/portfolio/hero.tsx`, `footer.tsx` + `src/lib/site.ts` |
| Regenerate OG image / icons | `python3 scripts/seo_assets.py` |


## ☁️ Deploy to Cloudflare (recommended)

The project is **already wired for Cloudflare** — OpenNext config, Wrangler config, and the D1 Prisma adapter are all in place. Follow these steps once to go from repo to live URL.

### Step 1 — Create the D1 database

```bash
npx wrangler d1 create devfusion-portfolio
# Copy the database_id printed in the output
```

Open [`wrangler.jsonc`](wrangler.jsonc) and replace `"REPLACE_WITH_YOUR_D1_DATABASE_ID"` with the real ID.

### Step 2 — Push the schema to D1

```bash
# Local D1 (for testing with wrangler dev):
npm run db:push:d1

# Remote D1 (production):
npx wrangler d1 execute devfusion-portfolio --remote --file=./prisma/d1-schema.sql
```

### Step 3 — Seed demo content

```bash
# Remote D1:
npx wrangler d1 execute devfusion-portfolio --remote --file=./prisma/d1-seed.sql
```

### Step 4 — Set environment variables in Cloudflare

Go to **Cloudflare Dashboard → Workers & Pages → devfusion-portfolio → Settings → Variables**.
Add every secret from `.env.example` (the _"Server-only secrets"_ section). At minimum:

| Variable | Where to get it |
|---|---|
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | your Cloudflare Pages URL or custom domain |
| `GITHUB_ID` / `GITHUB_SECRET` | github.com/settings/developers → OAuth Apps (callback: `https://<domain>/api/auth/callback/github`) |
| `ADMIN_GITHUB_USERNAME` | your GitHub username |
| `ADMIN_API_SECRET` | any random string |
| `RESEND_API_KEY` | resend.com (free tier: 100 emails/day) |
| `NEXT_PUBLIC_SITE_URL` | your Cloudflare Pages domain or custom domain |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` | Cloudflare Dashboard → Turnstile (free) |

### Step 5 — Deploy

```bash
npm run deploy
# Builds with OpenNext then deploys to Cloudflare Workers
```

Or connect the GitHub repo to **Cloudflare Pages** (Workers & Pages → Create → Connect to Git) with build command `npm run deploy` and `node_modules/.bin` in the PATH — Cloudflare's remote Linux build handles the rest.

### Step 6 — Custom domain + sitemap

1. In Cloudflare Pages settings, add your custom domain (automatic HTTPS).
2. Update `NEXT_PUBLIC_SITE_URL` to your domain (triggers canonical, OG, sitemap, JSON-LD update on next deploy).
3. Submit `https://your-domain/sitemap.xml` to [Google Search Console](https://search.google.com/search-console).
4. Validate structured data: [Rich Results Test](https://search.google.com/test/rich-results).

### Local preview with Wrangler (D1 local)

```bash
npm run db:push:d1   # initialise local D1
npm run db:seed:d1   # seed local D1
npm run preview      # opennextjs-cloudflare build + wrangler dev
```

---

## 📄 License

Free to use as a personal portfolio template. Attribution appreciated but not required.

