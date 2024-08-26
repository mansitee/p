
var cacheName = 'yt-pwa';

var filesToCache = [
  '/',
  '/index.html',
  '/aset/style.css',
  '/aset/main.js'
  '/ytrend.html',
];


self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});


self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});