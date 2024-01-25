const CACHE_NAME = 'NFCdex-offline';

// Add whichever assets you want to pre-cache here:
const PRECACHE_ASSETS = [
    "/",
    'index.html',
    'js/NFC.js',
    'js/formValidate.js',
    'css/font.css',
    'css/media-queries.css',
    'css/style.css',
    'css/variables.css',
    'assets/fonts/pokemon-ds/pokemon-ds-font.ttf',
    'assets/icons/PhoneScreen2.webp',
    'assets/icons/PhoneScreen2.png',
    'assets/icons/Pwa.svg',
    'assets/icons/desktopMod.webp',
    'assets/logo/anim1.svg',
    'assets/logo/Logo2.webp',
    'assets/logo/NFCdex_logo.webp',
    'assets/PWA icons/icon-192x192.png',
    'assets/PWA icons/icon-256x256.png',
    'assets/PWA icons/icon-384x384.png',
    'assets/PWA icons/icon-512x512.png',
    'assets/PWA icons/maskable_icon_x512.png',
    'https://unpkg.com/aos@2.3.1/dist/aos.css'
]

// Listener for the install event - pre-caches our assets list on service worker install.
self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(PRECACHE_ASSETS);
        self.skipWainting();
    }));
});


self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});


self.addEventListener('fetch', event => {

    event.respondWith((async () => {

        const response = await caches.match(event.request);

        return response ? response : await fetch(event.request);
    }));
});