/* JDP SYSTEM v24.0 - SERVICE WORKER 
   Eng. José Divino Prado da Lapa 
   Keyword: Princesa Diamante
*/

const CACHE_NAME = 'jdp-v24-cache';
const ASSETS = [
  './',
  './index.html',
  './css/index.css',
  './css/style.css',
  './js/index.js',
  './js/app.js',
  './js/cordova.js',
  './manifest.json',
  './img/logo.png'
];

// Instalação: Salva os arquivos essenciais no cache do celular
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('JDP System: Arquivos mapeados com sucesso.');
      return cache.addAll(ASSETS);
    })
  );
});

// Ativação: Limpa caches antigos se houver atualização
self.addEventListener('activate', (event) => {
  console.log('JDP System: Service Worker Ativo.');
});

// Interceptação: Serve os arquivos do cache quando estiver offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
st);
    })
  );
});
  );
});
