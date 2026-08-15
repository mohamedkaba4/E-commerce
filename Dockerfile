# syntax=docker/dockerfile:1

FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/storefront/package.json ./apps/storefront/package.json

RUN npm ci --include=optional


FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/storefront/node_modules ./apps/storefront/node_modules

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run db:generate
RUN npm run build:store


FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/storefront/public ./apps/storefront/public

COPY --from=builder --chown=nextjs:nodejs \
  /app/apps/storefront/.next/standalone ./

COPY --from=builder --chown=nextjs:nodejs \
  /app/apps/storefront/.next/static \
  ./apps/storefront/.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "apps/storefront/server.js"]
