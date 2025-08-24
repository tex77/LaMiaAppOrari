// Definisce un nome per la cache
const CACHE_NAME = 'orari-mensili-cache-v1';
// Lista dei file da mettere in cache per il funzionamento offline
const urlsToCache = [
  '/',
  '/index.html',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

// Evento 'install': si verifica quando il service worker viene installato
self.addEventListener('install', event => {
  // Aspetta che la cache venga aperta e che tutti i file siano aggiunti
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aperta');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento 'fetch': si verifica ogni volta che l'app richiede una risorsa
self.addEventListener('fetch', event => {
  event.respondWith(
    // Cerca la risorsa nella cache prima
    caches.match(event.request)
      .then(response => {
        // Se la risorsa è in cache, la restituisce
        if (response) {
          return response;
        }
        // Altrimenti, la richiede dalla rete
        return fetch(event.request);
      }
    )
  );
});
