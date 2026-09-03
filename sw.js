/* Service worker — makes the app open instantly and work with no internet.
   Bump CACHE when you change index.html so phones pick up the new version. */
var CACHE = "timetable-v1";
var ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){ return c.addAll(ASSETS); })
      .then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){ return k===CACHE ? null : caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(e){
  if(e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(function(hit){
      if(hit){
        // serve from cache, refresh it quietly in the background
        fetch(e.request).then(function(res){
          if(res && res.status===200) caches.open(CACHE).then(function(c){ c.put(e.request, res.clone()); });
        }).catch(function(){});
        return hit;
      }
      return fetch(e.request).then(function(res){
        if(res && res.status===200 && e.request.url.indexOf("http")===0){
          var copy = res.clone();
          caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
        }
        return res;
      }).catch(function(){ return caches.match("./index.html"); });
    })
  );
});
