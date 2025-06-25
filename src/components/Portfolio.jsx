import React, { useState, useEffect, useContext, createContext, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Menu, X, Mail, Phone, MapPin, Linkedin, Github, ExternalLink,
  Download, Code, Database, Smartphone, Server, Award, Briefcase, GraduationCap,
  Users, Globe, Heart, Star, Calendar, CheckCircle, Filter, Search, MessageCircle,
  Sun, Moon, Languages, Eye, ArrowRight, Play, Pause, Volume2, VolumeX,
  Instagram, Twitter, Facebook, Youtube, Zap, Sparkles, Rocket, Target,
  TrendingUp, BarChart3, PieChart, Activity, Clock, BookOpen, FileText,
  Camera, Video, Image, Layers, Palette, Cpu, Cloud, Shield, Lock,
  Send, CheckCircle2, AlertCircle, User, Building, MessageSquare,
  Copy, Check, Wifi, WifiOff, Loader2, Settings, Bell, Home, ExternalLink as LinkIcon
} from 'lucide-react';

// Import data from portfolioData
import {
  personalInfo,
  skills,
  experiences,
  projects,
  education,
  certifications,
  languages as languageSkills,
  interests,
  testimonials,
  socialLinks
} from '../data/portfolioData';

// Context for theme and language
const ThemeContext = createContext();
const LanguageContext = createContext();
const AnalyticsContext = createContext();

// Theme Provider
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

// Language Provider
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
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
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

// Translations
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
      title: personalInfo.name,
      subtitle: personalInfo.title,
      description: personalInfo.bio,
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
      description1: personalInfo.bio,
      years: 'Années d\'Expérience',
      projects: 'Projets Réalisés',
      formations: 'Formations Dispensées',
      languages: 'Langues Maîtrisées'
    },
    skills: {
      title: 'Compétences Techniques',
      subtitle: 'Maîtrise complète de l\'écosystème de développement moderne',
      programming: 'Langages',
      frameworks: 'Frameworks',
      databases: 'Bases de Données',
      tools: 'Outils & DevOps',
      level: 'Niveau'
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
    experience: {
      title: 'Expérience Professionnelle',
      subtitle: 'Mon parcours professionnel et mes réalisations',
      current: 'Actuel',
      achievements: 'Réalisations',
      technologies: 'Technologies'
    },
    contact: {
      title: 'Contactez-Moi',
      subtitle: 'Prêt à collaborer sur votre prochain projet ?',
      getInTouch: 'Entrer en Contact',
      visitContactPage: 'Visiter la Page Contact'
    },
    common: {
      loading: 'Chargement...',
      error: 'Une erreur s\'est produite',
      tryAgain: 'Réessayer',
      close: 'Fermer',
      search: 'Rechercher...',
      filter: 'Filtrer',
      all: 'Tout',
      readMore: 'Lire la suite',
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
      title: personalInfo.name,
      subtitle: personalInfo.title,
      description: personalInfo.bio,
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
      description1: personalInfo.bio,
      years: 'Years of Experience',
      projects: 'Projects Completed',
      formations: 'Training Sessions',
      languages: 'Languages Mastered'
    },
    skills: {
      title: 'Technical Skills',
      subtitle: 'Complete mastery of the modern development ecosystem',
      programming: 'Languages',
      frameworks: 'Frameworks',
      databases: 'Databases',
      tools: 'Tools & DevOps',
      level: 'Level'
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
    experience: {
      title: 'Professional Experience',
      subtitle: 'My professional journey and achievements',
      current: 'Current',
      achievements: 'Achievements',
      technologies: 'Technologies'
    },
    contact: {
      title: 'Contact Me',
      subtitle: 'Ready to collaborate on your next project?',
      getInTouch: 'Get in Touch',
      visitContactPage: 'Visit Contact Page'
    },
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      tryAgain: 'Try again',
      close: 'Close',
      search: 'Search...',
      filter: 'Filter',
      all: 'All',
      readMore: 'Read more',
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
              {skill.category}
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
        <div className="w-full h-48 bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center">
          <div className="text-white text-center">
            <Rocket size={48} className="mx-auto mb-2" />
            <div className="text-lg font-semibold">{project.title}</div>
          </div>
        </div>
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

const ExperienceCard = ({ experience, index, t }) => {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`relative pl-8 pb-8 ${
        index < experiences.length - 1 ? 'border-l-2 border-primary-200 dark:border-primary-800' : ''
      }`}
    >
      <div className="absolute -left-3 top-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
      
      <div className={`p-6 rounded-lg ${
        theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/70'
      } shadow-lg hover:shadow-xl transition-all duration-300`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h3 className={`text-xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {experience.title}
            </h3>
            <p className="text-primary-600 font-semibold">{experience.company}</p>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {experience.location}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              experience.current ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
              'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            }`}>
              {experience.current ? t.experience.current : experience.type}
            </span>
            <span className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {experience.period}
            </span>
          </div>
        </div>
        
        <p className={`mb-4 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {experience.description}
        </p>
        
        <div className="mb-4">
          <h4 className={`font-semibold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {t.experience.achievements}
          </h4>
          <ul className="space-y-1">
            {experience.achievements.map((achievement, idx) => (
              <li key={idx} className={`flex items-start gap-2 text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <CheckCircle size={14} className="text-green-500 mt-1 flex-shrink-0" />
                {achievement}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className={`font-semibold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {t.experience.technologies}
          </h4>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech, idx) => (
              <span 
                key={idx}
                className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Portfolio Component
const EnhancedPortfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [projectFilter, setProjectFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const { isOnline, trackEvent } = useAnalytics();
  
  const t = translations[language];
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // Navigation items
  const navItems = [
    { id: 'home', label: t.nav.home, icon: Home },
    { id: 'about', label: t.nav.about, icon: Users },
    { id: 'skills', label: t.nav.skills, icon: Code },
    { id: 'experience', label: t.nav.experience, icon: Briefcase },
    { id: 'projects', label: t.nav.projects, icon: Rocket },
    { id: 'contact', label: t.nav.contact, icon: MessageCircle, isLink: true, path: '/contact' }
  ];

  // Filter projects
  const filteredProjects = projects.filter(project => {
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

  const handleNavigation = (item) => {
    if (item.isLink) {
      navigate(item.path);
    } else {
      scrollToSection(item.id);
    }
  };

  const downloadResume = () => {
    trackEvent('resume_download', { category: 'conversion' });
    window.open('/resume.pdf', '_blank');
  };

  // Intersection Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.isLink) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    navItems.forEach((item) => {
      if (!item.isLink) {
        const element = document.getElementById(item.id);
        if (element) observer.observe(element);
      }
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
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                MOMO YVAN
              </Link>
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
                item.isLink ? (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`flex items-center gap-2 transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'text-gray-300 hover:text-primary-400' 
                        : 'text-gray-600 hover:text-primary-600'
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                ) : (
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
                )
              ))}
              <Link
                to="/blog"
                className={`flex items-center gap-2 transition-colors duration-200 ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-primary-400' 
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                <BookOpen size={18} />
                {t.nav.blog}
              </Link>
              <Link
                to="/gallery"
                className={`flex items-center gap-2 transition-colors duration-200 ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-primary-400' 
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                <Image size={18} />
                {t.nav.gallery}
              </Link>
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
                  item.isLink ? (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`flex items-center gap-3 w-full text-left py-3 transition-colors ${
                        theme === 'dark' 
                          ? 'text-gray-300 hover:text-primary-400' 
                          : 'text-gray-600 hover:text-primary-600'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon size={18} />
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item)}
                      className={`flex items-center gap-3 w-full text-left py-3 transition-colors ${
                        theme === 'dark' 
                          ? 'text-gray-300 hover:text-primary-400' 
                          : 'text-gray-600 hover:text-primary-600'
                      }`}
                    >
                      <item.icon size={18} />
                      {item.label}
                    </button>
                  )
                ))}
                <Link
                  to="/blog"
                  className={`flex items-center gap-3 w-full text-left py-3 transition-colors ${
                    theme === 'dark' 
                      ? 'text-gray-300 hover:text-primary-400' 
                      : 'text-gray-600 hover:text-primary-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BookOpen size={18} />
                  {t.nav.blog}
                </Link>
                <Link
                  to="/gallery"
                  className={`flex items-center gap-3 w-full text-left py-3 transition-colors ${
                    theme === 'dark' 
                      ? 'text-gray-300 hover:text-primary-400' 
                      : 'text-gray-600 hover:text-primary-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Image size={18} />
                  {t.nav.gallery}
                </Link>
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
              {t.hero.title}
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
                onClick={() => navigate('/contact')}
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
                onClick={() => window.open('public/CV.pdf', '_blank')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 flex items-center gap-2`}
              >
                <Eye size={20} /> {/* Using an eye icon for viewing */}
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
                <span className="text-sm">{personalInfo.location}</span>
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
              {socialLinks.map((social, index) => {
                const iconMap = {
                  linkedin: Linkedin,
                  github: Github,
                  globe: Globe,
                  mail: Mail
                };
                const IconComponent = iconMap[social.icon] || Globe;
                
                return (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -5 }}
                    className={`p-3 rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:text-primary-400`}
                    onClick={() => trackEvent('social_link_click', { category: 'social', label: social.name })}
                  >
                    <IconComponent size={24} />
                  </motion.a>
                );
              })}
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

                <div className="grid grid-cols-2 gap-6 mt-12">
                  {[
                    { number: '4+', label: t.about.years, icon: Calendar, color: 'from-blue-500 to-cyan-500' },
                    { number: `${projects.length}+`, label: t.about.projects, icon: Rocket, color: 'from-green-500 to-emerald-500' },
                    { number: '50+', label: t.about.formations, icon: Users, color: 'from-purple-500 to-pink-500' },
                    { number: `${languageSkills.length}`, label: t.about.languages, icon: Languages, color: 'from-orange-500 to-red-500' }
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
                    { icon: Database, text: "Gestion de Données", desc: "PostgreSQL, MongoDB, MySQL" },
                    { icon: Cloud, text: "DevOps & Cloud", desc: "Docker, Git, CI/CD" },
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

      {/* Experience Section */}
      <section id="experience" className={`py-20 ${
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
                {t.experience.title}
              </h2>
              <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {t.experience.subtitle}
              </p>
            </motion.div>

            <div className="space-y-0">
              {experiences.map((experience, index) => (
                <ExperienceCard 
                  key={experience.id} 
                  experience={experience} 
                  index={index} 
                  t={t}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 ${
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
                {['All', ...new Set(projects.map(p => p.category))].map(category => (
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
            className="max-w-4xl mx-auto text-center"
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
              className="text-xl mb-12 text-blue-100"
            >
              {t.contact.subtitle}
            </motion.p>
            
            {/* Contact Action */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.button
                onClick={() => navigate('/contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-200 flex items-center gap-3 shadow-lg"
              >
                <MessageCircle size={24} />
                {t.contact.getInTouch}
                <ArrowRight size={20} />
              </motion.button>
              
              <motion.a
                href={`mailto:${personalInfo.email}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-medium hover:bg-white/30 transition-all duration-200 flex items-center gap-3"
              >
                <Mail size={24} />
                {personalInfo.email}
              </motion.a>
            </motion.div>
            
            {/* Quick Contact Info */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.6 }}
              className="mt-12 flex flex-wrap justify-center gap-6"
            >
              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Phone size={16} />
                {personalInfo.phone}
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Github size={16} />
                GitHub
              </a>
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
                {personalInfo.bio.substring(0, 100)}...
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const iconMap = {
                    linkedin: Linkedin,
                    github: Github,
                    globe: Globe,
                    mail: Mail
                  };
                  const IconComponent = iconMap[social.icon] || Globe;
                  
                  return (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2 }}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <IconComponent size={20} />
                    </motion.a>
                  );
                })}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Navigation</h4>
              <div className="space-y-2">
                {navItems.slice(0, 5).map(item => (
                  item.isLink ? (
                    <Link
                      key={item.id}
                      to={item.path}
                      className="block text-gray-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="block text-gray-400 hover:text-white transition-colors text-left"
                    >
                      {item.label}
                    </button>
                  )
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
                  <span className="text-sm">{personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <span className="text-sm">{personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span className="text-sm">{personalInfo.location}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 mb-4">
              © 2025 {personalInfo.name}. Tous droits réservés.
            </p>
            <p className="text-sm text-gray-500">
              Développé avec ❤️ utilisant React.js, Framer Motion & Tailwind CSS
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
                <div className="w-full h-64 bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center">
                  <div className="text-white text-center">
                    <Rocket size={64} className="mx-auto mb-4" />
                    <div className="text-2xl font-bold">{selectedProject.title}</div>
                  </div>
                </div>
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
                  {selectedProject.longDescription || selectedProject.description}
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
                  {selectedProject.url && (
                    <a
                      href={selectedProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
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
    </div>
  );
};

// Main App Component with Providers
const Portfolio = () => {
  useEffect(() => {
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
  }, []);

  return (
    <AnalyticsProvider>
      <ThemeProvider>
        <LanguageProvider>
          <div className="App">
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-screen">
                <LoadingSpinner size="lg" />
              </div>
            }>
              <EnhancedPortfolio />
            </Suspense>
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </AnalyticsProvider>
  );
};

export default Portfolio;