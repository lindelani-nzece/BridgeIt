AppLogic.auditPortability();

// Register Service Worker automatically when running on localhost or HTTPS
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => console.log('✅ PWA Offline Service Worker active'))
    .catch(err => console.warn('SW error:', err));
}

const input = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('itemList');

function render(state) {
  list.innerHTML = state.items.map(item => `
    <li data-id="${item.id}" style="padding: 8px 0; cursor: pointer; text-decoration: ${item.done ? 'line-through' : 'none'};">
      ${item.text}
    </li>
  `).join('');
}

// Load saved items on startup
const initialState = AppLogic.setItems(StorageAdapter.loadItems());
render(initialState);

addBtn.addEventListener('click', () => {
  const newState = AppLogic.addItem(input.value);
  StorageAdapter.saveItems(newState.items);
  input.value = '';
  render(newState);
});

list.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    const id = Number(e.target.dataset.id);
    const newState = AppLogic.toggleItem(id);
    StorageAdapter.saveItems(newState.items);
    render(newState);
  }
});
