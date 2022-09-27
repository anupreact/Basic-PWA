console.log("service worker running from public folder");
let cacheDataV1 = "appV1";

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheDataV1).then((cache) => {
      cache.addAll([
        "/static/js/bundle.js",
        "/index.html",
        "/",
        "/users",
        "/about",
        "/favicon.ico",
        "/manifest.json"
      ]);
    })
  );
});

this.addEventListener("fetch", (event) => {

    if(!navigator.onLine){
        event.respondWith(
          caches.match(event.request).then((result) => {
            if(result) {
              return result;
            }
            let requestUrl = event.request.clone()
            return fetch(requestUrl)
          })
        );
    }
});
