

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
