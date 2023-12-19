const CACHE_NAME = 'cool-cache';

// Add whichever assets you want to pre-cache here:
const PRECACHE_ASSETS = [
    '/assets/fonts/NotoSans_Condensed-Bold.ttf',
]

// Listener for the install event - pre-caches our assets list on service worker install.
self.addEventListener('install', event => {
    event.waitUntil((async () => {
        caches.open(CACHE_NAME).then(cache => {
            for (let i in PRECACHE_ASSETS){
                return cache.addAll(PRECACHE_ASSETS);
            }
        });
    }));
});