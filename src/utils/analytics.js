// src/utils/analytics.js

// Google Analytics 4 Configuration
let GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Changed from const to let

// Initialize Google Analytics
export const initGA = (measurementId = GA_MEASUREMENT_ID) => {
  if (typeof window === 'undefined') return;

  // Load Google Analytics script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  
  gtag('js', new Date());
  gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href,
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });

  // Update the global variable
  GA_MEASUREMENT_ID = measurementId;
};

// Track page views
export const trackPageView = (url, title) => {
  if (typeof window.gtag === 'undefined') return;
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title
  });
};

// Track custom events
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window.gtag === 'undefined') return;
  
  window.gtag('event', eventName, {
    event_category: parameters.category || 'engagement',
    event_label: parameters.label || '',
    value: parameters.value || 0,
    ...parameters
  });
};

// Predefined event trackers
export const trackButtonClick = (buttonName, section) => {
  trackEvent('button_click', {
    category: 'interaction',
    label: buttonName,
    section: section
  });
};

export const trackDownload = (fileName, section) => {
  trackEvent('file_download', {
    category: 'engagement',
    label: fileName,
    section: section
  });
};

export const trackExternalLink = (url, linkText) => {
  trackEvent('external_link_click', {
    category: 'navigation',
    label: linkText,
    url: url
  });
};

export const trackFormSubmission = (formName, success = true) => {
  trackEvent('form_submit', {
    category: 'form',
    label: formName,
    success: success
  });
};

export const trackProjectView = (projectName, category) => {
  trackEvent('project_view', {
    category: 'portfolio',
    label: projectName,
    project_category: category
  });
};

export const trackSectionView = (sectionName) => {
  trackEvent('section_view', {
    category: 'navigation',
    label: sectionName
  });
};

export const trackSearch = (searchTerm, resultsCount) => {
  trackEvent('search', {
    category: 'engagement',
    label: searchTerm,
    results_count: resultsCount
  });
};

export const trackContactMethod = (method) => {
  trackEvent('contact_attempt', {
    category: 'conversion',
    label: method
  });
};

export const trackSkillInteraction = (skillName, category) => {
  trackEvent('skill_interaction', {
    category: 'engagement',
    label: skillName,
    skill_category: category
  });
};

export const trackBlogRead = (articleTitle, readingTime) => {
  trackEvent('blog_read', {
    category: 'content',
    label: articleTitle,
    reading_time: readingTime
  });
};

export const trackLanguageChange = (fromLang, toLang) => {
  trackEvent('language_change', {
    category: 'personalization',
    from_language: fromLang,
    to_language: toLang
  });
};

export const trackThemeChange = (fromTheme, toTheme) => {
  trackEvent('theme_change', {
    category: 'personalization',
    from_theme: fromTheme,
    to_theme: toTheme
  });
};

// Performance tracking
export const trackPerformance = () => {
  if (typeof window === 'undefined' || !window.performance) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      const paint = performance.getEntriesByType('paint');
      
      // Track Core Web Vitals
      trackEvent('performance_timing', {
        category: 'performance',
        dom_load_time: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
        page_load_time: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
        first_paint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
        first_contentful_paint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0
      });
    }, 0);
  });
};

// Error tracking
export const trackError = (error, errorInfo = {}) => {
  trackEvent('javascript_error', {
    category: 'error',
    label: error.message || 'Unknown error',
    error_stack: error.stack || '',
    error_component: errorInfo.componentStack || '',
    fatal: errorInfo.fatal || false
  });
};

// User engagement tracking
export const trackUserEngagement = () => {
  let startTime = Date.now();
  let isActive = true;
  let totalActiveTime = 0;

  const updateActiveTime = () => {
    if (isActive) {
      totalActiveTime += Date.now() - startTime;
      startTime = Date.now();
    }
  };

  // Track when user becomes inactive
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      updateActiveTime();
      isActive = false;
    } else {
      startTime = Date.now();
      isActive = true;
    }
  });

  // Track engagement on page unload
  window.addEventListener('beforeunload', () => {
    updateActiveTime();
    
    trackEvent('user_engagement', {
      category: 'engagement',
      time_on_page: Math.round(totalActiveTime / 1000), // in seconds
      page_path: window.location.pathname
    });
  });

  // Track scroll depth
  let maxScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      
      // Track significant scroll milestones
      if ([25, 50, 75, 90].includes(scrollPercent)) {
        trackEvent('scroll_depth', {
          category: 'engagement',
          scroll_depth: scrollPercent,
          page_path: window.location.pathname
        });
      }
    }
  });
};

// Hotjar Configuration (optional)
export const initHotjar = (hjid, hjsv = 6) => {
  if (typeof window === 'undefined') return;

  (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:hjid,hjsv:hjsv};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
};

// Microsoft Clarity Configuration (optional)
export const initClarity = (clarityId) => {
  if (typeof window === 'undefined') return;

  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", clarityId);
};

// Facebook Pixel Configuration (optional)
export const initFacebookPixel = (pixelId) => {
  if (typeof window === 'undefined') return;

  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  
  window.fbq('init', pixelId);
  window.fbq('track', 'PageView');
};

// Cookie consent tracking
export const trackCookieConsent = (consentType) => {
  trackEvent('cookie_consent', {
    category: 'privacy',
    consent_type: consentType // 'accepted', 'declined', 'partial'
  });
};

// A/B Testing support
export const trackABTest = (testName, variant) => {
  trackEvent('ab_test', {
    category: 'experiment',
    test_name: testName,
    variant: variant
  });
};

// Newsletter signup tracking
export const trackNewsletterSignup = (source) => {
  trackEvent('newsletter_signup', {
    category: 'conversion',
    source: source
  });
};

// Social media tracking
export const trackSocialShare = (platform, content) => {
  trackEvent('social_share', {
    category: 'sharing',
    platform: platform,
    content_type: content
  });
};

// Initialize all analytics
export const initAllAnalytics = (config = {}) => {
  // Google Analytics
  if (config.ga4Id) {
    initGA(config.ga4Id); // Pass the ID directly to initGA
    trackPerformance();
    trackUserEngagement();
  }

  // Hotjar
  if (config.hotjarId) {
    initHotjar(config.hotjarId);
  }

  // Microsoft Clarity
  if (config.clarityId) {
    initClarity(config.clarityId);
  }

  // Facebook Pixel
  if (config.facebookPixelId) {
    initFacebookPixel(config.facebookPixelId);
  }

  // Error tracking
  window.addEventListener('error', (event) => {
    trackError(event.error || new Error(event.message), {
      fatal: false,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    trackError(new Error(event.reason), {
      fatal: false,
      type: 'unhandled_promise_rejection'
    });
  });
};

// React Hook for analytics
export const useAnalytics = () => {
  return {
    trackPageView,
    trackEvent,
    trackButtonClick,
    trackDownload,
    trackExternalLink,
    trackFormSubmission,
    trackProjectView,
    trackSectionView,
    trackSearch,
    trackContactMethod,
    trackSkillInteraction,
    trackBlogRead,
    trackLanguageChange,
    trackThemeChange,
    trackError,
    trackCookieConsent,
    trackABTest,
    trackNewsletterSignup,
    trackSocialShare
  };
};

// Export the current measurement ID getter
export const getCurrentGA4Id = () => GA_MEASUREMENT_ID;