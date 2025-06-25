// src/components/Portfolio.jsx
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

// Lazy load components with fallbacks
const EnhancedContactForm = lazy(() => 
  import('./contact/EnhancedContactForm').catch(() => ({ default: () => <div>Contact form not available</div> }))
);
const Gallery = lazy(() => 
  import('./gallery/GalleryComponents').catch(() => ({ default: () => <div>Gallery not available</div> }))
);
const BlogSection = lazy(() => 
  import('./blog/BlogComponents').catch(() => ({ default: () => <div>Blog not available</div> }))
);
const ThreeDScene = lazy(() => 
  import('./3d/ThreeDComponents').catch(() => ({ default: () => <div>3D Scene not available</div> }))
);
const SEOHead = lazy(() => 
  import('./SEO/SEOHead').catch(() => ({ default: () => null }))
);

// Context providers
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
    
    // Analytics tracking
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'theme_change', {
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
    
    // Analytics tracking
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'language_change', {
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
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Initialize Google Analytics if available
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
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
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', eventName, {
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

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Main Portfolio Component
const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [projectFilter, setProjectFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [copied, setCopied] = useState('');
  const [scrollY, setScrollY] = useState(0);
  
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const { isOnline, installPrompt, installPWA, trackEvent } = useAnalytics();
  
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'about', label: 'À Propos', icon: Users },
    { id: 'skills', label: 'Compétences', icon: Code },
    { id: 'experience', label: 'Expérience', icon: Briefcase },
    { id: 'projects', label: 'Projets', icon: Rocket },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'gallery', label: 'Galerie', icon: Camera },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  // Personal info
  const personalInfo = {
    name: "MOMO GODI YVAN",
    title: "Développeur Full Stack & Expert en Transformation Digitale",
    email: "yvangodimomo@gmail.com",
    phone: "+237695922065",
    location: "Yaoundé, Cameroun",
    bio: "Passionné par l'innovation technologique et la transformation digitale, je crée des solutions robustes qui transforment les idées en réalités numériques performantes.",
    social: {
      linkedin: "https://linkedin.com/in/momo-godi-yvan-206642244",
      github: "https://github.com/momogodi2000",
      instagram: "https://instagram.com/momo_yvan24",
      twitter: "https://twitter.com/momoyvan"
    }
  };

  // Skills data
  const skills = {
    frontend: [
      { name: "React.js", level: 95, icon: "⚛️" },
      { name: "Vue.js", level: 85, icon: "💚" },
      { name: "JavaScript", level: 90, icon: "🟨" },
      { name: "TypeScript", level: 80, icon: "🔷" },
      { name: "Tailwind CSS", level: 92, icon: "🎨" },
      { name: "HTML5/CSS3", level: 95, icon: "🌐" }
    ],
    backend: [
      { name: "Django", level: 88, icon: "🐍" },
      { name: "Node.js", level: 85, icon: "💚" },
      { name: "Python", level: 90, icon: "🐍" },
      { name: "PHP", level: 75, icon: "🐘" },
      { name: "PostgreSQL", level: 85, icon: "🐘" },
      { name: "MongoDB", level: 80, icon: "🍃" }
    ],
    mobile: [
      { name: "Flutter", level: 88, icon: "📱" },
      { name: "React Native", level: 82, icon: "⚛️" },
      { name: "Android Studio", level: 75, icon: "🤖" },
      { name: "Kotlin", level: 70, icon: "🎯" }
    ],
    tools: [
      { name: "Git/GitHub", level: 90, icon: "🔧" },
      { name: "Docker", level: 85, icon: "🐳" },
      { name: "AWS", level: 80, icon: "☁️" },
      { name: "Firebase", level: 85, icon: "🔥" },
      { name: "Figma", level: 75, icon: "🎨" },
      { name: "Postman", level: 88, icon: "📮" }
    ]
  };

  // Projects data
  const projects = [
    {
      id: 1,
      title: "Système de Gestion Hospitalière",
      description: "Plateforme complète pour la gestion des hôpitaux avec modules patients, médecins, et facturation.",
      image: "/api/placeholder/400/250",
      tech: ["Django", "React", "PostgreSQL", "WebSocket"],
      category: "Web Platform",
      link: "https://github.com/momogodi2000",
      demo: "https://demo-hospital.com",
      status: "completed"
    },
    {
      id: 2,
      title: "Application E-commerce Mobile",
      description: "App mobile complète avec paiement mobile money, catalogue produits et système de livraison.",
      image: "/api/placeholder/400/250",
      tech: ["Flutter", "Firebase", "Stripe", "Node.js"],
      category: "Mobile App",
      link: "https://github.com/momogodi2000",
      demo: "https://play.google.com",
      status: "completed"
    },
    {
      id: 3,
      title: "Plateforme de Formation en Ligne",
      description: "LMS moderne avec cours vidéo, quiz interactifs et certificats.",
      image: "/api/placeholder/400/250",
      tech: ["Vue.js", "Django", "WebRTC", "Redis"],
      category: "E-commerce",
      link: "https://github.com/momogodi2000",
      demo: "https://demo-learning.com",
      status: "in-progress"
    }
  ];

  // Copy to clipboard function
  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    navItems.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <SEOHead />
      </Suspense>

      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}>
        
        {/* Navigation */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrollY > 50 
              ? theme === 'dark' 
                ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' 
                : 'bg-white/95 backdrop-blur-md shadow-lg'
              : 'bg-transparent'
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">MG</span>
                </div>
                <span className="font-bold text-xl">MOMO GODI</span>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    whileHover={{ y: -2 }}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/30'
                        : theme === 'dark'
                        ? 'text-gray-300 hover:text-primary-400'
                        : 'text-gray-600 hover:text-primary-600'
                    }`}
                    onClick={() => trackEvent('nav_click', { section: item.id })}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </motion.a>
                ))}
              </div>

              {/* Theme Toggle & Language Switcher */}
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleTheme}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === 'dark' 
                      ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => changeLanguage(language === 'fr' ? 'en' : 'fr')}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === 'dark' 
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Languages size={20} />
                </motion.button>

                {/* Mobile menu button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 rounded-lg"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className={`fixed top-16 right-0 h-screen w-80 z-40 ${
                theme === 'dark' ? 'bg-gray-900' : 'bg-white'
              } shadow-xl`}
            >
              <div className="p-6">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      setIsMenuOpen(false);
                      trackEvent('mobile_nav_click', { section: item.id });
                    }}
                    className={`flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors ${
                      activeSection === item.id
                        ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/30'
                        : theme === 'dark'
                        ? 'text-gray-300 hover:text-primary-400 hover:bg-gray-800'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Animation */}
          <motion.div
            style={{ y: backgroundY }}
            className="absolute inset-0 bg-gradient-to-br from-primary-50 via-accent-50 to-primary-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"
                >
                  {personalInfo.name}
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8"
                >
                  {personalInfo.title}
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-2xl"
                >
                  {personalInfo.bio}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href="#contact"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                    onClick={() => trackEvent('cta_click', { type: 'contact' })}
                  >
                    <Mail className="mr-2" size={20} />
                    Me Contacter
                  </motion.a>
                  
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href="#projects"
                    className={`inline-flex items-center px-8 py-4 border-2 border-primary-600 rounded-xl font-semibold transition-all ${
                      theme === 'dark'
                        ? 'text-primary-400 hover:bg-primary-600 hover:text-white'
                        : 'text-primary-600 hover:bg-primary-600 hover:text-white'
                    }`}
                    onClick={() => trackEvent('cta_click', { type: 'projects' })}
                  >
                    <Eye className="mr-2" size={20} />
                    Voir Mes Projets
                  </motion.a>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="flex justify-center lg:justify-start space-x-6 mt-8"
                >
                  {Object.entries(personalInfo.social).map(([platform, url]) => (
                    <motion.a
                      key={platform}
                      whileHover={{ scale: 1.2, y: -2 }}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-full transition-all ${
                        theme === 'dark'
                          ? 'bg-gray-800 text-gray-300 hover:text-primary-400'
                          : 'bg-gray-100 text-gray-600 hover:text-primary-600'
                      }`}
                      onClick={() => trackEvent('social_click', { platform })}
                    >
                      {platform === 'linkedin' && <Linkedin size={24} />}
                      {platform === 'github' && <Github size={24} />}
                      {platform === 'instagram' && <Instagram size={24} />}
                      {platform === 'twitter' && <Twitter size={24} />}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>

              {/* Hero Image/3D Scene */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="relative"
              >
                <Suspense fallback={
                  <div className="w-full h-96 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center">
                    <Loader2 className="animate-spin" size={48} />
                  </div>
                }>
                  <ThreeDScene />
                </Suspense>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-primary-400 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className={`py-20 ${
          theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50/80'
        }`}>
          <div className="container mx-auto px-4">
            <motion.div
              {...fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">À Propos</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Découvrez mon parcours et mes passions
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div {...fadeInUp} className="space-y-6">
                <h3 className="text-2xl font-semibold mb-6">Mon Histoire</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Diplômé en Informatique de Gestion et passionné par l'innovation technologique, 
                  je me spécialise dans le développement d'applications web et mobiles robustes. 
                  Mon approche combine expertise technique et vision business pour créer des solutions 
                  qui transforment réellement les entreprises.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Avec une expérience diversifiée dans différents secteurs (santé, e-commerce, éducation), 
                  j'accompagne mes clients dans leur transformation digitale en proposant des solutions 
                  sur mesure, performantes et évolutives.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6 mt-8">
                  {[
                    { number: "50+", label: "Projets Réalisés", icon: Rocket },
                    { number: "3+", label: "Années d'Expérience", icon: Calendar },
                    { number: "25+", label: "Clients Satisfaits", icon: Users },
                    { number: "10+", label: "Technologies Maîtrisées", icon: Code }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className={`p-6 rounded-xl ${
                        theme === 'dark' ? 'bg-gray-700/50' : 'bg-white'
                      } shadow-lg text-center`}
                    >
                      <div className="flex items-center justify-center mb-4">
                        <stat.icon size={24} className="opacity-80" />
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="text-3xl font-bold ml-2"
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
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              {...fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Compétences</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Technologies et outils que je maîtrise
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(skills).map(([category, skillList], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: categoryIndex * 0.1 }}
                  className={`p-6 rounded-xl ${
                    theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'
                  } shadow-lg`}
                >
                  <h3 className="text-xl font-semibold mb-6 capitalize text-center">
                    {category === 'frontend' ? 'Frontend' : 
                     category === 'backend' ? 'Backend' :
                     category === 'mobile' ? 'Mobile' : 'Outils'}
                  </h3>
                  
                  <div className="space-y-4">
                    {skillList.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (categoryIndex * 0.1) + (index * 0.05) }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{skill.icon}</span>
                            <span className="font-medium">{skill.name}</span>
                          </div>
                          <span className="text-sm text-gray-500">{skill.level}%</span>
                        </div>
                        <div className={`h-2 rounded-full ${
                          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                        }`}>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: (categoryIndex * 0.1) + (index * 0.05) + 0.2, duration: 0.8 }}
                            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className={`py-20 ${
          theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50/80'
        }`}>
          <div className="container mx-auto px-4">
            <motion.div
              {...fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Projets</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Découvrez mes réalisations récentes
              </p>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`} size={20} />
                  <input
                    type="text"
                    placeholder="Rechercher des projets..."
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
                  {['All', 'Mobile App', 'E-commerce', 'Web Platform'].map(category => (
                    <button
                      key={category}
                      onClick={() => setProjectFilter(category)}
                      className={`px-4 py-2 rounded-full transition-all duration-200 ${
                        projectFilter === category
                          ? 'bg-primary-600 text-white shadow-lg'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      {category === 'All' ? 'Tout' : category}
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
                {projects
                  .filter(project => 
                    projectFilter === 'All' || project.category === projectFilter
                  )
                  .filter(project =>
                    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    project.description.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className={`rounded-xl overflow-hidden shadow-lg ${
                        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                      } transition-all duration-300`}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                        />
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            project.status === 'completed'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>
                            {project.status === 'completed' ? 'Terminé' : 'En cours'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-md"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700"
                            onClick={() => trackEvent('project_link_click', { project: project.title })}
                          >
                            <Github size={16} />
                            <span className="text-sm">Code</span>
                          </motion.a>
                          
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-accent-600 dark:text-accent-400 hover:text-accent-700"
                            onClick={() => trackEvent('project_demo_click', { project: project.title })}
                          >
                            <ExternalLink size={16} />
                            <span className="text-sm">Demo</span>
                          </motion.a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className={`py-20 ${
          theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50/80'
        } backdrop-blur-sm`}>
          <div className="container mx-auto px-4">
            <motion.div
              {...fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Blog</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Articles et réflexions sur le développement
              </p>
            </motion.div>
            
            <Suspense fallback={
              <div className="text-center py-16">
                <Loader2 className="animate-spin mx-auto mb-4" size={48} />
                <p>Chargement des articles...</p>
              </div>
            }>
              <BlogSection />
            </Suspense>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className={`py-20 ${
          theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'
        }`}>
          <div className="container mx-auto px-4">
            <motion.div
              {...fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Galerie</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Captures d'écran de mes projets
              </p>
            </motion.div>
            
            <Suspense fallback={
              <div className="text-center py-16">
                <Loader2 className="animate-spin mx-auto mb-4" size={48} />
                <p>Chargement de la galerie...</p>
              </div>
            }>
              <Gallery />
            </Suspense>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={`py-20 ${
          theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50/80'
        }`}>
          <div className="container mx-auto px-4">
            <motion.div
              {...fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Contact</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Démarrons votre projet ensemble
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <motion.div
                {...fadeInUp}
                className="space-y-8"
              >
                <h3 className="text-2xl font-semibold mb-6">Informations de Contact</h3>
                
                <div className="space-y-6">
                  {[
                    { icon: Mail, label: "Email", value: personalInfo.email, action: () => copyToClipboard(personalInfo.email, 'email') },
                    { icon: Phone, label: "Téléphone", value: personalInfo.phone, action: () => copyToClipboard(personalInfo.phone, 'phone') },
                    { icon: MapPin, label: "Localisation", value: personalInfo.location, action: null }
                  ].map((contact, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      onClick={contact.action}
                      className={`flex items-center space-x-4 p-4 rounded-lg transition-all ${
                        contact.action 
                          ? 'cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-900/20' 
                          : ''
                      } ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}`}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                        <contact.icon className="text-white" size={24} />
                      </div>
                      <div>
                        <div className="font-medium">{contact.label}</div>
                        <div className="text-gray-600 dark:text-gray-400">{contact.value}</div>
                      </div>
                      {contact.action && (
                        <div className="ml-auto">
                          <Copy size={16} className="text-gray-400" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Quick Contact Buttons */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center justify-center space-x-2 p-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    onClick={() => trackEvent('contact_click', { method: 'email' })}
                  >
                    <Mail size={20} />
                    <span>Email</span>
                  </motion.a>
                  
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`https://wa.me/${personalInfo.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    onClick={() => trackEvent('contact_click', { method: 'whatsapp' })}
                  >
                    <MessageCircle size={20} />
                    <span>WhatsApp</span>
                  </motion.a>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                {...fadeInUp}
                transition={{ delay: 0.2 }}
              >
                <Suspense fallback={
                  <div className="text-center py-16">
                    <Loader2 className="animate-spin mx-auto mb-4" size={48} />
                    <p>Chargement du formulaire...</p>
                  </div>
                }>
                  <EnhancedContactForm />
                </Suspense>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-12 ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-gray-800'
        } text-white`}>
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">MG</span>
                  </div>
                  <span className="font-bold text-lg">MOMO GODI</span>
                </div>
                <p className="text-gray-400 mb-4">
                  Développeur Full Stack passionné par l'innovation et la transformation digitale.
                </p>
                <div className="flex space-x-4">
                  {Object.entries(personalInfo.social).map(([platform, url]) => (
                    <motion.a
                      key={platform}
                      whileHover={{ scale: 1.2 }}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary-400 transition-colors"
                    >
                      {platform === 'linkedin' && <Linkedin size={20} />}
                      {platform === 'github' && <Github size={20} />}
                      {platform === 'instagram' && <Instagram size={20} />}
                      {platform === 'twitter' && <Twitter size={20} />}
                    </motion.a>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Développement Web</li>
                  <li>Applications Mobile</li>
                  <li>Transformation Digitale</li>
                  <li>Consulting IT</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>{personalInfo.email}</li>
                  <li>{personalInfo.phone}</li>
                  <li>{personalInfo.location}</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 MOMO GODI YVAN. Tous droits réservés.</p>
            </div>
          </div>
        </footer>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {scrollY > 500 && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                trackEvent('scroll_to_top');
              }}
              className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg z-50 transition-colors ${
                theme === 'dark'
                  ? 'bg-primary-600 hover:bg-primary-700' 
                  : 'bg-accent-600 hover:bg-accent-700'
              } text-white transition-all`}
            >
              <ChevronDown className="rotate-180" size={24} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Notification for copied contact info */}
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg z-50 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              } flex items-center gap-2`}
            >
              <CheckCircle className="text-green-500" size={18} />
              <span className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                {copied === 'email' ? 'Email copié!' : 'Téléphone copié!'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Network Status Indicator */}
        {!isOnline && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg z-50"
          >
            <div className="flex items-center space-x-2">
              <WifiOff size={16} />
              <span>Mode hors ligne</span>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

// App Wrapper with Providers
const PortfolioWithProviders = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AnalyticsProvider>
          <Portfolio />
        </AnalyticsProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default PortfolioWithProviders;