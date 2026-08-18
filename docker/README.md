# Convai Pixel Streaming — domain whitelisting test image

A single-page build of the Convai pixel streaming embed, packaged as a static site
behind nginx. It exists so you can host the embed on a domain you control and confirm
that domain has been whitelisted by Convai.

The page is deliberately minimal: a thin title bar and the embed, nothing else.

## Run it

```bash
docker run --rm -p 8080:8080 \
  -e EXP_ID=<your-experience-id> \
  convaieng/pixelstream-domain-test:latest
```

Then open <http://localhost:8080>.

To serve it from the domain being whitelisted, put it behind your own
reverse proxy / ingress and point that hostname at the container's port 8080.

## Configuration

All values are optional and are read **at container start**, so changing one only
needs a restart — never a rebuild. Anything left unset falls back to the value baked
into the image (Convai production).

| Variable            | Default                     | Purpose                                              |
| ------------------- | --------------------------- | ---------------------------------------------------- |
| `EXP_ID`            | *(baked in)*                | Experience ID to stream                              |
| `PIXEL_STREAM_BASE` | `https://x.convai.com`      | Pixel stream host                                    |
| `SESSION_FETCH_URL` | `https://api.convai.com`    | Session/API host                                     |
| `END_USER_ID`       | *(unset)*                   | Optional end-user identifier passed to the embed     |
| `APP_TITLE`         | `Convai Pixel Streaming`    | Text in the title bar and browser tab                |

Example against Convai staging:

```bash
docker run --rm -p 8080:8080 \
  -e EXP_ID=<your-experience-id> \
  -e PIXEL_STREAM_BASE=https://x-preview.convai.com \
  -e SESSION_FETCH_URL=https://api-preview.convai.com \
  convaieng/pixelstream-domain-test:latest
```

## What a successful whitelist looks like

If the origin serving the page is **not** whitelisted, the embed renders:

> Please contact convai to get `<your-origin>` whitelisted!

and the call to `<SESSION_FETCH_URL>/xp/streams/viewPublishedExperience` returns 500.
Once Convai has whitelisted the origin, the same page instead shows the
"Start Experience" screen and the stream connects on click.

Note that the whitelist is matched against the **origin the browser is on**
(scheme + host + port), so `http://localhost:8080` and `https://demo.example.com`
are separate entries.

## Notes

- The container listens on **8080** and runs nginx; no other services or state.
- The embed requires camera/microphone permissions, which browsers only grant on
  `https://` or `http://localhost`. Serving it over plain HTTP on a remote host will
  block voice interaction.

## Building it yourself

```bash
docker build -t convai-pixelstream-demo \
  --build-arg NEXT_PUBLIC_EXP_ID=<your-experience-id> \
  .
```

Convai publishes it with `./docker/publish.sh <tag>`.

Build args mirror the runtime variables but are prefixed `NEXT_PUBLIC_`
(`NEXT_PUBLIC_EXP_ID`, `NEXT_PUBLIC_PIXEL_STREAM_BASE`, `NEXT_PUBLIC_SESSION_FETCH_URL`,
`NEXT_PUBLIC_END_USER_ID`, `NEXT_PUBLIC_APP_TITLE`). Passing
`--build-arg NEXT_PUBLIC_CLIENT_MODE=false` builds the full internal demo page
instead of this stripped one.
