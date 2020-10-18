var cacheName = 'playbook';
var filesToCache = [
  //'/',
  //'index.html',
  //'styles/style.css',
  //'js/js_phone.js',
  //'js/main.js',
  //'styles/style.css',
  'pictures/prikker.png',
  'pictures/share_icon_safari_blue.png',
  'pictures/christine_arrow2.png',
  'pictures/close.png',
  'pictures/hold-graa.png',
  'pictures/profil-graa.png',
  'pictures/hus-graa.png',
  'pictures/add-new.png',
  'pictures/hus-fyldt_old.png',
  'pictures/add-new-graa.png',
  'pictures/outline-valgt-hold.png',
  'pictures/outline-valgt-profil.png',


];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

