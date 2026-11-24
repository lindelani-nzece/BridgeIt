# AGENTS.md

BridgeIt builds zero-dependency, offline-first personal micro-apps (PWAs) that keep core state logic clean enough to port to native platforms later. See `SPEC.md` for the full protocol specification.

## Project Map

Every BridgeIt micro-app consists of an exact 8-file bundle at the app root:
- `index.html` — Page markup, PWA meta tags, and `<script type="module" src="./ui.js">`.
- `styles.css` — Responsive layout, safe-area padding, and theme tokens.
- `logic.js` — `initialState` and pure state-transition functions `(state, ...args) => nextState`.
- `storage.js` — Local persistence (`bridgeit:<app-slug>:v1`) and external API/server sync.
- `ui.js` — Service worker registration, DOM rendering, and event wiring.
- `manifest.json` — Standalone PWA metadata (`"display": "standalone"`).
- `sw.js` — Offline precaching for all 8 bundle files and stale cache cleanup.
- `icon.svg` — Scalable vector app icon.

Root repository tooling & docs:
- `validate.mjs` — External compliance and purity validator.
- `SPEC.md` — Full BridgeIt v1.0 specification.
- `llms.txt` — Machine-readable index for LLM discovery.

## Architecture & Rules

- **Zero build / zero dependencies:** Use native browser ES modules only. Do not add bundlers, npm runtime packages, or external CDN scripts.
- **Keep `logic.js` 100% pure:** Never mutate input state, and never reference `document`, `window`, `localStorage`, `sessionStorage`, `indexedDB`, `fetch`, `alert`, or `innerHTML` inside `logic.js`.
- **Isolate side effects in `storage.js`:** Put all local persistence and network/API/home-server calls in `storage.js`, catching errors gracefully so offline usage never breaks.
- **Safe DOM rendering in `ui.js`:** Import from `./logic.js` and `./storage.js` via relative paths, render user-supplied strings with `textContent` (never unescaped `innerHTML`), and register `./sw.js` over HTTP/HTTPS.
- **Keep `sw.js` & `manifest.json` in sync:** Ensure `sw.js` precaches all 8 files on `install` and prunes outdated caches on `activate`.

## Verification

Before finishing any task that creates or modifies a BridgeIt app, run:

```bash
node validate.mjs <path-to-app-directory>