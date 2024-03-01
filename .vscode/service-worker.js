const CACHE_NAME = 'offline-cache-v1';
const urlsToCache = [
    '/',
    'index.html',
    'offline.html', // Add this line if you have an offline page
    'style.css',
    'script.js',
    // Add other URLs of your assets here
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
