#!/bin/sh
# Runs from /docker-entrypoint.d/ before nginx starts. Regenerates /config.js from
# environment variables on every container start. Empty or unset variables fall back
# to the values baked into the bundle at build time.
set -eu

CONFIG_FILE="/usr/share/nginx/html/config.js"

# JSON-escape a value so quotes/backslashes in an env var cannot break the file.
escape() {
  printf '%s' "$1" | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g'
}

cat > "$CONFIG_FILE" <<JS
// Generated at container start. Do not edit — changes are overwritten on restart.
window.__CONVAI_CONFIG__ = {
  expId: "$(escape "${EXP_ID:-}")",
  pixelStreamBase: "$(escape "${PIXEL_STREAM_BASE:-}")",
  sessionFetch: "$(escape "${SESSION_FETCH_URL:-}")",
  endUserId: "$(escape "${END_USER_ID:-}")",
  title: "$(escape "${APP_TITLE:-}")"
};
JS

echo "[convai-config] wrote $CONFIG_FILE"
cat "$CONFIG_FILE"
