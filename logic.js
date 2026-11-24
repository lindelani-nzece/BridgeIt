export const initialState = {
  items: []
};

export function createItem(text, id) {
  const cleanText = typeof text === 'string' ? text.trim() : '';
  if (!cleanText) return null;

  return {
    id: id ?? `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    text: cleanText,
    done: false
  };
}

export function addItem(state, text, id) {
  const currentItems = Array.isArray(state?.items) ? state.items : [];
  const nextItem = createItem(text, id);
  if (!nextItem) return { ...state, items: currentItems };

  return {
    ...state,
    items: [...currentItems, nextItem]
  };
}

export function toggleItem(state, id) {
  const currentItems = Array.isArray(state?.items) ? state.items : [];
  return {
    ...state,
    items: currentItems.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    )
  };
}

export function deleteItem(state, id) {
  const currentItems = Array.isArray(state?.items) ? state.items : [];
  return {
    ...state,
    items: currentItems.filter((item) => item.id !== id)
  };
}

export function clearCompleted(state) {
  const currentItems = Array.isArray(state?.items) ? state.items : [];
  return {
    ...state,
    items: currentItems.filter((item) => !item.done)
  };
}

export function remainingCount(state) {
  return (state?.items ?? []).filter((item) => !item.done).length;
}