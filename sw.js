const CACHE_NAME = "notes-app-v2";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./10.png",
  "./0240dbc791523072799a4414ae04ef77.png",
  "./0cdb7da3b16e3a5b6dce9172471ab8d9.png",
  "./175df0ef78a7950195051cbe8b802c48.png",
  "./1e2bb1d7c565ec6626e72f4ddafa9f9a.png",
  "./21ee239ece1797f8588653784f967190.png",
  "./2577e0adbe7b99dab7de43f23576d1f4.png",
  "./268176928f6cd2ad9e5d0d9786b6cb84.png",
  "./36d0f29fbd09ab66855af5f4f179451c.png",
  "./42356b0aa5c2975a2148e3be47252938.png",
  "./4596bd677adbbca6a893f04cccd57da7.png",
  "./4a6b4a1055ed05f953235e857d62ecfd.png",
  "./506fc569e045c910dd2727bcdb855584.png",
  "./5493084f547ac1bea40ea83c42795111.png",
  "./6ae26ed6171fce956cc50e9364f2b3cd.png",
  "./74a0c9fef193240e047ee6d98c639b69.png",
  "./832d0dd97f5157cf3e78b8df13b95a90.png",
  "./887692acb5d782f4d5b091804a2dbb68.png",
  "./8d0f922727b1e71c7a3623b77156f75f.png",
  "./9be0cc1ac09bae7c855829f15da47b9c.png",
  "./a603ffb97fa99d8fcede7d5487c4d9ab.png",
  "./ab77a1ad858f943db04305a8c615e979.png",
  "./ba6eec9f7685709ab61de1c0e1f9c668.png",
  "./c2739b7e41a70ccd497ece854aa4266d.png",
  "./d5ed58be6bff9d2eba9bce90e3cc4afc.png",
  "./dabe474c4a5cf5f9d72205c6c991fd1d.png",
  "./ea2bf6879c8daee539868405ce34b88c.png"
];

// Install — cache everything
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate — remove old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — serve from cache first, fall back to network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
