FROM node:24.20.0-alpine3.23 AS base
ARG NEXT_TELEMETRY_DISABLED=1

# Install PNPM
FROM base AS pnpm
WORKDIR /app
COPY package.json ./
RUN npm install -g \
  "$(node -p 'require("./package.json").packageManager.split("+")[0]')"

# Install dependencies
FROM pnpm AS deps
WORKDIR /app

COPY --from=pnpm /app/package.json ./
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY prisma prisma
RUN pnpm i --frozen-lockfile

# Development image - will get the actual project files from bind mount
FROM pnpm AS dev
WORKDIR /app
ARG NEXT_TELEMETRY_DISABLED
ENV NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED}

COPY --from=deps /app/package.json /app/pnpm-lock.yaml \
  /app/pnpm-workspace.yaml ./
COPY --from=deps --chown=node:node /app/node_modules ./node_modules
RUN mkdir .next && chown -R node:node .next

USER node
EXPOSE 3000
ENV PORT=3000
CMD [ "pnpm", "dev" ]

# Build the source code for production
FROM pnpm AS builder
WORKDIR /app
ARG NEXT_TELEMETRY_DISABLED
ENV NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED}

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build; 

# Production image - copy just the build files and run next
FROM base AS prod
WORKDIR /app
ARG NEXT_TELEMETRY_DISABLED
ENV NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED}
ENV NODE_ENV=production

RUN mkdir .next && chown -R node:node .next
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000
ENV PORT=3000
CMD ["sh", "-c", "HOSTNAME='0.0.0.0' node server.js"]