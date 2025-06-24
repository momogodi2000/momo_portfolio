// vite.config.js - Enhanced with PWA
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,webp,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheKeyWillBeUsed: async ({ request }) => {
                return `${request.url}?fontDisplay=swap`;
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          },
          {
            urlPattern: /^https:\/\/api\.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              },
              networkTimeoutSeconds: 10
            }
          }
        ]
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'MOMO GODI YVAN - Portfolio Professionnel',
        short_name: 'MOMO YVAN',
        description: 'Portfolio professionnel de MOMO GODI YVAN - Ingénieur en Génie Logiciel, Expert en développement web et mobile, Transformation digitale',
        theme_color: '#0284c7',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait-primary',
        categories: ['business', 'productivity', 'education'],
        lang: 'fr-FR',
        dir: 'ltr',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: 'apple-touch-icon-180x180.png',
            sizes: '180x180',
            type: 'image/png'
          }
        ],
        screenshots: [
          {
            src: 'screenshot-desktop.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide'
          },
          {
            src: 'screenshot-mobile.png',
            sizes: '375x667',
            type: 'image/png',
            form_factor: 'narrow'
          }
        ],
        shortcuts: [
          {
            name: 'Mes Projets',
            short_name: 'Projets',
            description: 'Voir tous mes projets',
            url: '/#projects',
            icons: [{ src: 'shortcut-projects.png', sizes: '96x96' }]
          },
          {
            name: 'Me Contacter',
            short_name: 'Contact',
            description: 'Formulaire de contact',
            url: '/#contact',
            icons: [{ src: 'shortcut-contact.png', sizes: '96x96' }]
          },
          {
            name: 'Blog',
            short_name: 'Blog',
            description: 'Lire mes articles',
            url: '/#blog',
            icons: [{ src: 'shortcut-blog.png', sizes: '96x96' }]
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  server: {
    port: 5173,
    host: true,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          icons: ['lucide-react'],
          three: ['three', '@react-three/fiber', '@react-three/drei']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react']
  }
})

// public/sw.js - Custom Service Worker
const CACHE_NAME = 'momo-yvan-portfolio-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
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
        return response || fetch(event.request);
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

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  try {
    const formData = await getStoredFormData();
    if (formData) {
      await submitContactForm(formData);
      await clearStoredFormData();
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Push notification handler
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nouvelle notification',
    icon: '/pwa-192x192.png',
    badge: '/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1'
    },
    actions: [
      {
        action: 'explore',
        title: 'Voir',
        icon: '/action-explore.png'
      },
      {
        action: 'close',
        title: 'Fermer',
        icon: '/action-close.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('MOMO YVAN Portfolio', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// src/utils/pwa.js - PWA utilities
export class PWAManager {
  constructor() {
    this.deferredPrompt = null;
    this.isInstalled = false;
    this.isSupported = 'serviceWorker' in navigator;
    
    this.init();
  }

  init() {
    if (!this.isSupported) return;

    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallPrompt();
    });

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      this.isInstalled = true;
      this.hideInstallPrompt();
      this.trackInstallation();
    });

    // Check if app is already installed
    this.checkIfInstalled();
  }

  async showInstallPrompt() {
    // Create install prompt UI
    const installBanner = document.createElement('div');
    installBanner.id = 'pwa-install-banner';
    installBanner.innerHTML = `
      <div class="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-primary-600 text-white p-4 rounded-lg shadow-lg z-50 transform transition-transform duration-300">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <h3 class="font-semibold mb-1">Installer l'app</h3>
            <p class="text-sm text-blue-100">Accédez rapidement à mon portfolio depuis votre écran d'accueil</p>
          </div>
          <div class="flex gap-2 ml-4">
            <button id="pwa-install-btn" class="bg-white text-primary-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100">
              Installer
            </button>
            <button id="pwa-dismiss-btn" class="text-blue-200 hover:text-white">
              ✕
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(installBanner);

    // Add event listeners
    document.getElementById('pwa-install-btn').addEventListener('click', () => {
      this.promptInstall();
    });

    document.getElementById('pwa-dismiss-btn').addEventListener('click', () => {
      this.hideInstallPrompt();
    });

    // Auto-hide after 10 seconds
    setTimeout(() => {
      this.hideInstallPrompt();
    }, 10000);
  }

  hideInstallPrompt() {
    const banner = document.getElementById('pwa-install-banner');
    if (banner) {
      banner.remove();
    }
  }

  async promptInstall() {
    if (!this.deferredPrompt) return;

    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    this.deferredPrompt = null;
    this.hideInstallPrompt();
  }

  checkIfInstalled() {
    // Check if running in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.isInstalled = true;
      return true;
    }

    // Check if running in PWA mode on iOS
    if (window.navigator.standalone === true) {
      this.isInstalled = true;
      return true;
    }

    return false;
  }

  trackInstallation() {
    // Track PWA installation with analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'pwa_install', {
        event_category: 'engagement',
        event_label: 'PWA Installation'
      });
    }
  }

  // Register for push notifications
  async registerForPushNotifications() {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return false;
    }

    let permission = Notification.permission;

    if (permission === 'default') {
      permission = await Notification.requestPermission();
    }

    if (permission === 'granted') {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(process.env.REACT_APP_VAPID_PUBLIC_KEY)
      });

      // Send subscription to server
      await this.sendSubscriptionToServer(subscription);
      return true;
    }

    return false;
  }

  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  async sendSubscriptionToServer(subscription) {
    // Send push subscription to your server
    try {
      await fetch('/api/push-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
      });
    } catch (error) {
      console.error('Failed to send subscription to server:', error);
    }
  }

  // Offline form handling
  async handleOfflineForm(formData) {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      // Store form data for background sync
      await this.storeFormData(formData);
      
      // Register background sync
      const registration = await navigator.serviceWorker.ready;
      await registration.sync.register('contact-form-sync');
      
      return true;
    }
    
    return false;
  }

  async storeFormData(formData) {
    localStorage.setItem('offline-form-data', JSON.stringify({
      ...formData,
      timestamp: Date.now()
    }));
  }

  async getStoredFormData() {
    const data = localStorage.getItem('offline-form-data');
    return data ? JSON.parse(data) : null;
  }

  async clearStoredFormData() {
    localStorage.removeItem('offline-form-data');
  }

  // Check online status
  isOnline() {
    return navigator.onLine;
  }

  // Listen for online/offline events
  setupOfflineHandling() {
    window.addEventListener('online', () => {
      this.showOnlineNotification();
    });

    window.addEventListener('offline', () => {
      this.showOfflineNotification();
    });
  }

  showOfflineNotification() {
    const notification = document.createElement('div');
    notification.id = 'offline-notification';
    notification.innerHTML = `
      <div class="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-orange-600 text-white p-4 rounded-lg shadow-lg z-50">
        <div class="flex items-center">
          <div class="flex-1">
            <h3 class="font-semibold">Mode hors ligne</h3>
            <p class="text-sm text-orange-100">Certaines fonctionnalités peuvent être limitées</p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(notification);
  }

  showOnlineNotification() {
    const offlineNotification = document.getElementById('offline-notification');
    if (offlineNotification) {
      offlineNotification.remove();
    }

    const notification = document.createElement('div');
    notification.innerHTML = `
      <div class="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50">
        <div class="flex items-center">
          <div class="flex-1">
            <h3 class="font-semibold">Connexion rétablie</h3>
            <p class="text-sm text-green-100">Toutes les fonctionnalités sont disponibles</p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

// src/hooks/usePWA.js - React hook for PWA
import { useState, useEffect } from 'react';
import { PWAManager } from '../utils/pwa';

export const usePWA = () => {
  const [pwaManager] = useState(() => new PWAManager());
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    setIsInstalled(pwaManager.checkIfInstalled());
    
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    pwaManager.setupOfflineHandling();
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [pwaManager]);

  return {
    isInstalled,
    isOnline,
    showInstallPrompt,
    promptInstall: () => pwaManager.promptInstall(),
    registerForPushNotifications: () => pwaManager.registerForPushNotifications(),
    handleOfflineForm: (formData) => pwaManager.handleOfflineForm(formData)
  };
};