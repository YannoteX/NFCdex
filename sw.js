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
    '/assets/fonts/NotoSans_Condensed-Bold.ttf',
    '/assets/fonts/NotoSansSoraSompeng-Regular.ttf',
    '/assets/icons/PhoneScreen2.png',
    '/assets/icons/Pwa.svg',
    '/assets/logo/anim1.svg',
    '/assets/logo/Logo2.png',
    '/assets/logo/NFCdex_logo.png',
    '/assets/logo/Vector.png',
    '/assets/logo/Vector-1.png',
    '/assets/logo/Vector-2.png'
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
});