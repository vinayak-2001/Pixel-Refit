const staticDevCoffee = "pixel-refit-v1"
const assets = [
    "/",
    "/index.html",
    "/style.css",
    "/script.js",
    "/pexels-alexas-fotos-2255441.jpg",
    "/manifest.json",
    "/images/icons/icon-192x192.png",
    "/images/icons/icon-256x256.png",
    "/images/icons/icon-384x384.png",
    "/images/icons/icon-512x512.png",
    "https://fonts.googleapis.com/css2?family=Staatliches&display=swap",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticPixelRefit).then(cache => {
            cache.addAll(assets)
        })
    )
})
self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})