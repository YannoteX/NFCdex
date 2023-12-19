const CACHE_NAME = 'cool-cache';

// Add whichever assets you want to pre-cache here:
const PRECACHE_ASSETS = [
    '/assets/',
    '/css/',
    '/js/'
]

// Listener for the install event - pre-caches our assets list on service worker install.
self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        for (let i in PRECACHE_ASSETS){
            try {
                ok = await cache.add(i);
            } catch (err) {
                console.warn('sw: cache.add',i);
            }
        }
    })());
});