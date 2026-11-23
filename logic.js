const AppLogic = (() => {
  let state = { items: [] };

  function setItems(initialItems) {
    state.items = Array.isArray(initialItems) ? [...initialItems] : [];
    return getState();
  }

  function getState() {
    return { ...state };
  }

  function addItem(text) {
    const clean = text.trim();
    if (!clean) return getState();
    state.items = [...state.items, { id: Date.now(), text: clean, done: false }];
    return getState();
  }

  function toggleItem(id) {
    state.items = state.items.map(item =>
      item.id === id ? { ...item, done: !item.done } : item
    );
    return getState();
  }

  // === PWA-READY GUARDRAIL ===
  function auditPortability() {
    const forbidden = ['document.', 'window.', 'localStorage', 'sessionStorage', 'alert(', 'innerHTML'];
    const codeText = [setItems, getState, addItem, toggleItem].map(fn => fn.toString()).join('\n');
    const violations = forbidden.filter(word => codeText.includes(word));

    if (violations.length > 0 && typeof document !== 'undefined') {
      const banner = document.createElement('div');
      banner.style.cssText = 'background:#ff3b30;color:#fff;padding:10px;font-family:sans-serif;font-size:14px;position:fixed;top:0;left:0;right:0;z-index:9999;';
      banner.textContent = `⚠️ PORTABILITY WARNING in logic.js: Avoid browser-only APIs (${violations.join(', ')}). Move to ui.js or storage.js!`;
      document.body.prepend(banner);
    }
  }

  return { setItems, getState, addItem, toggleItem, auditPortability };
})();
