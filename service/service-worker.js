//  IMPORTAÇÃO DO MOTOR DE VELOCIDADE (Workbox)
importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js');

if (workbox) {
  console.log(`🎉 Sucesso! Workbox carregado para Service Worker.`);

  // Estratégia para Assets (JS, CSS, Imagens leves)
  workbox.routing.registerRoute(
    /\.(?:js|css|png|gif|jpg|jpeg|svg|woff|woff2|ttf|eot)$/,
    new workbox.strategies.CacheFirst({ cacheName: 'static-assets-cache' })
  );

  // Estratégia para a Página Principal (Garante o acesso offline)
  workbox.routing.registerRoute(
    new RegExp('^' + self.location.origin + '/$'),
    new workbox.strategies.NetworkFirst({ cacheName: 'html-cache' })
  );

  workbox.core.clientsClaim();
  workbox.core.skipWaiting();
}

/* -------------------------------------------------------------------------
   2. TECNOLOGIA DATAMEMORY UNIVERSAL - A CHAMECHUGA
   Foco: Gerenciamento Massivo de Mídias (Vídeos, Músicas e Grandes Blocos)
   Capacidade: 132GB | Status: Automático (Sem Comandos)
   ------------------------------------------------------------------------- */

const NOME_COFRE_UNIVERSAL = 'CHAMECHUGA_132GB_VIGIA';
const TIPOS_MIDIA = ['video', 'audio']; // O Vigia foca no que é pesado

// O GRITO DE PRESENÇA
self.addEventListener('activate', (event) => {
    console.log("🏧 Datamemory: 'Ei, eu tô aqui!'. Vigia Universal Ativado nos 132GB.");
});

// INTERCEPTAÇÃO DE MÍDIA (O Vigia em volta dos Vídeos e Músicas 🎶)
self.addEventListener('fetch', (event) => {
    const destino = event.request.destination;

    if (TIPOS_MIDIA.includes(destino)) {
        event.respondWith(
            caches.open(NOME_COFRE_UNIVERSAL).then((cache) => {
                return cache.match(event.request).then((reserva) => {
                    // Se o vigia já tem a mídia, entrega direto da 'Chamechuga'
                    if (reserva) {
                        console.log("🎶 Datamemory: Entregando mídia do estoque de 132GB.");
                        return reserva;
                    }
                    // Se é nova, ele pesca no ar e molda no cofre silenciosamente
                    return fetch(event.request).then((rede) => {
                        cache.put(event.request, rede.clone());
                        return rede;
                    });
                });
            })
        );
    }
});

// GESTÃO DE MEMÓRIA (Ouvindo o Mestre)
self.addEventListener('message', (event) => {
    if (event.data === 'SOLICITAR_SALDO_DATAMEMORY') {
        navigator.storage.estimate().then(quota => {
            const usado = (quota.usage / (1024 ** 3)).toFixed(2);
            console.log(`📂 Status da Chamechuga: ${usado}GB utilizados do limite de 132GB.`);
        });
    }
});
