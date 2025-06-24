import React, { useState, useEffect, useContext, createContext, Suspense, lazy } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Menu, X, ChevronDown, Mail, Phone, MapPin, Linkedin, Github, ExternalLink,
  Download, Code, Database, Smartphone, Server, Award, Briefcase, GraduationCap,
  Users, Globe, Heart, Star, Calendar, CheckCircle, Filter, Search, MessageCircle,
  Sun, Moon, Languages, Eye, ArrowRight, Play, Pause, Volume2, VolumeX,
  Instagram, Twitter, Facebook, Youtube, Zap, Sparkles, Rocket, Target,
  TrendingUp, BarChart3, PieChart, Activity, Clock, BookOpen, FileText,
  Camera, Video, Image, Layers, Palette, Cpu, Cloud, Shield, Lock,
  Smartphone as Mobile, Tablet, Monitor, Headphones, Coffee, Pizza,
  Send, CheckCircle2, AlertCircle, User, Building, MessageSquare,
  Copy, Check, Wifi, WifiOff, Loader2, Settings, Bell, Home
} from 'lucide-react';

// Lazy load components for better performance
const EnhancedContactForm = lazy(() => import('./contact/EnhancedContactForm'));
const Gallery = lazy(() => import('./gallery/GalleryComponents'));
const BlogSection = lazy(() => import('./blog/BlogComponents'));
const ThreeDScene = lazy(() => import('./3d/ThreeDComponents'));

// Context for theme and language
const ThemeContext = createContext();
const LanguageContext = createContext();
const AnalyticsContext = createContext();

// Theme Provider with system preference detection
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    
    // Track theme change
    if (typeof gtag !== 'undefined') {
      gtag('event', 'theme_change', {
        event_category: 'user_preference',
        from_theme: theme,
        to_theme: newTheme
      });
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Language Provider with enhanced features
const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('language');
      if (stored) return stored;
      const browserLang = navigator.language.split('-')[0];
      return ['fr', 'en'].includes(browserLang) ? browserLang : 'fr';
    }
    return 'fr';
  });

  const changeLanguage = (lang) => {
    const oldLang = language;
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    
    // Track language change
    if (typeof gtag !== 'undefined') {
      gtag('event', 'language_change', {
        event_category: 'user_preference',
        from_language: oldLang,
        to_language: lang
      });
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, availableLanguages: ['fr', 'en'] }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Analytics Provider
const AnalyticsProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    // Online/offline detection
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // PWA install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Initialize analytics
    if (typeof gtag !== 'undefined') {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: document.title,
        page_location: window.location.href
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const trackEvent = (eventName, parameters = {}) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        event_category: parameters.category || 'engagement',
        event_label: parameters.label || '',
        value: parameters.value || 0,
        ...parameters
      });
    }
  };

  const installPWA = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      trackEvent('pwa_install_prompt', { outcome });
      setInstallPrompt(null);
    }
  };

  return (
    <AnalyticsContext.Provider value={{ 
      isOnline, 
      installPrompt, 
      installPWA, 
      trackEvent 
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

// Enhanced translations with more content
const translations = {
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      skills: 'Compétences',
      experience: 'Expérience',
      projects: 'Projets',
      blog: 'Blog',
      gallery: 'Galerie',
      education: 'Formation',
      contact: 'Contact',
      resume: 'CV'
    },
    hero: {
      title: 'MOMO GODI YVAN',
      subtitle: 'Ingénieur en Génie Logiciel | Développeur Web & Mobile | Expert en Transformation Digitale',
      description: 'Passionné par l\'innovation technologique au service du développement local camerounais',
      cta1: 'Me Contacter',
      cta2: 'Voir Mes Projets',
      cta3: 'Télécharger CV',
      location: 'Yaoundé, Cameroun',
      availability: 'Disponible Mondialement',
      status: 'En ligne'
    },
    about: {
      title: 'À Propos de Moi',
      subtitle: 'Innovation • Expertise • Impact',
      description1: 'Ingénieur en génie logiciel diplômé de l\'IAI Cameroun, parfaitement bilingue (français/anglais), spécialisé en développement web et mobile avec une approche centrée sur l\'innovation et l\'impact social.',
      description2: 'Expert en transformation digitale avec une expérience confirmée dans la digitalisation d\'organisations communautaires et la formation numérique. Professeur de Karaté Wado Ryu, je conjugue discipline martiale et excellence technologique.',
      years: 'Années d\'Expérience',
      projects: 'Projets Réalisés',
      women: 'Femmes Formées',
      languages: 'Langues Maîtrisées'
    },
    skills: {
      title: 'Compétences Techniques',
      subtitle: 'Maîtrise complète de l\'écosystème de développement moderne',
      programming: 'Langages',
      frameworks: 'Frameworks',
      databases: 'Bases de Données',
      tools: 'Outils & DevOps',
      level: 'Niveau',
      experience: 'ans d\'expérience'
    },
    projects: {
      title: 'Projets & Réalisations',
      subtitle: 'Découvrez mes dernières créations et innovations technologiques',
      viewDetails: 'Voir les détails',
      viewCode: 'Voir le code',
      viewDemo: 'Voir la démo',
      technologies: 'Technologies utilisées',
      features: 'Fonctionnalités clés',
      status: 'Statut',
      progress: 'Progression',
      noResults: 'Aucun projet trouvé'
    },
    blog: {
      title: 'Blog & Articles',
      subtitle: 'Mes réflexions sur la technologie, le développement et l\'innovation en Afrique',
      readMore: 'Lire l\'article',
      readTime: 'min de lecture',
      featured: 'À la une',
      viewAll: 'Voir tous les articles'
    },
    contact: {
      title: 'Contactez-Moi',
      subtitle: 'Prêt à collaborer sur votre prochain projet ? N\'hésitez pas à me contacter !',
      email: 'Envoyer un Email',
      whatsapp: 'WhatsApp',
      call: 'Appeler',
      availability: 'Disponibilité',
      services: 'Services',
      response: 'Réponse sous 24h',
      remote: 'Travail à distance possible',
      newProjects: 'Disponible pour nouveaux projets'
    },
    footer: {
      description: 'Ingénieur en Génie Logiciel passionné par l\'innovation technologique en Afrique.',
      navigation: 'Navigation',
      services: 'Services',
      contact: 'Contact',
      rights: 'Tous droits réservés.',
      madeWith: 'Développé avec ❤️ utilisant React.js, Framer Motion & Tailwind CSS'
    },
    common: {
      loading: 'Chargement...',
      error: 'Une erreur s\'est produite',
      tryAgain: 'Réessayer',
      close: 'Fermer',
      open: 'Ouvrir',
      menu: 'Menu',
      search: 'Rechercher...',
      filter: 'Filtrer',
      all: 'Tout',
      install: 'Installer l\'app',
      share: 'Partager',
      copy: 'Copier',
      copied: 'Copié !',
      online: 'En ligne',
      offline: 'Hors ligne'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      experience: 'Experience',
      projects: 'Projects',
      blog: 'Blog',
      gallery: 'Gallery',
      education: 'Education',
      contact: 'Contact',
      resume: 'Resume'
    },
    hero: {
      title: 'MOMO GODI YVAN',
      subtitle: 'Software Engineer | Web & Mobile Developer | Digital Transformation Expert',
      description: 'Passionate about technological innovation serving local Cameroonian development',
      cta1: 'Contact Me',
      cta2: 'View My Projects',
      cta3: 'Download Resume',
      location: 'Yaoundé, Cameroon',
      availability: 'Available Worldwide',
      status: 'Online'
    },
    about: {
      title: 'About Me',
      subtitle: 'Innovation • Expertise • Impact',
      description1: 'Software engineer graduated from IAI Cameroon, perfectly bilingual (French/English), specialized in web and mobile development with an approach focused on innovation and social impact.',
      description2: 'Digital transformation expert with proven experience in digitalizing community organizations and digital training. Karate Wado Ryu instructor, I combine martial discipline with technological excellence.',
      years: 'Years of Experience',
      projects: 'Projects Completed',
      women: 'Women Trained',
      languages: 'Languages Mastered'
    },
    skills: {
      title: 'Technical Skills',
      subtitle: 'Complete mastery of the modern development ecosystem',
      programming: 'Languages',
      frameworks: 'Frameworks',
      databases: 'Databases',
      tools: 'Tools & DevOps',
      level: 'Level',
      experience: 'years of experience'
    },
    projects: {
      title: 'Projects & Achievements',
      subtitle: 'Discover my latest creations and technological innovations',
      viewDetails: 'View details',
      viewCode: 'View code',
      viewDemo: 'View demo',
      technologies: 'Technologies used',
      features: 'Key features',
      status: 'Status',
      progress: 'Progress',
      noResults: 'No projects found'
    },
    blog: {
      title: 'Blog & Articles',
      subtitle: 'My thoughts on technology, development and innovation in Africa',
      readMore: 'Read article',
      readTime: 'min read',
      featured: 'Featured',
      viewAll: 'View all articles'
    },
    contact: {
      title: 'Contact Me',
      subtitle: 'Ready to collaborate on your next project? Feel free to reach out!',
      email: 'Send Email',
      whatsapp: 'WhatsApp',
      call: 'Call',
      availability: 'Availability',
      services: 'Services',
      response: 'Response within 24h',
      remote: 'Remote work possible',
      newProjects: 'Available for new projects'
    },
    footer: {
      description: 'Software Engineer passionate about technological innovation in Africa.',
      navigation: 'Navigation',
      services: 'Services',
      contact: 'Contact',
      rights: 'All rights reserved.',
      madeWith: 'Developed with ❤️ using React.js, Framer Motion & Tailwind CSS'
    },
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      tryAgain: 'Try again',
      close: 'Close',
      open: 'Open',
      menu: 'Menu',
      search: 'Search...',
      filter: 'Filter',
      all: 'All',
      install: 'Install app',
      share: 'Share',
      copy: 'Copy',
      copied: 'Copied!',
      online: 'Online',
      offline: 'Offline'
    }
  }
};

// Custom hooks
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) throw new Error('useAnalytics must be used within AnalyticsProvider');
  return context;
};

// Enhanced project data
const enhancedProjects = [
  {
    id: 1,
    title: "EAT FAST",
    description: "Application de livraison de nourriture 100% Camerounaise",
    longDescription: "Plateforme complète de livraison de repas conçue spécifiquement pour le marché camerounais, intégrant les solutions de paiement mobile money et la géolocalisation adaptée aux réalités locales.",
    period: "Avril 2025 - Présent",
    status: "En développement",
    progress: 75,
    tech: ["React.js", "Django REST", "PostgreSQL", "React Native", "Mobile Money API", "Redis"],
    features: [
      "Géolocalisation intégrée adaptée aux villes camerounaises",
      "Paiement mobile money (Orange Money, MTN MoMo)",
      "Interface multilingue (français/anglais)",
      "Notifications push en temps réel",
      "Système de tracking de commandes intelligent",
      "Dashboard analytics pour restaurants",
      "Mode hors ligne pour zones à faible connectivité",
      "Optimisation pour les connexions 2G/3G"
    ],
    category: "Mobile App",
    type: "Personal Project",
    github: "https://github.com/momoyvan/eat-fast",
    demo: "https://eat-fast-demo.vercel.app",
    images: [
      "data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='600' fill='%23f0f9ff'/%3E%3Ctext x='400' y='300' text-anchor='middle' fill='%230284c7' font-size='24' font-family='Arial'%3EEAT FAST - App Screenshot%3C/text%3E%3C/svg%3E"
    ],
    highlights: [
      "Interface optimisée pour le marché africain",
      "Intégration native des systèmes de paiement locaux",
      "Performance adaptée aux connexions limitées"
    ]
  },
  {
    id: 2,
    title: "Portfolio Professionnel Django",
    description: "Site web responsive moderne avec CMS intégré",
    longDescription: "Portfolio personnel développé avec Django, incluant un système de gestion de contenu complet, optimisation SEO avancée et analytics intégrés.",
    period: "2024",
    status: "Terminé",
    progress: 100,
    tech: ["Django", "Bootstrap", "JavaScript", "PostgreSQL", "Redis", "Celery"],
    features: [
      "CMS personnalisé pour blog",
      "Optimisation SEO avancée",
      "Analytics en temps réel",
      "Interface d'administration intuitive",
      "Cache Redis pour performance",
      "Tâches asynchrones avec Celery"
    ],
    category: "Web Application",
    type: "Personal Project",
    github: "https://github.com/momoyvan/django-portfolio",
    demo: "https://momoyvan-porfoloi.onrender.com",
    images: [
      "data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='600' fill='%23f8fafc'/%3E%3Ctext x='400' y='300' text-anchor='middle' fill='%230369a1' font-size='24' font-family='Arial'%3EDjango Portfolio%3C/text%3E%3C/svg%3E"
    ]
  },
  {
    id: 3,
    title: "Radio Flambou Banka - Digital Platform",
    description: "Transformation digitale complète d'une radio communautaire",
    longDescription: "Digitalisation complète d'une radio communautaire rurale avec streaming web, gestion de contenu et engagement communautaire.",
    period: "Juin 2025 - Présent",
    status: "En cours",
    progress: 80,
    tech: ["React.js", "Node.js", "Socket.io", "FFmpeg", "AWS S3"],
    features: [
      "Streaming audio en temps réel",
      "Gestion de programmes",
      "Chat communautaire",
      "Podcast automatisé",
      "App mobile native",
      "Dashboard analytics"
    ],
    category: "Web Platform",
    type: "Professional Project",
    github: "https://github.com/momoyvan/radio-platform",
    demo: "https://radio-flambou.cm",
    images: [
      "data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='600' fill='%23ecfdf5'/%3E%3Ctext x='400' y='300' text-anchor='middle' fill='%23059669' font-size='24' font-family='Arial'%3ERadio Platform%3C/text%3E%3C/svg%3E"
    ]
  },
  {
    id: 4,
    title: "ONG PROTEGE QV - Formation Platform",
    description: "Plateforme e-learning pour la formation numérique des femmes",
    longDescription: "Système complet de formation en ligne avec tracking des progrès, certificats automatisés et outils collaboratifs.",
    period: "Janvier 2025 - Présent",
    status: "Production",
    progress: 100,
    tech: ["Laravel", "Vue.js", "MySQL", "WebRTC", "Stripe"],
    features: [
      "Cours interactifs multimédia",
      "Vidéoconférences intégrées",
      "Système de certification",
      "Tracking des progrès",
      "Forum communautaire",
      "Paiements sécurisés"
    ],
    category: "E-Learning Platform",
    type: "NGO Project",
    github: "https://github.com/protegeqv/formation-platform",
    demo: "https://formation.protegeqv.org",
    images: [
      "data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='600' fill='%23fef3c7'/%3E%3Ctext x='400' y='300' text-anchor='middle' fill='%23d97706' font-size='24' font-family='Arial'%3EE-Learning Platform%3C/text%3E%3C/svg%3E"
    ]
  },
  {
    id: 5,
    title: "Smart City Yaoundé - IoT Dashboard",
    description: "Dashboard de monitoring urbain avec capteurs IoT",
    longDescription: "Système de monitoring urbain intelligent avec capteurs IoT pour la qualité de l'air, trafic et éclairage public.",
    period: "2024",
    status: "Prototype",
    progress: 60,
    tech: ["React.js", "Python", "InfluxDB", "Grafana", "MQTT", "Arduino"],
    features: [
      "Monitoring qualité de l'air",
      "Gestion intelligente du trafic",
      "Contrôle éclairage public",
      "Alertes automatisées",
      "Visualisations temps réel",
      "API RESTful"
    ],
    category: "IoT Platform",
    type: "Innovation Project",
    github: "https://github.com/momoyvan/smart-city-yaounde",
    images: [
      "data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='600' fill='%23f3e8ff'/%3E%3Ctext x='400' y='300' text-anchor='middle' fill='%237c3aed' font-size='24' font-family='Arial'%3ESmart City Dashboard%3C/text%3E%3C/svg%3E"
    ]
  }
];

// Enhanced blog posts
const blogPosts = [
  {
    id: 1,
    title: "Guide Complet du Développement Web Moderne au Cameroun",
    slug: "guide-developpement-web-moderne-cameroun",
    excerpt: "Découvrez les meilleures pratiques et technologies pour le développement web adapté au contexte camerounais.",
    author: "MOMO GODI YVAN",
    date: "2025-01-15",
    readTime: 8,
    tags: ["Web Development", "Cameroun", "React", "Django"],
    image: "data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='400' fill='%23dbeafe'/%3E%3Ctext x='400' y='200' text-anchor='middle' fill='%231d4ed8' font-size='20' font-family='Arial'%3EGuide Développement Web%3C/text%3E%3C/svg%3E",
    featured: true,
    views: 1250,
    likes: 89
  },
  {
    id: 2,
    title: "L'IA et le Développement : Révolution ou Evolution ?",
    slug: "ia-developpement-revolution-evolution",
    excerpt: "Analyse de l'impact de l'intelligence artificielle sur le métier de développeur en Afrique.",
    author: "MOMO GODI YVAN",
    date: "2025-01-10",
    readTime: 6,
    tags: ["IA", "Développement", "Afrique", "Innovation"],
    image: "data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='400' fill='%23dcfce7'/%3E%3Ctext x='400' y='200' text-anchor='middle' fill='%23166534' font-size='20' font-family='Arial'%3EIA et Développement%3C/text%3E%3C/svg%3E",
    featured: false,
    views: 890,
    likes: 67
  },
  {
    id: 3,
    title: "Transformation Digitale des PME Camerounaises",
    slug: "transformation-digitale-pme-camerounaises",
    excerpt: "Stratégies pratiques pour digitaliser les petites et moyennes entreprises au Cameroun.",
    author: "MOMO GODI YVAN",
    date: "2025-01-05",
    readTime: 10,
    tags: ["Transformation Digitale", "PME", "Cameroun", "Business"],
    image: "data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='400' fill='%23fef3c7'/%3E%3Ctext x='400' y='200' text-anchor='middle' fill='%23d97706' font-size='20' font-family='Arial'%3ETransformation Digitale%3C/text%3E%3C/svg%3E",
    featured: true,
    views: 1100,
    likes: 92
  }
];

// Personal information
const personalInfo = {
  name: "MOMO GODI YVAN",
  location: "Yaoundé VI, Biyemassi, Maison Blanche, Cameroun",
  email: "yvangodimomo@gmail.com",
  phone: "+237695922065",
  whatsapp: "+237695922065",
  portfolio: "https://momoyvan-porfoloi.onrender.com",
  linkedin: "https://linkedin.com/in/momo-godi-yvan-206642244",
  github: "https://github.com/momoyvan",
  website: "https://www.protegeqv.org",
  instagram: "https://instagram.com/momoyvan",
  twitter: "https://twitter.com/momoyvan",
  youtube: "https://youtube.com/@momoyvan",
  resume: "/MOMO_YVAN_CV.pdf"
};

// Enhanced skills data
const skills = {
  programming: [
    { name: "Python", level: 92, icon: "🐍", category: "Backend", years: 4 },
    { name: "JavaScript", level: 88, icon: "📜", category: "Frontend", years: 3 },
    { name: "TypeScript", level: 85, icon: "📘", category: "Frontend", years: 2 },
    { name: "PHP", level: 82, icon: "🌐", category: "Backend", years: 3 },
    { name: "Dart", level: 78, icon: "🎯", category: "Mobile", years: 2 },
    { name: "Java", level: 75, icon: "☕", category: "Backend", years: 2 }
  ],
  frameworks: [
    { name: "React.js", level: 90, icon: "⚛️", category: "Frontend", years: 3 },
    { name: "Django", level: 88, icon: "🎸", category: "Backend", years: 4 },
    { name: "Laravel", level: 85, icon: "🏗️", category: "Backend", years: 3 },
    { name: "Vue.js", level: 82, icon: "💚", category: "Frontend", years: 2 },
    { name: "Flutter", level: 80, icon: "📱", category: "Mobile", years: 2 },
    { name: "Next.js", level: 78, icon: "▲", category: "Frontend", years: 2 },
    { name: "Flask", level: 75, icon: "🌶️", category: "Backend", years: 2 },
    { name: "React Native", level: 75, icon: "📱", category: "Mobile", years: 2 }
  ],
  databases: [
    { name: "PostgreSQL", level: 85, icon: "🐘", category: "Database", years: 3 },
    { name: "MySQL", level: 88, icon: "🗄️", category: "Database", years: 4 },
    { name: "MongoDB", level: 80, icon: "🍃", category: "Database", years: 2 },
    { name: "Redis", level: 75, icon: "🔴", category: "Cache", years: 2 },
    { name: "SQLite", level: 82, icon: "💾", category: "Database", years: 3 }
  ],
  tools: [
    { name: "Git/GitHub", level: 90, icon: "🔧", category: "Version Control", years: 4 },
    { name: "Docker", level: 78, icon: "🐳", category: "DevOps", years: 2 },
    { name: "AWS", level: 75, icon: "☁️", category: "Cloud", years: 2 },
    { name: "Linux", level: 85, icon: "🐧", category: "System", years: 3 },
    { name: "Figma", level: 80, icon: "🎨", category: "Design", years: 2 },
    { name: "Postman", level: 88, icon: "📮", category: "API", years: 3 }
  ]
};

// Components
const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`${sizeClasses[size]} border-2 border-primary-600 border-t-transparent rounded-full`}
    />
  );
};

const OfflineIndicator = ({ isOnline }) => {
  if (isOnline) return null;

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-red-600 text-white p-2 text-center text-sm z-50"
    >
      <div className="flex items-center justify-center gap-2">
        <WifiOff size={16} />
        Vous êtes hors ligne. Certaines fonctionnalités peuvent être limitées.
      </div>
    </motion.div>
  );
};

const PWAInstallPrompt = ({ installPrompt, onInstall }) => {
  if (!installPrompt) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 bg-primary-600 text-white p-4 rounded-lg shadow-lg max-w-sm z-50"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <h3 className="font-semibold mb-1">Installer l'application</h3>
          <p className="text-sm text-blue-100 mb-3">
            Accédez rapidement à mon portfolio depuis votre écran d'accueil
          </p>
          <div className="flex gap-2">
            <button
              onClick={onInstall}
              className="bg-white text-primary-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100"
            >
              Installer
            </button>
            <button
              onClick={() => setInstallPrompt(null)}
              className="text-blue-200 hover:text-white text-sm"
            >
              Plus tard
            </button>
          </div>
        </div>
        <button
          onClick={() => setInstallPrompt(null)}
          className="text-blue-200 hover:text-white"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
};

const SkillCard = ({ skill, index, category }) => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-lg transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-gray-800/50 hover:bg-gray-800/70' 
          : 'bg-white/70 hover:bg-white/90'
      }`}
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{skill.icon}</span>
          <div>
            <div className={`font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {skill.name}
            </div>
            <div className={`text-xs ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {skill.years} {skill.years === 1 ? 'an' : 'ans'}
            </div>
          </div>
        </div>
        <span className={`text-sm font-bold ${
          skill.level >= 85 ? 'text-green-500' :
          skill.level >= 75 ? 'text-blue-500' :
          skill.level >= 65 ? 'text-yellow-500' : 'text-orange-500'
        }`}>
          {skill.level}%
        </span>
      </div>
      <div className={`w-full h-2 rounded-full overflow-hidden ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
      }`}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className={`h-full rounded-full ${
            skill.level >= 85 ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
            skill.level >= 75 ? 'bg-gradient-to-r from-blue-400 to-cyan-500' :
            skill.level >= 65 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
            'bg-gradient-to-r from-orange-400 to-red-500'
          }`}
        />
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ project, index, onSelect, t }) => {
  const { theme } = useTheme();
  const { trackEvent } = useAnalytics();

  const handleProjectClick = () => {
    trackEvent('project_view', {
      category: 'portfolio',
      label: project.title,
      project_category: project.category
    });
    onSelect(project);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer ${
        theme === 'dark' 
          ? 'bg-gray-800/70 hover:bg-gray-800' 
          : 'bg-white hover:bg-gray-50'
      }`}
      onClick={handleProjectClick}
    >
      <div className="relative overflow-hidden">
        <img 
          src={project.images[0]} 
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            project.status === 'En développement' ? 'bg-yellow-500/90 text-white' :
            project.status === 'Terminé' ? 'bg-green-500/90 text-white' :
            project.status === 'Production' ? 'bg-blue-500/90 text-white' :
            'bg-gray-500/90 text-white'
          }`}>
            {project.status}
          </span>
          <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
            {project.category}
          </span>
        </div>
        <div className="absolute bottom-4 right-4">
          <div className="flex gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <Github size={16} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className={`text-xl font-bold mb-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {project.title}
        </h3>
        
        <p className={`mb-4 line-clamp-2 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {project.description}
        </p>
        
        <div className="mb-4">
          <div className={`text-sm mb-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {project.period}
          </div>
          <div className="flex flex-wrap gap-1">
            {project.tech.slice(0, 3).map((tech, idx) => (
              <span 
                key={idx}
                className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded text-xs font-medium"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className={`px-2 py-1 rounded text-xs ${
                theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
              }`}>
                +{project.tech.length - 3}
              </span>
            )}
          </div>
        </div>
        
        {project.progress && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                {t.projects.progress}
              </span>
              <span className="text-primary-600 font-medium">
                {project.progress}%
              </span>
            </div>
            <div className={`w-full h-2 rounded-full ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${project.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
              />
            </div>
          </div>
        )}
        
        <button className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors">
          {t.projects.viewDetails}
          <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

const BlogCard = ({ post, t }) => {
  const { theme } = useTheme();
  const { trackEvent } = useAnalytics();

  const handleReadPost = () => {
    trackEvent('blog_read', {
      category: 'content',
      label: post.title,
      reading_time: post.readTime
    });
  };

  return (
    <motion.article
      whileHover={{ y: -10 }}
      className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}
      onClick={handleReadPost}
    >
      <div className="relative overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
        {post.featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Star size={14} />
            {t.blog.featured}
          </div>
        )}
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
          <Clock size={14} />
          {post.readTime} {t.blog.readTime}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={16} />
            {new Date(post.date).toLocaleDateString('fr-FR')}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={16} />
            {post.views || 0}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map(tag => (
            <span 
              key={tag}
              className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <button className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors">
          {t.blog.readMore}
          <ArrowRight size={16} />
        </button>
      </div>
    </motion.article>
  );
};

const ContactMethod = ({ method, t }) => {
  const { trackEvent } = useAnalytics();

  const handleContact = () => {
    trackEvent('contact_attempt', {
      category: 'conversion',
      label: method.type
    });
  };

  return (
    <motion.a
      href={method.href}
      target={method.type === 'whatsapp' ? '_blank' : undefined}
      rel={method.type === 'whatsapp' ? 'noopener noreferrer' : undefined}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:bg-white/20 group block"
      onClick={handleContact}
    >
      <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
        <method.icon size={32} className="text-white" />
      </div>
      <h3 className="font-bold text-lg mb-2 text-white">{method.label}</h3>
      <p className="text-blue-100 text-sm">{method.value}</p>
    </motion.a>
  );
};

// Main Portfolio Component
const EnhancedPortfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [projectFilter, setProjectFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [copied, setCopied] = useState('');
  
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const { isOnline, installPrompt, installPWA, trackEvent } = useAnalytics();
  
  const t = translations[language];
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // Navigation items
  const navItems = [
    { id: 'home', label: t.nav.home, icon: Home },
    { id: 'about', label: t.nav.about, icon: Users },
    { id: 'skills', label: t.nav.skills, icon: Code },
    { id: 'projects', label: t.nav.projects, icon: Rocket },
    { id: 'blog', label: t.nav.blog, icon: BookOpen },
    { id: 'contact', label: t.nav.contact, icon: MessageCircle }
  ];

  // Contact methods
  const contactMethods = [
    {
      type: 'email',
      label: t.contact.email,
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      icon: Mail,
      color: 'bg-blue-500'
    },
    {
      type: 'whatsapp',
      label: t.contact.whatsapp,
      value: personalInfo.whatsapp,
      href: `https://wa.me/${personalInfo.whatsapp.replace('+', '')}`,
      icon: MessageCircle,
      color: 'bg-green-500'
    },
    {
      type: 'phone',
      label: t.contact.call,
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      icon: Phone,
      color: 'bg-purple-500'
    }
  ];

  // Filter projects
  const filteredProjects = enhancedProjects.filter(project => {
    const matchesFilter = projectFilter === 'All' || project.category === projectFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Utility functions
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    trackEvent('section_view', {
      category: 'navigation',
      label: sectionId
    });
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(''), 2000);
      trackEvent('copy_contact', { category: 'interaction', label: type });
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadResume = () => {
    trackEvent('resume_download', { category: 'conversion' });
    // In a real app, this would trigger a file download
    window.open(personalInfo.resume, '_blank');
  };

  // Intersection Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-900'
    }`}>
      {/* Offline Indicator */}
      <OfflineIndicator isOnline={isOnline} />

      {/* PWA Install Prompt */}
      <PWAInstallPrompt installPrompt={installPrompt} onInstall={installPWA} />

      {/* Animated Background */}
      <motion.div
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
      </motion.div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-gray-900/90 backdrop-blur-md border-b border-gray-700/50' 
          : 'bg-white/90 backdrop-blur-md border-b border-gray-200/50'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                MOMO YVAN
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === 'dark' 
                      ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => changeLanguage(e.target.value)}
                    className={`p-2 rounded-lg border-none outline-none transition-colors ${
                      theme === 'dark' 
                        ? 'bg-gray-800 text-white' 
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    <option value="fr">🇫🇷 FR</option>
                    <option value="en">🇬🇧 EN</option>
                  </select>
                </div>
                <div className="flex items-center gap-1">
                  {isOnline ? (
                    <Wifi size={16} className="text-green-500" title="Online" />
                  ) : (
                    <WifiOff size={16} className="text-red-500" title="Offline" />
                  )}
                </div>
              </div>
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-2 transition-colors duration-200 ${
                    activeSection === item.id 
                      ? 'text-primary-600 font-medium' 
                      : theme === 'dark' 
                        ? 'text-gray-300 hover:text-primary-400' 
                        : 'text-gray-600 hover:text-primary-600'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`lg:hidden border-t ${
                theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <div className="container mx-auto px-4 py-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-3 w-full text-left py-3 transition-colors ${
                      theme === 'dark' 
                        ? 'text-gray-300 hover:text-primary-400' 
                        : 'text-gray-600 hover:text-primary-600'
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-12 min-h-screen flex items-center relative overflow-hidden">
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary-400/30 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="relative w-40 h-40 mx-auto mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-primary-500 via-accent-500 to-purple-500 rounded-full p-1"
                >
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                    <span className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                      MY
                    </span>
                  </div>
                </motion.div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-4 border-2 border-dashed border-primary-300 rounded-full"
                />
              </div>
            </motion.div>

            <motion.h1 
              {...fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-600 via-accent-600 to-purple-600 bg-clip-text text-transparent"
            >
              {personalInfo.name}
            </motion.h1>

            <motion.p 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className={`text-xl md:text-2xl mb-4 leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.p 
              {...fadeInUp}
              transition={{ delay: 0.3 }}
              className={`text-lg mb-8 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {t.hero.description}
            </motion.p>

            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <motion.button 
                onClick={() => scrollToSection('contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Mail size={20} />
                {t.hero.cta1}
                <Sparkles size={16} className="animate-pulse" />
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('projects')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 flex items-center gap-2`}
              >
                <Rocket size={20} />
                {t.hero.cta2}
              </motion.button>
              <motion.button 
                onClick={downloadResume}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 flex items-center gap-2`}
              >
                <Download size={20} />
                {t.hero.cta3}
              </motion.button>
            </motion.div>

            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.6 }}
              className={`flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span className="text-sm">{t.hero.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={16} />
                <span className="text-sm">{t.hero.availability}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-500">{t.hero.status}</span>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.8 }}
              className="flex justify-center space-x-4 mt-8"
            >
              {[
                { icon: Linkedin, href: personalInfo.linkedin, color: 'hover:text-blue-600' },
                { icon: Github, href: personalInfo.github, color: 'hover:text-gray-600' },
                { icon: Instagram, href: personalInfo.instagram, color: 'hover:text-pink-600' },
                { icon: Twitter, href: personalInfo.twitter, color: 'hover:text-blue-400' },
                { icon: Youtube, href: personalInfo.youtube, color: 'hover:text-red-600' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  className={`p-3 rounded-full bg-white/10 backdrop-blur-sm transition-colors ${social.color}`}
                  onClick={() => trackEvent('social_link_click', { category: 'social', label: social.href })}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 ${
        theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'
      } backdrop-blur-sm`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                {t.about.title}
              </h2>
              <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {t.about.subtitle}
              </p>
            </motion.div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                {...fadeInUp}
                className="space-y-8"
              >
                <p className={`text-lg leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {t.about.description1}
                </p>
                
                <p className={`text-lg leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {t.about.description2}
                </p>

                <div className="grid grid-cols-2 gap-6 mt-12">
                  {[
                    { number: '4+', label: t.about.years, icon: Calendar, color: 'from-blue-500 to-cyan-500' },
                    { number: '15+', label: t.about.projects, icon: Rocket, color: 'from-green-500 to-emerald-500' },
                    { number: '50+', label: t.about.women, icon: Users, color: 'from-purple-500 to-pink-500' },
                    { number: '3', label: t.about.languages, icon: Languages, color: 'from-orange-500 to-red-500' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className={`p-6 rounded-xl bg-gradient-to-br ${stat.color} text-white transform transition-all duration-300 cursor-pointer`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <stat.icon size={24} className="opacity-80" />
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="text-3xl font-bold"
                        >
                          {stat.number}
                        </motion.div>
                      </div>
                      <div className="text-sm opacity-90 font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                {...fadeInUp}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold mb-8">Spécialités</h3>
                <div className="grid gap-4">
                  {[
                    { icon: Code, text: "Développement Web & Mobile", desc: "React, Django, Flutter" },
                    { icon: Server, text: "Architecture Logicielle", desc: "Microservices, APIs REST" },
                    { icon: Database, text: "Gestion de Données", desc: "PostgreSQL, MongoDB, Redis" },
                    { icon: Cloud, text: "DevOps & Cloud", desc: "AWS, Docker, CI/CD" },
                    { icon: Users, text: "Transformation Digitale", desc: "Stratégie, Formation, Accompagnement" },
                    { icon: Shield, text: "Sécurité & Performance", desc: "Optimisation, Monitoring" }
                  ].map((specialty, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 10 }}
                      className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-300 cursor-pointer ${
                        theme === 'dark' 
                          ? 'bg-gray-700/50 hover:bg-gray-700' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <specialty.icon className="text-white" size={24} />
                      </div>
                      <div>
                        <div className={`font-semibold ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {specialty.text}
                        </div>
                        <div className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {specialty.desc}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 ${
        theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50/80'
      } backdrop-blur-sm`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                {t.skills.title}
              </h2>
              <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {t.skills.subtitle}
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(skills).map(([category, skillList], categoryIndex) => (
                <motion.div
                  key={category}
                  {...fadeInUp}
                  transition={{ delay: categoryIndex * 0.1 }}
                  className={`p-8 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl ${
                    theme === 'dark' 
                      ? 'bg-gray-800/50 hover:bg-gray-800/70' 
                      : 'bg-white/70 hover:bg-white/90'
                  }`}
                >
                  <h3 className={`text-xl font-bold mb-6 text-center ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {t.skills[category] || category}
                  </h3>
                  <div className="space-y-6">
                    {skillList.map((skill, index) => (
                      <SkillCard 
                        key={index} 
                        skill={skill} 
                        index={index} 
                        category={category} 
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 ${
        theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'
      } backdrop-blur-sm`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                {t.projects.title}
              </h2>
              <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {t.projects.subtitle}
              </p>
            </motion.div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12">
              <div className="relative flex-1 max-w-md">
                <Search className={`absolute left-3 top-3 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} size={20} />
                <input
                  type="text"
                  placeholder={t.common.search}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-primary-500`}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {['All', ...new Set(enhancedProjects.map(p => p.category))].map(category => (
                  <button
                    key={category}
                    onClick={() => setProjectFilter(category)}
                    className={`px-4 py-2 rounded-full transition-all duration-200 ${
                      projectFilter === category
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category === 'All' ? t.common.all : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <motion.div
              variants={stagger}
              animate="animate"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index} 
                  onSelect={setSelectedProject}
                  t={t}
                />
              ))}
            </motion.div>

            {filteredProjects.length === 0 && (
              <motion.div
                {...fadeInUp}
                className="text-center py-16"
              >
                <div className={`text-6xl mb-4 ${
                  theme === 'dark' ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  🔍
                </div>
                <p className={`text-lg ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {t.projects.noResults}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className={`py-20 ${
        theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50/80'
      } backdrop-blur-sm`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                {t.blog.title}
              </h2>
              <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {t.blog.subtitle}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} t={t} />
              ))}
            </div>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.6 }}
              className="text-center mt-12"
            >
              <button 
                className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 mx-auto"
                onClick={() => trackEvent('view_all_blog', { category: 'navigation' })}
              >
                <BookOpen size={20} />
                {t.blog.viewAll}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-primary-600 via-accent-600 to-purple-600 text-white relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.h2 
              {...fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-8"
            >
              {t.contact.title}
            </motion.h2>
            
            <motion.p
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-xl mb-16 text-blue-100"
            >
              {t.contact.subtitle}
            </motion.p>
            
            {/* Contact Methods */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.type}
                  {...fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <ContactMethod method={method} t={t} />
                </motion.div>
              ))}
            </div>
            
            {/* Contact Info Cards */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.5 }}
              className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Clock size={20} />
                  {t.contact.availability}
                </h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span>{t.contact.newProjects}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={16} />
                    <span>{t.contact.response}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe size={16} />
                    <span>{t.contact.remote}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Settings size={20} />
                  {t.contact.services}
                </h3>
                <div className="space-y-2 text-left text-sm">
                  <div>• Développement Web & Mobile</div>
                  <div>• Transformation Digitale</div>
                  <div>• Formation IT</div>
                  <div>• Consulting Technique</div>
                  <div>• Architecture Logicielle</div>
                </div>
              </div>
            </motion.div>

            {/* Quick Contact Info */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.7 }}
              className="mt-12 flex flex-wrap justify-center gap-6"
            >
              <button
                onClick={() => copyToClipboard(personalInfo.email, 'email')}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Mail size={16} />
                {personalInfo.email}
                {copied === 'email' ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
              </button>
              <button
                onClick={() => copyToClipboard(personalInfo.phone, 'phone')}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Phone size={16} />
                {personalInfo.phone}
                {copied === 'phone' ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-900'
      } text-white`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                MOMO YVAN
              </h3>
              <p className="text-gray-400 mb-4">
                {t.footer.description}
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Linkedin, href: personalInfo.linkedin },
                  { icon: Github, href: personalInfo.github },
                  { icon: Twitter, href: personalInfo.twitter },
                  { icon: Instagram, href: personalInfo.instagram }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    className="text-gray-400 hover:text-white transition-colors"
                    onClick={() => trackEvent('footer_social_click', { category: 'social', label: social.href })}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">{t.footer.navigation}</h4>
              <div className="space-y-2">
                {navItems.slice(0, 5).map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">{t.footer.services}</h4>
              <div className="space-y-2 text-gray-400">
                <div>Développement Web</div>
                <div>Applications Mobile</div>
                <div>Transformation Digitale</div>
                <div>Formation IT</div>
                <div>Consulting</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">{t.footer.contact}</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span className="text-sm">{personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <span className="text-sm">{personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span className="text-sm">Yaoundé, Cameroun</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 mb-4">
              © 2025 MOMO GODI YVAN. {t.footer.rights}
            </p>
            <p className="text-sm text-gray-500">
              {t.footer.madeWith}
            </p>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.75, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.75, y: 20 }}
              className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              } shadow-2xl`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedProject.images[0]}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedProject.status === 'En développement' ? 'bg-yellow-500/90 text-white' :
                    selectedProject.status === 'Terminé' ? 'bg-green-500/90 text-white' :
                    selectedProject.status === 'Production' ? 'bg-blue-500/90 text-white' :
                    'bg-gray-500/90 text-white'
                  }`}>
                    {selectedProject.status}
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {selectedProject.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <h2 className={`text-3xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {selectedProject.title}
                </h2>
                
                <p className={`text-lg mb-6 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {selectedProject.longDescription}
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className={`text-xl font-semibold mb-4 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {t.projects.technologies}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech, idx) => (
                        <span 
                          key={idx}
                          className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className={`text-xl font-semibold mb-4 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {t.projects.features}
                    </h3>
                    <ul className="space-y-2">
                      {selectedProject.features.slice(0, 6).map((feature, idx) => (
                        <li key={idx} className={`flex items-start gap-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {selectedProject.highlights && (
                  <div className="mb-8">
                    <h3 className={`text-xl font-semibold mb-4 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Points forts
                    </h3>
                    <div className="grid gap-4">
                      {selectedProject.highlights.map((highlight, idx) => (
                        <div 
                          key={idx}
                          className={`p-4 rounded-lg border-l-4 border-primary-500 ${
                            theme === 'dark' ? 'bg-gray-700/50' : 'bg-primary-50'
                          }`}
                        >
                          <p className={`text-sm ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {highlight}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedProject.progress && (
                  <div className="mb-8">
                    <h3 className={`text-xl font-semibold mb-4 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {t.projects.progress}
                    </h3>
                    <div className="flex justify-between text-sm mb-2">
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                        Avancement du projet
                      </span>
                      <span className="text-primary-600 font-medium">
                        {selectedProject.progress}%
                      </span>
                    </div>
                    <div className={`w-full h-3 rounded-full ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedProject.progress}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-4">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors"
                      onClick={() => trackEvent('project_github_click', { 
                        category: 'external_link', 
                        label: selectedProject.title 
                      })}
                    >
                      <Github size={20} />
                      {t.projects.viewCode}
                    </a>
                  )}
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                      onClick={() => trackEvent('project_demo_click', { 
                        category: 'external_link', 
                        label: selectedProject.title 
                      })}
                    >
                      <ExternalLink size={20} />
                      {t.projects.viewDemo}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: scrollYProgress.get() > 0.2 ? 1 : 0,
          scale: scrollYProgress.get() > 0.2 ? 1 : 0
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-3 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors z-40"
      >
        <ArrowRight size={20} className="rotate-[-90deg]" />
      </motion.button>

      {/* Loading States */}
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" />
        </div>
      }>
        {/* Lazy loaded components will be rendered here when needed */}
      </Suspense>
    </div>
  );
};

// Main App Component with Providers
const Portfolio = () => {
  // Initialize analytics on mount
  useEffect(() => {
    // Google Analytics 4
    if (typeof window !== 'undefined') {
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID', {
          page_title: document.title,
          page_location: window.location.href,
          anonymize_ip: true,
          allow_google_signals: false,
          allow_ad_personalization_signals: false
        });
      `;
      document.head.appendChild(script2);

      // Initialize PWA
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      }

      // Performance tracking
      if ('web-vitals' in window) {
        import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
          getCLS((metric) => {
            if (typeof gtag !== 'undefined') {
              gtag('event', 'web_vitals', {
                event_category: 'performance',
                event_label: 'CLS',
                value: Math.round(metric.value * 1000)
              });
            }
          });
          
          getFID((metric) => {
            if (typeof gtag !== 'undefined') {
              gtag('event', 'web_vitals', {
                event_category: 'performance',
                event_label: 'FID',
                value: Math.round(metric.value)
              });
            }
          });
        });
      }

      return () => {
        // Cleanup scripts on unmount
        try {
          document.head.removeChild(script1);
          document.head.removeChild(script2);
        } catch (e) {
          // Scripts may not exist or already removed
        }
      };
    }
  }, []);

  return (
    <AnalyticsProvider>
      <ThemeProvider>
        <LanguageProvider>
          <div className="App">
            <EnhancedPortfolio />
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </AnalyticsProvider>
  );
};

export default Portfolio;