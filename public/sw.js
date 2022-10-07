console.log("service worker running from public folder");

let cacheDataV2 = "appV2";

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheDataV2).then((cache) => {
      cache.addAll([
        // "http://localhost:3000/",
        "/favicon.ico",
        "/manifest.json",
        "/static/js/bundle.js",
        "/index.html",
        "/",
        "/about",
        "/users",
      ]);
    })
  );
});

this.addEventListener("fetch", (event) => {
  // NOTIFICATIONS

  // If User is OFFLINE then only serve data from service workers
  if (!navigator.onLine) {
    console.log("URl", event.request.url);
    if (event.request.url === "http://localhost:3000/manifest.json") {
      event.waitUntil(
        this.registration.showNotification("Offline", {
          body: "Check your Internet connection",
          icon: "https://e7.pngegg.com/pngimages/661/898/png-clipart-react-javascript-library-web-development-vue-js-funding-icon-logo-symmetry.png",
        })
      );
    }

    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) {
          return resp;
        }
        let requestUrl = event.request.clone();
        return fetch(requestUrl);
      })
    );
  }
});
