FROM ghcr.io/pnpm/pnpm:12.3.4 AS base
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_CLERK_TELEMETRY_DISABLED=1
ENV PATH=/usr/local/bin:/pnpm/bin:$PATH

WORKDIR /app
RUN pnpm runtime set node 24 -g && \
  useradd --create-home --shell /bin/sh app && \
  chown -R app:app /pnpm && \
  ln -s "$(cat /pnpm/bin/.pnpm-shim-v1-node-target)" /usr/local/bin/node

# Install dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml prisma.config.ts ./
COPY prisma prisma
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --frozen-lockfile

# Development image - will get the actual project files from bind mount
FROM base AS dev
WORKDIR /app
ARG NEXT_TELEMETRY_DISABLED
ENV NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED}
ARG NEXT_PUBLIC_CLERK_TELEMETRY_DISABLED
ENV NEXT_PUBLIC_CLERK_TELEMETRY_DISABLED=${NEXT_PUBLIC_CLERK_TELEMETRY_DISABLED}

COPY --from=deps --chown=app:app /app/package.json /app/pnpm-lock.yaml \
  /app/pnpm-workspace.yaml ./
COPY --from=deps --chown=app:app /app/node_modules ./node_modules
COPY --from=deps --chown=app:app /app/src/generated/prisma ./src/generated/prisma
RUN mkdir .next && chown -R app:app .next

USER app
EXPOSE 3000
ENV PORT=3000
CMD [ "pnpm", "dev" ]

# Build the source code for production
FROM base AS build
COPY --from=deps --chown=app:app /app/node_modules ./node_modules
COPY --from=deps --chown=app:app /app/src/generated/prisma ./src/generated/prisma
COPY . .
RUN pnpm build

# Production image - copy just the build files and run next
FROM base AS prod
WORKDIR /app
ENV NODE_ENV=production

RUN mkdir .next && chown -R app:app .next
COPY --from=build --chown=app:app /app/.next/standalone ./
COPY --from=build --chown=app:app /app/.next/static ./.next/static

USER app
EXPOSE 3000
ENV PORT=3000
CMD ["sh", "-c", "HOSTNAME='0.0.0.0' node server.js"]
