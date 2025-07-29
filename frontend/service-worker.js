const CACHE_NAME = 'agriassist-v3';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/youtube-refs.js',
  '/market-prices.js',
  '/manifest.json',
  '/assets/logo.png',
  '/assets/favicon.ico',
  '/assets/cultural-icon.png',
  '/assets/hero-bg.jpg',
  '/assets/about-image.jpg',
  '/assets/leaf-pattern.png',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// DEV MODE: Disable all caching for instant updates
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(cacheNames.map(c => caches.delete(c))))
  );
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
// END DEV MODE 