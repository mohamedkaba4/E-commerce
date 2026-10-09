# Mavencrest Store

A full-stack sporting goods e-commerce storefront built with Next.js, TypeScript, Prisma, and PostgreSQL.

Mavencrest Store provides the customer-facing experience of the Mavencrest E-Commerce Platform, including product browsing, shopping functionality, and authentication. The storefront is maintained within a monorepo alongside a dedicated Admin Portal and a shared database layer.

---

## Overview

The Storefront is responsible for the public-facing e-commerce experience.

Core functionality includes:

- Product browsing and discovery
- Product categories
- Product detail pages
- Product images, sizes, and colors
- User authentication
- OAuth sign-in
- Customer account functionality
- Responsive storefront interface
- Shared product and user data with the Admin Portal

---

## Application Architecture

The Storefront is one of two Next.js applications within the Mavencrest E-Commerce monorepo.

```text
                    Mavencrest E-Commerce
                            │
               ┌────────────┴────────────┐
               │                         │
        ┌──────▼───────┐          ┌──────▼───────┐
        │  Storefront  │          │ Admin Portal │
        │   Next.js    │          │   Next.js    │
        └──────┬───────┘          └──────┬───────┘
               │                         │
               └────────────┬────────────┘
                            │
                    ┌───────▼────────┐
                    │ Shared Prisma  │
                    │ Database Layer │
                    └───────┬────────┘
                            │
                    ┌───────▼────────┐
                    │   PostgreSQL   │
                    └────────────────┘
