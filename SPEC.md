# BridgeIt Protocol Specification (v1.0)

BridgeIt is a clean, structured pattern for building personal micro-apps that you can tailor to yourself and port to native platforms later if they grow. Under the hood, they are standard Progressive Web Apps (PWAs)—so they run instantly from your Home Screen without a developer license or App Store, and work offline out of the box.

---

## 1. How It Works

1. **Zero Build / Zero Dependencies:** Runs directly in the browser with standard ES modules (`<script type="module">`)—no bundlers or packages required.
2. **Offline-First:** Ships with a Web App Manifest and Service Worker so the app opens and works even without a connection.
3. **Full Capability, Clean Separation:** Apps can talk to APIs, home servers, or external services freely—just keep the core logic separate from the UI and storage:
   - **Brain (`logic.js`):** Pure state and state-transition functions.
   - **Bridge (`storage.js`):** Local persistence and external connections (localStorage, IndexedDB, APIs, home servers).
   - **Face (`ui.js` + `index.html` + `styles.css`):** Interface, layout, and user events.
4. **External Validator (`validate.mjs`):** Checks the file structure and makes sure `logic.js` stays free of browser-specific code so porting it later is straightforward.

---

## 2. The 8-File Structure

Every BridgeIt micro-app uses these 8 files at its root:

| File | Role | What It Does |
| :--- | :--- | :--- |
| `index.html` | Face | Page markup, meta tags, styles/manifest links, and module entry (`./ui.js`). |
| `styles.css` | Face | Layout, responsive styling, and theme variables. |
| `logic.js` | Brain | `initialState` and pure functions `(state, ...args) => nextState`. |
| `storage.js` | Bridge | Local persistence (`STORAGE_KEY`, `loadState`, `saveState`, `clearState`) and API/server sync. |
| `ui.js` | Face | Service worker setup, DOM rendering, and wiring user actions to state and storage. |
| `manifest.json` | Shell | Standalone app metadata (`name`, `short_name`, `start_url`, `display: "standalone"`, `icons`). |
| `sw.js` | Shell | Caches the 8 app files for offline use and clears outdated caches on update. |
| `icon.svg` | Shell | App icon referenced by `manifest.json` and `index.html`. |

---

## 3. Rules Per Layer

* **`logic.js` (Brain):** Exports `initialState` and pure functions that return a new state without mutating inputs. No `document`, `window`, `localStorage`, `indexedDB`, `fetch`, or `innerHTML`—keeping it clean to port to Swift or another native language later.
* **`storage.js` (Bridge):** Uses namespaced keys (`bridgeit:<app-slug>:v1`) and handles storage or network failures safely without breaking offline use.
* **`ui.js` (Face):** Imports from `./logic.js` and `./storage.js`, renders user text safely via DOM nodes (`textContent`), and registers `./sw.js` over HTTP/HTTPS.
* **`manifest.json` & `sw.js` (Shell):** `manifest.json` uses `"display": "standalone"` with relative paths; `sw.js` precaches all 8 files on `install` and cleans old caches on `activate`.

---

## 4. Validation

Run the validator outside the app folder:

```bash
node validate.mjs <path-to-app-directory>