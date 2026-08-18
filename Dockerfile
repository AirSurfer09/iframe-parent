# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# Stage 1 — build the static export
# ---------------------------------------------------------------------------
FROM node:22-bookworm-slim AS builder

ENV PNPM_HOME=/pnpm
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Baked-in defaults. Every one of these can be overridden at container start via
# the matching runtime env var (EXP_ID, PIXEL_STREAM_BASE, ...) — see
# docker/20-convai-runtime-config.sh. Defaults point at Convai production.
ARG NEXT_PUBLIC_CLIENT_MODE=true
ARG NEXT_PUBLIC_EXP_ID=""
ARG NEXT_PUBLIC_PIXEL_STREAM_BASE="https://x.convai.com"
ARG NEXT_PUBLIC_SESSION_FETCH_URL="https://api.convai.com"
ARG NEXT_PUBLIC_END_USER_ID=""
ARG NEXT_PUBLIC_APP_TITLE="Convai Pixel Streaming"

ENV NEXT_PUBLIC_CLIENT_MODE=$NEXT_PUBLIC_CLIENT_MODE \
    NEXT_PUBLIC_EXP_ID=$NEXT_PUBLIC_EXP_ID \
    NEXT_PUBLIC_PIXEL_STREAM_BASE=$NEXT_PUBLIC_PIXEL_STREAM_BASE \
    NEXT_PUBLIC_SESSION_FETCH_URL=$NEXT_PUBLIC_SESSION_FETCH_URL \
    NEXT_PUBLIC_END_USER_ID=$NEXT_PUBLIC_END_USER_ID \
    NEXT_PUBLIC_APP_TITLE=$NEXT_PUBLIC_APP_TITLE \
    NEXT_TELEMETRY_DISABLED=1

RUN pnpm build

# The client deliverable ships the embed page only. Drop the leftover marketing
# routes, the sitemap advertising them, the Once UI trademark assets, and the
# ~20 MB of gallery/portfolio imagery that the embed never references.
RUN if [ "$NEXT_PUBLIC_CLIENT_MODE" = "true" ]; then \
      rm -rf dist/gallery.html dist/gallery.txt dist/gallery \
             dist/sitemap.xml dist/robots.txt dist/index.txt \
             dist/trademark dist/fonts && \
      find dist/images -type f ! -name 'convai-logo.png' -delete; \
    fi

# ---------------------------------------------------------------------------
# Stage 2 — serve it
# ---------------------------------------------------------------------------
FROM nginx:1.27-alpine AS runtime

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/20-convai-runtime-config.sh /docker-entrypoint.d/20-convai-runtime-config.sh
COPY --from=builder /app/dist /usr/share/nginx/html

RUN chmod +x /docker-entrypoint.d/20-convai-runtime-config.sh

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://127.0.0.1:8080/ >/dev/null || exit 1
