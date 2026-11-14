'use strict';

// Populated at build time by tool/deploy_pages.py.
const CACHE_NAME = 'scoot-pwa-f9ae62cb8c14';
const PRECACHE_URLS = [
  "assets/AssetManifest.bin",
  "assets/AssetManifest.bin.json",
  "assets/FontManifest.json",
  "assets/NOTICES",
  "assets/assets/audio/chime_gentle.wav",
  "assets/assets/audio/chime_start.wav",
  "assets/assets/audio/song_cleanup_default.wav",
  "assets/assets/audio/tune_walk_marimba.wav",
  "assets/assets/audio/voice_cleanup_bright.mp3",
  "assets/assets/audio/voice_cleanup_upbeat.mp3",
  "assets/assets/audio/voice_cleanup_warm.mp3",
  "assets/assets/audio/voice_prepare_bright.mp3",
  "assets/assets/audio/voice_prepare_upbeat.mp3",
  "assets/assets/audio/voice_prepare_warm.mp3",
  "assets/assets/icons/actions/chime.png",
  "assets/assets/icons/actions/cleanup.png",
  "assets/assets/icons/actions/prepare.png",
  "assets/assets/icons/actions/walk_rotate.png",
  "assets/assets/icons/cubbies/apple.png",
  "assets/assets/icons/cubbies/bear.png",
  "assets/assets/icons/cubbies/bee.png",
  "assets/assets/icons/cubbies/bunny.png",
  "assets/assets/icons/cubbies/bus.png",
  "assets/assets/icons/cubbies/butterfly.png",
  "assets/assets/icons/cubbies/dino.png",
  "assets/assets/icons/cubbies/duck.png",
  "assets/assets/icons/cubbies/fox.png",
  "assets/assets/icons/cubbies/frog.png",
  "assets/assets/icons/cubbies/ladybug.png",
  "assets/assets/icons/cubbies/leaf.png",
  "assets/assets/icons/cubbies/octopus.png",
  "assets/assets/icons/cubbies/owl.png",
  "assets/assets/icons/cubbies/penguin.png",
  "assets/assets/icons/cubbies/rocket.png",
  "assets/assets/icons/cubbies/sailboat.png",
  "assets/assets/icons/cubbies/star.png",
  "assets/assets/icons/cubbies/strawberry.png",
  "assets/assets/icons/cubbies/sun.png",
  "assets/assets/icons/cubbies/train.png",
  "assets/assets/icons/cubbies/turtle.png",
  "assets/assets/icons/cubbies/whale.png",
  "assets/assets/icons/mascots/acorn.png",
  "assets/assets/icons/mascots/clover.png",
  "assets/assets/icons/mascots/crab.png",
  "assets/assets/icons/mascots/dolphin.png",
  "assets/assets/icons/mascots/dragonfly.png",
  "assets/assets/icons/mascots/elephant.png",
  "assets/assets/icons/mascots/giraffe.png",
  "assets/assets/icons/mascots/hedgehog.png",
  "assets/assets/icons/mascots/koala.png",
  "assets/assets/icons/mascots/lion.png",
  "assets/assets/icons/mascots/mushroom.png",
  "assets/assets/icons/mascots/otter.png",
  "assets/assets/icons/mascots/panda.png",
  "assets/assets/icons/mascots/rainbow.png",
  "assets/assets/icons/mascots/sloth.png",
  "assets/assets/icons/mascots/snail.png",
  "assets/assets/icons/stations/blocks.png",
  "assets/assets/icons/stations/books.png",
  "assets/assets/icons/stations/crafts.png",
  "assets/assets/icons/stations/music.png",
  "assets/assets/icons/stations/puzzles.png",
  "assets/assets/icons/stations/sensory.png",
  "assets/assets/icons/stations/water.png",
  "assets/assets/icons/stations/writing.png",
  "assets/assets/icons/steps/dry_rack.png",
  "assets/assets/icons/steps/glue.png",
  "assets/assets/icons/steps/listen.png",
  "assets/assets/icons/steps/markers.png",
  "assets/assets/icons/steps/paint.png",
  "assets/assets/icons/steps/read.png",
  "assets/assets/icons/steps/scissors.png",
  "assets/assets/icons/steps/sit.png",
  "assets/assets/icons/steps/smock.png",
  "assets/assets/icons/steps/stack.png",
  "assets/assets/icons/steps/tidy.png",
  "assets/assets/icons/steps/wash_hands.png",
  "assets/assets/icons/timers/hourglass_end.png",
  "assets/assets/icons/timers/hourglass_start.png",
  "assets/fonts/MaterialIcons-Regular.otf",
  "assets/fonts/fallback/Roboto-Regular.ttf",
  "assets/packages/cupertino_icons/assets/CupertinoIcons.ttf",
  "assets/packages/material_ui/shaders/ink_sparkle.frag",
  "assets/packages/wakelock_plus/assets/no_sleep.js",
  "assets/shaders/ink_sparkle.frag",
  "assets/shaders/stretch_effect.frag",
  "canvaskit/canvaskit.js",
  "canvaskit/canvaskit.wasm",
  "canvaskit/chromium/canvaskit.js",
  "canvaskit/chromium/canvaskit.wasm",
  "favicon.png",
  "flutter.js",
  "flutter.js.map",
  "flutter_bootstrap.js",
  "icons/Icon-192.png",
  "icons/Icon-512.png",
  "icons/Icon-maskable-192.png",
  "icons/Icon-maskable-512.png",
  "index.html",
  "main.dart.js",
  "manifest.json",
  "version.json"
];

const isConfigured =
  !CACHE_NAME.startsWith('__') &&
  Array.isArray(PRECACHE_URLS) &&
  PRECACHE_URLS.length > 0;

function scopeUrl(relativePath) {
  return new URL(relativePath, self.registration.scope).toString();
}

self.addEventListener('install', (event) => {
  if (!isConfigured) {
    self.skipWaiting();
    return;
  }

  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const queue = [...PRECACHE_URLS];
      const concurrency = 6;
      const workers = Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
        while (queue.length > 0) {
          const path = queue.shift();
          const url = scopeUrl(path);
          const response = await fetch(new Request(url, { cache: 'reload' }));
          if (!response.ok) {
            throw new Error(`Failed to precache ${url}: ${response.status}`);
          }
          await cache.put(url, response);
        }
      });
      await Promise.all(workers);
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key.startsWith('scoot-pwa-') && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

async function buildRangeResponse(response, rangeHeader) {
  const match = /bytes=(\d*)-(\d*)/.exec(rangeHeader);
  if (!match || (!match[1] && !match[2])) {
    return response;
  }
  const buffer = await response.arrayBuffer();
  const total = buffer.byteLength;
  let start;
  let end;
  if (!match[1]) {
    const suffixLength = Number.parseInt(match[2], 10);
    if (total === 0 || Number.isNaN(suffixLength) || suffixLength <= 0) {
      return new Response(null, {
        status: 416,
        statusText: 'Range Not Satisfiable',
        headers: { 'Content-Range': `bytes */${total}` },
      });
    }
    start = Math.max(0, total - suffixLength);
    end = total - 1;
  } else {
    start = Number.parseInt(match[1], 10);
    end = match[2] ? Math.min(Number.parseInt(match[2], 10), total - 1) : total - 1;
  }
  if (total === 0 || Number.isNaN(start) || Number.isNaN(end) || start > end || start >= total) {
    return new Response(null, {
      status: 416,
      statusText: 'Range Not Satisfiable',
      headers: { 'Content-Range': `bytes */${total}` },
    });
  }
  const headers = new Headers(response.headers);
  headers.delete('Content-Encoding');
  headers.set('Accept-Ranges', 'bytes');
  headers.set('Content-Range', `bytes ${start}-${end}/${total}`);
  headers.set('Content-Length', String(end - start + 1));
  return new Response(buffer.slice(start, end + 1), {
    status: 206,
    statusText: 'Partial Content',
    headers,
  });
}

self.addEventListener('fetch', (event) => {
  if (!isConfigured || event.request.method !== 'GET') {
    return;
  }

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) {
    return;
  }
  if (requestUrl.pathname === new URL('sw.js', self.registration.scope).pathname) {
    return;
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const rangeHeader = event.request.headers.get('range');

      // Normalize the scope root ("/") to index.html so both paths resolve offline.
      const lookupUrl =
        requestUrl.pathname === new URL(self.registration.scope).pathname
          ? scopeUrl('index.html')
          : event.request.url;

      let cached = await cache.match(lookupUrl, { ignoreSearch: true });
      if (!cached && event.request.mode === 'navigate') {
        cached = await cache.match(scopeUrl('index.html'));
      }
      if (cached) {
        return rangeHeader ? buildRangeResponse(cached, rangeHeader) : cached;
      }

      const networkResponse = await fetch(event.request);
      if (networkResponse.ok && networkResponse.type === 'basic' && !rangeHeader) {
        await cache.put(lookupUrl, networkResponse.clone());
      }
      return networkResponse;
    })()
  );
});
