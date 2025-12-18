const STATIC_CACHE = 'static-v1';
const PAGE_CACHE = 'pages-v1';
const VALID_CACHES = [STATIC_CACHE, PAGE_CACHE];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(PAGE_CACHE).then((cache) => cache.addAll(['/', '/dashboard']))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches
        .keys()
        .then((keys) =>
          Promise.all(
            keys
              .filter((key) => !VALID_CACHES.includes(key))
              .map((key) => caches.delete(key))
          )
        ),
    ])
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.origin !== self.location.origin) return;

  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(pageStrategy(request));
    return;
  }

  event.respondWith(caches.match(request).then((res) => res || fetch(request)));
});

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  cache.put(request, response.clone());
  return response;
}

async function pageStrategy(request) {
  const cache = await caches.open(PAGE_CACHE);
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch {
    return cache.match(request) || caches.match('/');
  }
}
