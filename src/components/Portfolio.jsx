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

// Lazy load components
const EnhancedContactForm = lazy(() => import('./contact/EnhancedContactForm'));
const Gallery = lazy(() => import('./gallery/GalleryComponents'));
const BlogSection = lazy(() => import('./blog/BlogComponents'));
const ThreeDScene = lazy(() => import('./3d/ThreeDComponents'));
const SEOHead = lazy(() => import('./SEO/SEOHead'));

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
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

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
  
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'about', label: 'À Propos', icon: Users },
    { id: 'skills', label: 'Compétences', icon: Code },
    { id: 'projects', label: 'Projets', icon: Rocket },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'gallery', label: 'Galerie', icon: Image },
    { id: 'contact', label: 'Contact', icon: MessageCircle }
  ];

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
    <>
      <Suspense fallback={null}>
        <SEOHead 
          title="MOMO GODI YVAN - Portfolio Professionnel"
          description="Ingénieur en Génie Logiciel spécialisé en développement web et mobile, expert en transformation digitale au Cameroun."
          keywords="développeur web, ingénieur logiciel, React, Django, Laravel, Flutter, Cameroun, Yaoundé, transformation digitale"
        />
      </Suspense>

      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white' 
          : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-900'
      }`}>
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
                MOMO GODI YVAN
              </motion.h1>

              <motion.p 
                {...fadeInUp}
                transition={{ delay: 0.2 }}
                className={`text-xl md:text-2xl mb-4 leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Ingénieur en Génie Logiciel | Développeur Web & Mobile | Expert en Transformation Digitale
              </motion.p>

              <motion.p 
                {...fadeInUp}
                transition={{ delay: 0.3 }}
                className={`text-lg mb-8 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Passionné par l'innovation technologique au service du développement local camerounais
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
                  Me Contacter
                  <Sparkles size={16} className="animate-pulse" />
                </motion.button>
                <motion.button 
                  onClick={() => scrollToSection('projects')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 flex items-center gap-2`}
                >
                  <Rocket size={20} />
                  Voir Mes Projets
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
                  <span className="text-sm">Yaoundé, Cameroun</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={16} />
                  <span className="text-sm">Disponible Mondialement</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-500">En ligne</span>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                {...fadeInUp}
                transition={{ delay: 0.8 }}
                className="flex justify-center space-x-4 mt-8"
              >
                {[
                  { icon: Linkedin, href: "https://linkedin.com/in/momo-godi-yvan-206642244", color: 'hover:text-blue-600' },
                  { icon: Github, href: "https://github.com/momogodi2000", color: 'hover:text-gray-600' },
                  { icon: Instagram, href: "https://instagram.com/momoyvan", color: 'hover:text-pink-600' },
                  { icon: Twitter, href: "https://twitter.com/momoyvan", color: 'hover:text-blue-400' },
                  { icon: Youtube, href: "https://youtube.com/@momoyvan", color: 'hover:text-red-600' }
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
                  À Propos de Moi
                </h2>
                <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Innovation • Expertise • Impact
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
                    Ingénieur en génie logiciel diplômé de l'IAI Cameroun, parfaitement bilingue (français/anglais), spécialisé en développement web et mobile avec une approche centrée sur l'innovation et l'impact social.
                  </p>
                  
                  <p className={`text-lg leading-relaxed ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Expert en transformation digitale avec une expérience confirmée dans la digitalisation d'organisations communautaires et la formation numérique. Professeur de Karaté Wado Ryu, je conjugue discipline martiale et excellence technologique.
                  </p>

                  <div className="grid grid-cols-2 gap-6 mt-12">
                    {[
                      { number: '4+', label: 'Années d\'Expérience', icon: Calendar, color: 'from-blue-500 to-cyan-500' },
                      { number: '15+', label: 'Projets Réalisés', icon: Rocket, color: 'from-green-500 to-emerald-500' },
                      { number: '50+', label: 'Femmes Formées', icon: Users, color: 'from-purple-500 to-pink-500' },
                      { number: '3', label: 'Langues Maîtrisées', icon: Languages, color: 'from-orange-500 to-red-500' }
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
                  Projets & Réalisations
                </h2>
                <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Découvrez mes dernières créations et innovations technologiques
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
                {/* Project cards would be rendered here */}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className={`py-20 ${
          theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50/80'
        } backdrop-blur-sm`}>
          <div className="container mx-auto px-4">
            <Suspense fallback={<div className="text-center py-16">Chargement des articles...</div>}>
              <BlogSection />
            </Suspense>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className={`py-20 ${
          theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'
        } backdrop-blur-sm`}>
          <div className="container mx-auto px-4">
            <Suspense fallback={<div className="text-center py-16">Chargement de la galerie...</div>}>
              <Gallery />
            </Suspense>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gradient-to-r from-primary-600 via-accent-600 to-purple-600 text-white relative overflow-hidden">
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
            <Suspense fallback={<div className="text-center py-16">Chargement du formulaire...</div>}>
              <EnhancedContactForm />
            </Suspense>
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
                  Ingénieur en Génie Logiciel passionné par l'innovation technologique en Afrique.
                </p>
                <div className="flex space-x-4">
                  {[
                    { icon: Linkedin, href: "https://linkedin.com/in/momo-godi-yvan-206642244" },
                    { icon: Github, href: "https://github.com/momogodi2000" },
                    { icon: Twitter, href: "https://twitter.com/momoyvan" },
                    { icon: Instagram, href: "https://instagram.com/momoyvan" }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2 }}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-bold mb-4">Navigation</h4>
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
                <h4 className="font-bold mb-4">Services</h4>
                <div className="space-y-2 text-gray-400">
                  <div>Développement Web</div>
                  <div>Applications Mobile</div>
                  <div>Transformation Digitale</div>
                  <div>Formation IT</div>
                  <div>Consulting</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold mb-4">Contact</h4>
                <div className="space-y-2 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span className="text-sm">yvangodimomo@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    <span className="text-sm">+237695922065</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="mt-1" />
                    <span className="text-sm">Yaoundé, Cameroun</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8 text-center">
              <p className="text-gray-400 mb-4">
                © 2025 MOMO GODI YVAN. Tous droits réservés.
              </p>
              <p className="text-sm text-gray-500">
                Développé avec ❤️ utilisant React.js, Framer Motion & Tailwind CSS
              </p>
                       </div>
          </div>
        </footer>

        {/* 3D Scene (positioned fixed) */}
        <Suspense fallback={null}>
          <ThreeDScene />
        </Suspense>

        {/* Install PWA Prompt */}
        {installPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-xl z-50 max-w-xs ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="flex items-start gap-3">
              <Rocket className="text-primary-500 mt-1" size={20} />
              <div>
                <h4 className="font-bold mb-1">
                  Installer l'application
                </h4>
                <p className={`text-sm mb-3 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Ajoutez ce portfolio à votre écran d'accueil pour une meilleure expérience.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      installPWA();
                      trackEvent('pwa_install_dismiss');
                    }}
                    className="text-sm bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded"
                  >
                    Installer
                  </button>
                  <button
                    onClick={() => {
                      setInstallPrompt(null);
                      trackEvent('pwa_install_dismiss');
                    }}
                    className={`text-sm px-3 py-1 rounded ${
                      theme === 'dark' 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    Plus tard
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Back to Top Button */}
        <AnimatePresence>
          {activeSection !== 'home' && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollToSection('home')}
              className={`fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-40 ${
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
      </div>
    </>
  );
};

// App Wrapper with Providers
const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AnalyticsProvider>
          <EnhancedPortfolio />
        </AnalyticsProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;