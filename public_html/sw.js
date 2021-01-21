var cacheName = 'MyApp'
var cacheMaxAge = 3600000;

const dependencies = [
    '/src/styles/main.css',
    '/src/pages/signIn.html',
    '/src/pages/signup.html',
    '/index.html',
    '/src/includes/bootstrap/bootstrap.min.css',
    '/src/includes/bootstrap/bootstrap.bundle.min.js',
  ];
self.addEventListener('install', (event) => {
    console.log('Установлен');
    const loadDependencies = self.caches.open(cacheName)
      .then(cache => cache.addAll(dependencies));
    event.waitUntil(loadDependencies);
});

self.addEventListener('activate', (event) => {
    console.log('Активирован');
});
self.addEventListener('fetch', (event) => {
    event.respondWith(
        // ищем запрошенный ресурс среди закэшированных
        caches.match(event.request).then(function(cachedResponse) {
            var lastModified, fetchRequest;

            // если ресурс есть в кэше
            if (cachedResponse) {
                // получаем дату последнего обновления
                lastModified = new Date(cachedResponse.headers.get('last-modified'));
                // и если мы считаем ресурс устаревшим
                if (lastModified && (Date.now() - lastModified.getTime()) > cacheMaxAge) {
                    
                    fetchRequest = event.request.clone();
                    // создаём новый запрос
                    return fetch(fetchRequest).then(function(response) {
                        // при неудаче всегда можно выдать ресурс из кэша
                        if (!response || response.status !== 200) {
                            return cachedResponse;
                        }
                        // обновляем кэш
                        caches.open(cacheName).then(function(cache) {
                            console.log(response)
                            let clone = response.clone()
                            cache.put(event.request, clone);
                        });
                        // возвращаем свежий ресурс
                        return response;
                    }).catch(function() {
                        return cachedResponse;
                    });
                }
                return cachedResponse;
            }

            // запрашиваем из сети как обычно
            return fetch(event.request);
        })
    );
});