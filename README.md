# Orchestra

Browser-based app: sign up, log in, buy tokens, generate Bauhaus-style AI art (placeholder in V0.1), and download the result.

---

## Quick start — get http://localhost:3000 working

**If the browser shows nothing or “can’t connect”, do this in a terminal (in the Orchestra project folder):**

1. **Install dependencies** (required once):
   ```bash
   npm install
   ```

2. **Set up the database** (required once):
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Create `.env.local`** (required once) — copy from `.env.example`:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` and set `NEXTAUTH_SECRET` to any long random string (e.g. run `openssl rand -base64 32` and paste the result).

4. **Start the dev server:**
   ```bash
   npm run dev
   ```
   Wait until you see something like: `Ready in … Local: http://localhost:3000`

5. **Open in the browser:**  
   Go to **http://localhost:3000**

If the page is still blank, open **Developer Tools** (F12 or right‑click → Inspect), go to the **Console** tab, and check for red error messages — those will say what’s wrong.

---

- Landing page (hero, features, pricing), Inspiration page (placeholder feed), Generate page (placeholder)
- Auth: email/password only; one modal with Log in / Create account toggle; Forgot password modal (UI only)
- After sign-in: redirect to landing with signed-in header (Generate, Buy tokens, Log out)
- Tokens: Test €1→1, Standard €25→30, Premium €50→70. V0.1: Stripe Checkout redirect (no in-modal Payment Element yet)

## Setup

1. **Node 18+** and npm (or use nvm).

2. **Install and DB:**
   ```bash
   npm install
   npx prisma generate
   npx prisma db push
   ```

3. **Env:** Copy `.env.example` to `.env.local` and set:
   - `NEXTAUTH_SECRET` — e.g. `openssl rand -base64 32`
   - For Stripe (Phase 3): `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and create three Products/Prices in Stripe (Test €1, Standard €25, Premium €50) then set `STRIPE_PRICE_ID_TEST`, `STRIPE_PRICE_ID_STANDARD`, `STRIPE_PRICE_ID_PREMIUM`

4. **Run:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Project layout

- `app/` — routes (page, layout, api)
- `components/` — Header, Footer, Hero, FeatureBlocks, PricingSection, AuthModal, ForgotPasswordModal
- `lib/` — auth, prisma
- `styles/globals.css` — design tokens and raw CSS
- `prisma/schema.prisma` — User, Session, token balance
- `PLAN.md` — full product plan
