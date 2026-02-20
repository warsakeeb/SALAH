const CACHE_NAME = 'war-sakeeb-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './Adhan.mp3' // This ensures your audio file works offline too!
];

// 1. Install Phase: Download all files to the phone's cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Fetch Phase: If offline, serve the files from the cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return the offline response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
