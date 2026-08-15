# syntax=docker/dockerfile:1

FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/admin/package.json ./apps/admin/package.json

RUN npm ci --include=optional


FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/admin/node_modules ./apps/admin/node_modules

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run db:generate
RUN npm run build:admin


FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3001
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/admin/public ./apps/admin/public

COPY --from=builder --chown=nextjs:nodejs \
  /app/apps/admin/.next/standalone ./

COPY --from=builder --chown=nextjs:nodejs \
  /app/apps/admin/.next/static \
  ./apps/admin/.next/static

USER nextjs

EXPOSE 3001

CMD ["node", "apps/admin/server.js"]
