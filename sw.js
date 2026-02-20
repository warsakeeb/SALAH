// I changed this to v2. This forces your phone to update the app!
const CACHE_NAME = 'war-sakeeb-cache-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './adhan.mp3' 
];

self.addEventListener('install', event => {
  // Force the new worker to activate immediately
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Delete old v1 cache so it doesn't get stuck anymore
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
