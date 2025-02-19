var cacheName = 'pwa-daskapital';
var filesToCache = [
  //'/',
  //'/index.html',
  //'/css/style.css',
  //'/js/main.js',
  'images/bg1.jpg',
  'js/drawdown.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
