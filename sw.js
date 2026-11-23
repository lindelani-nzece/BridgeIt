const CACHE_NAME = 'bridgelt-v1';
const ASSETS = [
  './',
  './index.html',
  './logic.js',
  './ui.js',
  './storage.js',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
