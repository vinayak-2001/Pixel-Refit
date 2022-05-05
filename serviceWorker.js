const staticDevCoffee = "pixel-refit-v1";
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",

  "/site.webmanifest",
  "/images/icons/android-chrome-192x192.png",
  "/images/icons/android-chrome-512x512.png",
  "/images/icons/apple-touch-icon.png",
  "/images/icons/favicon-16x16.png",
  "/images/icons/favicon-32x32.png",
  "https://fonts.googleapis.com/css2?family=Fredoka+One&family=Teko:wght@300&display=swap",
];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches
      .open(staticDevCoffee)
      .then((cache) => {
        cache.addAll(assets);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      if (res) return res;
      else {
        return fetch(fetchEvent.request)
          .then((res) => {
            return caches.open(staticDevCoffee).then((cache) => {
              cache.put(fetchEvent.request.url, res.clone());
              return res;
            });
          })
          .catch((err) => {
            console.log(err);
          }); // end of fetch
      }
    })
  );
});
