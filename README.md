# BridgeIt

**BridgeIt** is a clean, structured pattern for building personal micro-apps that you can tailor to yourself and port to native platforms later if they grow. Under the hood, they are standard Progressive Web Apps (PWAs)—so they run instantly from your Home Screen without a developer license or App Store, and work offline out of the box.

## Why BridgeIt?

* **No Build Tools, No Dependencies:** Standard HTML, CSS, and ES modules (`<script type="module">`)—host it anywhere static files live.
* **Offline-First by Default:** Every app includes `manifest.json` and `sw.js` so it installs cleanly and works without a connection.
* **Full Capability, Clean Boundaries:** Connect to APIs, home servers, or external services freely while keeping pure state logic isolated from storage and DOM rendering:
  * **Brain (`logic.js`):** Pure state and state-transition functions.
  * **Bridge (`storage.js`):** Local persistence and external API/server sync.
  * **Face (`ui.js` + `index.html` + `styles.css`):** Interface, layout, and user events.
* **Ready to Scale:** Because `logic.js` contains zero browser or DOM APIs, porting your app's core logic to Swift/SwiftUI or Kotlin later is a clean translation instead of a rewrite.

---

## Project Layout

```text
├── index.html      # Face: markup, PWA meta tags, module entry
├── styles.css      # Face: layout, safe areas, theme tokens
├── logic.js        # Brain: initialState + pure transition functions
├── storage.js      # Bridge: local persistence & API/server sync
├── ui.js           # Face: service worker setup & DOM wiring
├── manifest.json   # Shell: standalone PWA metadata
├── sw.js           # Shell: offline asset caching
├── icon.svg        # Shell: scalable app icon
├── validate.mjs    # External guardrail script
├── SPEC.md         # Full protocol specification
└── AGENTS.md       # Instructions for AI coding agents