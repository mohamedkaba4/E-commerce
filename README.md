# Mavencrest E-Commerce Platform

A full-stack e-commerce platform built with Next.js, TypeScript,
PostgreSQL, and Prisma, consisting of a customer-facing storefront
and a dedicated administrative application.

**Live Application:** https://store.mavencrest.site

## Application Architecture

![Application Architecture](assets/application-architecture.png)

## Applications

### Storefront
Customer-facing e-commerce application for searching products,
authentication, product discovery, and shopping functionality.

### Admin
Dedicated management application for administering products,
categories, inventory, and platform content.

## Tech Stack

- Next.js
- TypeScript
- PostgreSQL
- Prisma ORM
- NextAuth
- Google OAuth
- Docker
- Monorepo architecture

## Project Structure

E-commerce/
├── apps/
│   ├── storefront/
│   └── admin/
├── packages/
│   └── database/
├── Dockerfile
└── package.json

## Application Architecture

The platform uses a monorepo architecture with two Next.js applications
sharing a centralized Prisma database layer.

### Production

Storefront ──┐
             ├── Shared Prisma Layer ── Production PostgreSQL
Admin ───────┘

### Development

Storefront (Dev) ──┐
                   ├── Shared Prisma Layer ── Development PostgreSQL
Admin (Dev) ───────┘

Production and development use isolated PostgreSQL databases, allowing
application changes and database migrations to be tested without affecting
production data.

## Storefront

[More details](apps/storefront/README.md)

## Admin

[More details](apps/admin/README.md)
