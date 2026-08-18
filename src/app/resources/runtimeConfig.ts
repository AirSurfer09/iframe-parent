/**
 * Resolves the Convai embed configuration.
 *
 * Precedence (highest first):
 *   1. Runtime  — `window.__CONVAI_CONFIG__`, injected by /config.js. In the Docker
 *                 image this file is regenerated from environment variables on every
 *                 container start, so the client can repoint the build without rebuilding.
 *   2. Build    — NEXT_PUBLIC_* variables inlined by Next at build time.
 *   3. Defaults — Convai production.
 *
 * Only call `resolveRuntimeConfig` from the browser (inside an effect). The build-time
 * prerender uses `buildTimeConfig`, so reading window during render would desync hydration.
 */

export interface ConvaiRuntimeConfig {
  expId: string;
  pixelStreamBase: string;
  sessionFetch: string;
  endUserId?: string;
  title: string;
}

const DEFAULTS: ConvaiRuntimeConfig = {
  expId: "",
  pixelStreamBase: "https://x.convai.com",
  sessionFetch: "https://api.convai.com",
  title: "Convai Pixel Streaming",
};

/** Values inlined at build time. Safe to read during server prerender. */
export const buildTimeConfig: ConvaiRuntimeConfig = {
  expId: process.env.NEXT_PUBLIC_EXP_ID || DEFAULTS.expId,
  pixelStreamBase:
    process.env.NEXT_PUBLIC_PIXEL_STREAM_BASE || DEFAULTS.pixelStreamBase,
  sessionFetch:
    process.env.NEXT_PUBLIC_SESSION_FETCH_URL || DEFAULTS.sessionFetch,
  endUserId: process.env.NEXT_PUBLIC_END_USER_ID || undefined,
  title: process.env.NEXT_PUBLIC_APP_TITLE || DEFAULTS.title,
};

/** True when the app is built as the stripped-down client deliverable. */
export const isClientMode = process.env.NEXT_PUBLIC_CLIENT_MODE === "true";

declare global {
  interface Window {
    __CONVAI_CONFIG__?: Partial<ConvaiRuntimeConfig>;
  }
}

/** Browser-only. Layers runtime overrides on top of the build-time values. */
export function resolveRuntimeConfig(): ConvaiRuntimeConfig {
  const injected = typeof window === "undefined" ? undefined : window.__CONVAI_CONFIG__;

  if (!injected) return buildTimeConfig;

  // An empty string means "not set" — the entrypoint emits those for unset env vars.
  const pick = (value: string | undefined, fallback: string) =>
    value && value.length > 0 ? value : fallback;

  return {
    expId: pick(injected.expId, buildTimeConfig.expId),
    pixelStreamBase: pick(injected.pixelStreamBase, buildTimeConfig.pixelStreamBase),
    sessionFetch: pick(injected.sessionFetch, buildTimeConfig.sessionFetch),
    endUserId: pick(injected.endUserId, buildTimeConfig.endUserId ?? "") || undefined,
    title: pick(injected.title, buildTimeConfig.title),
  };
}
