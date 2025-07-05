const CACHE_NAME = 'odia-dev-v1';
const urlsToCache = [
  '/',
  '/offline.html',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/lovable-uploads/52828145-16b7-41c0-b621-3e86b1e9b572.png',
  '/lovable-uploads/e4ecf514-3800-415c-b885-be4fdded4cc7.png',
  '/lovable-uploads/99c152aa-1d3c-4930-b657-e7b6c4797733.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        return fetch(event.request).catch(() => {
          // If fetch fails and it's a navigation request, return offline page
          if (event.request.destination === 'document') {
            return caches.match('/offline.html');
          }
        });
      }
    )
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Handle offline data synchronization
  return new Promise((resolve) => {
    // Sync any pending chat messages or form submissions
    resolve();
  });
}

// Push notifications (optional)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New message from ODIA.dev',
    icon: '/lovable-uploads/52828145-16b7-41c0-b621-3e86b1e9b572.png',
    badge: '/lovable-uploads/52828145-16b7-41c0-b621-3e86b1e9b572.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Open ODIA.dev',
        icon: '/lovable-uploads/52828145-16b7-41c0-b621-3e86b1e9b572.png'
      },
      {
        action: 'close',
        title: 'Close notification',
        icon: '/lovable-uploads/52828145-16b7-41c0-b621-3e86b1e9b572.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('ODIA.dev', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});