import {
  initialState,
  addItem,
  toggleItem,
  deleteItem,
  clearCompleted
} from './logic.js';
import { loadState, saveState } from './storage.js';

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((err) => {
      console.warn('Service worker registration failed:', err);
    });
  });
}

const form = document.getElementById('itemForm');
const input = document.getElementById('itemInput');
const list = document.getElementById('itemList');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

let state = loadState(initialState);

function update(nextState) {
  state = nextState;
  saveState(state);
  render(state);
}

function render(currentState) {
  list.replaceChildren();

  for (const item of currentState.items) {
    const li = document.createElement('li');
    li.className = item.done ? 'item-row is-done' : 'item-row';

    const label = document.createElement('span');
    label.className = 'item-label';
    label.textContent = item.text;
    label.addEventListener('click', () => {
      update(toggleItem(state, item.id));
    });

    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'delete-btn';
    delBtn.setAttribute('aria-label', `Delete ${item.text}`);
    delBtn.textContent = '×';
    delBtn.addEventListener('click', () => {
      update(deleteItem(state, item.id));
    });

    li.append(label, delBtn);
    list.appendChild(li);
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  update(addItem(state, input.value));
  input.value = '';
  input.focus();
});

clearCompletedBtn.addEventListener('click', () => {
  update(clearCompleted(state));
});

render(state);