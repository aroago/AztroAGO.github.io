self.importScripts('data/signs.js');

// Files to cache
const cacheName = 'aztroCache';
const appShellFiles = [
  './index.html',
  './app.js',
  './style.css',
  './data/img/favicon.png',
  './dist/css/bootstrap.min.css',
  './dist/css/w3schools.css'
];
const signsImages = [];
const otherImages = [];
for (let i = 0; i < signs.length; i++) {
  signsImages.push(`data/img/${signs[i]}.svg`);
  otherImages.push(`data/img/bg-${signs[i]}.jpg`);
}
const firstContentToCache = appShellFiles.concat(signsImages);
const contentToCache =firstContentToCache.concat(otherImages);
// Installing Service Worker
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(contentToCache);
  })());
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) return r;
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});
