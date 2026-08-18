/**
 * Build-time replacement for ClientHome in the stripped client build.
 *
 * next.config.js swaps `@/app/ClientHome` for this module when
 * NEXT_PUBLIC_CLIENT_MODE=true, so the integration guide, newsletter and the
 * rest of the internal demo page are never emitted into the client bundle —
 * not merely hidden at render time.
 */
export default function ClientHomeStub() {
  return null;
}
