const StorageAdapter = (() => {
  const KEY = 'bridgelt_items';

  function loadItems() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveItems(items) {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Storage failed:', e);
    }
  }

  return { loadItems, saveItems };
})();
