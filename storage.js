export const STORAGE_KEY = 'bridgeit:list:v1';

export function loadState(fallbackState) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallbackState;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed?.items) ? { items: parsed.items } : fallbackState;
  } catch {
    return fallbackState;
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items ?? [] }));
  } catch (err) {
    console.warn('BridgeIt storage save failed:', err);
  }
}

export function clearState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('BridgeIt storage clear failed:', err);
  }
}