# MAVENCREST — Setup Guide

## 1. Install new dependencies

```bash
npm install bcryptjs @auth/prisma-adapter
npm install -D @types/bcryptjs
```

## 2. Update .env.local

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

Generate a NextAuth secret:
```bash
openssl rand -base64 32
```

## 3. Apply the new Prisma schema

Replace `prisma/schema.prisma` with the new file, then:

```bash
npx prisma migrate dev --name "add_ecommerce_schema"
npx prisma generate
```

## 4. Seed the database

Add this to `package.json` under scripts:
```json
"db:seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
```

Then run:
```bash
npm install -D ts-node
npm run db:seed
```

## 5. Copy files into your project

| Output file | → Your project |
|---|---|
| `prisma/schema.prisma` | `prisma/schema.prisma` (replace) |
| `prisma/seed.ts` | `prisma/seed.ts` |
| `types/index.ts` | `types/index.ts` (create) |
| `lib/prisma.ts` | `lib/prisma.ts` |
| `lib/auth.ts` | `lib/auth.ts` |
| `store/useCart.ts` | `store/useCart.ts` (replace) |
| `app/components/Providers.tsx` | `app/components/Providers.tsx` (replace) |
| `app/components/layout/Navbar.tsx` | `app/components/layout/Navbar.tsx` |
| `app/components/layout/CartDrawer.tsx` | `app/components/layout/CartDrawer.tsx` |
| `app/components/ui/ProductCard.tsx` | `app/components/ui/ProductCard.tsx` |
| `app/api/auth/[...nextauth]/route.ts` | `app/api/auth/[...nextauth]/route.ts` |
| `app/api/auth/register/route.ts` | `app/api/auth/register/route.ts` |
| `app/api/products/route.ts` | `app/api/products/route.ts` |
| `app/api/products/[slug]/route.ts` | `app/api/products/[slug]/route.ts` |
| `app/api/orders/route.ts` | `app/api/orders/route.ts` |
| `app/products/page.tsx` | `app/products/page.tsx` (replace) |
| `app/products/[slug]/page.tsx` | `app/products/[slug]/page.tsx` |
| `app/checkout/page.tsx` | `app/checkout/page.tsx` |
| `app/auth/signin/page.tsx` | `app/auth/signin/page.tsx` |
| `app/auth/signup/page.tsx` | `app/auth/signup/page.tsx` |

## 6. Update tsconfig.json (if not already present)

Make sure you have path aliases:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## 7. Run the app

```bash
npm run dev
```

## Pages
- `/` — Homepage (your existing)
- `/products` — Catalog with filters
- `/products/[slug]` — Product detail
- `/checkout` — Two-step checkout
- `/auth/signin` — Login
- `/auth/signup` — Register

## What's fake vs real
- ✅ Auth — real (bcrypt + JWT session)
- ✅ Products — real (seeded PostgreSQL)
- ✅ Cart — real (Zustand, persisted to localStorage)
- ✅ Orders — real (saved to DB)
- ⚡ Payments — simulated (no money moves, card stored as last 4 digits only)
