
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