/* eslint-disable no-restricted-globals */
self.addEventListener("install", function (event) {
  console.log("[Service Worker] Installing Service Worker ...", event);
  event.waitUntil(
    caches.open("static").then(function (cache) {
      console.log("[Service Worker] Precaching App Shell");
      cache.addAll([
        "/",
        "/index.html",
        "/src/js/app.js",
        "/src/css/app.css",
        "/images/logo.png",
      ]);
    })
  );
});

self.addEventListener("activate", function (event) {
  console.log("[Service Worker] Activating Service Worker ....", event);
  return self.clients.claim();
});

//Change residentt the url
// Dev:   http://localhost:3000/
// Prod: https://residentt.herokuapp.com/static/js/2.f407ea48.chunk.js
self.addEventListener("fetch", function (event) {
  if (!navigator.onLine) {
    if (
      // console.warn(event.request.url)
      event.request.url ===
      "https://residentt.herokuapp.com/static/js/2.f407ea48.chunk.js"
    ) {
      event.waitUntil(
        self.registration.showNotification("Internet", {
          body: "internet disconnected",
        })
      );
    }
  }

  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      } else {
        return fetch(event.request).then(function (res) {
          return caches.open("dynamic").then(function (cache) {
            cache.put(event.request.url, res.clone());
            return res;
          });
        });
      }
    })
  );
});
