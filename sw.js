const CACHE_NAME = 'war-sakeeb-vFINAL-GOATED'; // Changing this forces an update

self.addEventListener('install', (e) => {
    self.skipWaiting(); // Forces the new UI to take over immediately
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(keys.map((key) => caches.delete(key))); // Deletes the old UI memory
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(fetch(e.request)); // Ensures it always looks for fresh files
});
