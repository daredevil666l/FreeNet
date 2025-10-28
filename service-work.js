/* FreeNet SW: офлайн‑оболочка + кэш тайлов (stale‑while‑revalidate) */
const CACHE_APP = 'freenet-app-v1';
const CACHE_TILES = 'freenet-tiles-v1';

const APP_SHELL = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.webmanifest',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE_APP);
    await cache.addAll(APP_SHELL);
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => ![CACHE_APP, CACHE_TILES].includes(k)).map(k => caches.delete(k)));
    self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // Карточные тайлы OSM — кладём в отдельный кэш, стратегия SWR
  const isTile = /tile\.openstreetmap\.org\/.+\.png$/.test(url.href);
  if (isTile) {
    e.respondWith((async () => {
      const cache = await caches.open(CACHE_TILES);
      const cached = await cache.match(e.request);
      const fetchPromise = fetch(e.request).then((res) => {
        cache.put(e.request, res.clone()).catch(()=>{});
        return res;
      }).catch(() => cached);
      return cached || fetchPromise;
    })());
    return;
  }

  // По умолчанию: offline‑first для оболочки
  e.respondWith((async () => {
    const cached = await caches.match(e.request);
    try {
      const res = await fetch(e.request);
      if (res && e.request.method === 'GET' && res.status === 200) {
        const cache = await caches.open(CACHE_APP);
        cache.put(e.request, res.clone()).catch(()=>{});
      }
      return res;
    } catch (err) {
      return cached || new Response('Offline', { status: 503, statusText: 'Offline' });
    }
  })());
});