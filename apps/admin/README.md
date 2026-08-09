# Mavencrest Admin Portal

Administrative application for the Mavencrest E-Commerce Platform.

Built with Next.js, the Admin Portal provides an interface for managing the application's product, categories, inventory, and other e-commerce data.

The application is maintained in the Mavencrest E-Commerce monorepo and shares the same Prisma database layer used by the storefront application.

---

## Overview

The Admin Portal provides the management layer for the e-commerce platform while being separate from the public storefront.

Its primary responsibilities include:

- Product management
- Category management
- Inventory and product availability
- Product images and metadata
- E-commerce content management
- Administrative access to application data
- Shared PostgreSQL data access through Prisma ORM.

---

## Architecture

The Admin Portal is one of two Next.js applications within the Mavencrest monorepo.


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
