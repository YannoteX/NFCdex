const CACHE_NAME = 'NFCdex-offline';

// Add whichever assets you want to pre-cache here:
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/js/NFC.js',
    '/js/formValidate.js',
    '/css/font.css',
    '/css/media-queries.css',
    '/css/style.css',
    '/css/variables.css',
    '/assets/fonts/pokemon-ds/pokemon-ds-font.ttf',
    '/assets/icons/PhoneScreen2.png',
    '/assets/icons/Pwa.svg',
    '/assets/logo/anim1.svg',
    '/assets/logo/Logo2.png',
    '/assets/logo/NFCdex_logo.png', s
]

// Listener for the install event - pre-caches our assets list on service worker install.
self.addEventListener('install', event => {
    event.waitUntil((async () => {
        caches.open(CACHE_NAME).then(cache => {
            cache.addAll(PRECACHE_ASSETS);
        });
    }));
});


self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});


self.addEventListener('fetch', event => {

    event.respondWith((async () => {

        const r = await caches.match(event.request);

        if (r) {
            return r;
        }

        const response = await fetch(e.request);
        const cache = await caches.open(cacheName);

        cache.put(e.request, response.clone());

        return response
    }));
});