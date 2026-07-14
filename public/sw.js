/* BIALGRUZ service worker — cache po stronie klienta dla szybszych powrotów na stronę */
const CACHE = "bialgruz-v1";

// Instalacja — od razu aktywuj nową wersję
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

// Aktywacja — usuń stare wersje cache
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Tylko GET z tej samej domeny; pomijamy API i zewnętrzne (np. Supabase, Nominatim)
  if (req.method !== "GET" || url.origin !== self.location.origin) return;

  const isStatic =
    url.pathname.startsWith("/_next/static/") ||
    /\.(png|jpg|jpeg|gif|webp|avif|svg|ico|woff|woff2|css|js)$/.test(url.pathname);

  if (isStatic) {
    // Statyczne zasoby: cache-first (są wersjonowane / rzadko się zmieniają)
    event.respondWith(
      caches.open(CACHE).then(async (cache) => {
        const hit = await cache.match(req);
        if (hit) return hit;
        const res = await fetch(req);
        if (res.ok) cache.put(req, res.clone());
        return res;
      })
    );
    return;
  }

  // Strony (HTML): network-first, z fallbackiem do cache offline
  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const res = await fetch(req);
          const cache = await caches.open(CACHE);
          cache.put(req, res.clone());
          return res;
        } catch {
          const cached = await caches.match(req);
          return cached || Response.error();
        }
      })()
    );
  }
});
