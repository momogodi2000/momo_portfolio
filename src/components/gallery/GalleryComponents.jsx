import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX,
  Download, Share2, Heart, Eye, Calendar, Tag, Filter, Search,
  Grid3X3, Grid2X2, List, ZoomIn, ZoomOut, RotateCw, Info,
  ExternalLink, Copy, Check, Facebook, Twitter, Linkedin,
  Image as ImageIcon, Video, Camera, Folder, Star, Clock,
  ArrowLeft, Home, Sun, Moon, Wifi, WifiOff, Globe, MapPin,
  Code, Rocket, Users, MessageCircle, BookOpen, Sparkles,
  Github, Mail, Phone, Instagram, Youtube
} from 'lucide-react';

// Import data from portfolioData
import {
  personalInfo,
  projects,
  socialLinks
} from '../../data/portfolioData';

// Context for theme and language (same as main portfolio)
const ThemeContext = createContext();
const LanguageContext = createContext();

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

// Translations
const translations = {
  fr: {
    nav: {
      backToPortfolio: 'Retour au Portfolio'
    },
    hero: {
      title: 'Galerie de Projets',
      subtitle: 'Découvrez mes créations et réalisations',
      description: 'Une collection de mes projets, interfaces et moments marquants de mon parcours professionnel.',
      totalProjects: 'Projets au total',
      categories: 'Catégories'
    },
    gallery: {
      searchPlaceholder: 'Rechercher dans la galerie...',
      sortBy: 'Trier par',
      sortOptions: {
        date: 'Plus récent',
        title: 'Titre A-Z',
        category: 'Catégorie',
        status: 'Statut'
      },
      viewModes: {
        grid: 'Grille',
        masonry: 'Mosaïque',
        list: 'Liste'
      },
      filters: {
        all: 'Tout',
        webApp: 'Applications Web',
        mobileApp: 'Applications Mobile',
        design: 'Design',
        formation: 'Formation'
      },
      noResults: 'Aucun projet trouvé',
      noResultsDesc: 'Essayez de modifier vos filtres de recherche',
      featured: 'À la une',
      viewProject: 'Voir le projet',
      technologies: 'Technologies',
      status: 'Statut',
      period: 'Période',
      category: 'Catégorie',
      progress: 'Progression',
      achievements: 'Réalisations',
      features: 'Fonctionnalités'
    },
    lightbox: {
      close: 'Fermer',
      next: 'Suivant',
      previous: 'Précédent',
      download: 'Télécharger',
      share: 'Partager',
      info: 'Informations',
      zoomIn: 'Zoom avant',
      zoomOut: 'Zoom arrière',
      rotate: 'Rotation',
      project: 'Projet',
      date: 'Date',
      views: 'Vues',
      likes: 'J\'aime'
    },
    common: {
      loading: 'Chargement...',
      online: 'En ligne',
      offline: 'Hors ligne',
      error: 'Une erreur s\'est produite'
    }
  },
  en: {
    nav: {
      backToPortfolio: 'Back to Portfolio'
    },
    hero: {
      title: 'Project Gallery',
      subtitle: 'Discover my creations and achievements',
      description: 'A collection of my projects, interfaces and memorable moments from my professional journey.',
      totalProjects: 'Total Projects',
      categories: 'Categories'
    },
    gallery: {
      searchPlaceholder: 'Search in gallery...',
      sortBy: 'Sort by',
      sortOptions: {
        date: 'Most recent',
        title: 'Title A-Z',
        category: 'Category',
        status: 'Status'
      },
      viewModes: {
        grid: 'Grid',
        masonry: 'Masonry',
        list: 'List'
      },
      filters: {
        all: 'All',
        webApp: 'Web Apps',
        mobileApp: 'Mobile Apps',
        design: 'Design',
        formation: 'Training'
      },
      noResults: 'No projects found',
      noResultsDesc: 'Try modifying your search filters',
      featured: 'Featured',
      viewProject: 'View project',
      technologies: 'Technologies',
      status: 'Status',
      period: 'Period',
      category: 'Category',
      progress: 'Progress',
      achievements: 'Achievements',
      features: 'Features'
    },
    lightbox: {
      close: 'Close',
      next: 'Next',
      previous: 'Previous',
      download: 'Download',
      share: 'Share',
      info: 'Information',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      rotate: 'Rotate',
      project: 'Project',
      date: 'Date',
      views: 'Views',
      likes: 'Likes'
    },
    common: {
      loading: 'Loading...',
      online: 'Online',
      offline: 'Offline',
      error: 'An error occurred'
    }
  }
};

// Utility functions
const generateProjectImage = (project, type = 'main') => {
  const colors = [
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-purple-500',
    'from-teal-500 to-green-500'
  ];
  
  const icons = [Code, Rocket, Users, MessageCircle, BookOpen, Camera];
  const colorIndex = project.id % colors.length;
  const iconIndex = project.id % icons.length;
  const IconComponent = icons[iconIndex];
  
  return {
    gradient: colors[colorIndex],
    icon: IconComponent,
    color: `bg-gradient-to-br ${colors[colorIndex]}`
  };
};

const trackEvent = (eventName, properties = {}) => {
  // Analytics tracking placeholder
  console.log('Track event:', eventName, properties);
};

// Components
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary-400/30 rounded-full"
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 5 + Math.random() * 3,
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

// Gallery Item Component
const GalleryItem = ({ project, onSelect, viewMode = 'grid', t }) => {
  const { theme } = useTheme();
  const [isLiked, setIsLiked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const projectImage = generateProjectImage(project);

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    trackEvent('like_project', { projectId: project.id, projectTitle: project.title });
  };

  const handleShare = (e) => {
    e.stopPropagation();
    trackEvent('share_project', { projectId: project.id, projectTitle: project.title });
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        layoutId={`gallery-item-${project.id}`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.02 }}
        className={`flex gap-6 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer backdrop-blur-sm border ${
          theme === 'dark' 
            ? 'bg-gray-800/50 hover:bg-gray-800/70 border-gray-700/50' 
            : 'bg-white/70 hover:bg-white/90 border-gray-200/50'
        }`}
        onClick={() => onSelect(project)}
      >
        <div className="relative w-40 h-28 flex-shrink-0 rounded-lg overflow-hidden">
          <div className={`w-full h-full ${projectImage.color} flex items-center justify-center`}>
            <projectImage.icon size={32} className="text-white" />
          </div>
          <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <ImageIcon size={10} />
            Projet
          </div>
          {project.status === 'En développement' && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
              <Star size={10} />
              {t.gallery.featured}
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className={`font-bold text-xl mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {project.title}
          </h3>
          <p className={`text-sm mb-3 line-clamp-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {project.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {project.period}
            </span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              project.status === 'Terminé' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
              project.status === 'En développement' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
              'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
            }`}>
              {project.status}
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {project.tech.slice(0, 3).map((tech, idx) => (
              <span 
                key={idx}
                className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded text-xs"
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
        
        <div className="flex flex-col gap-2 justify-center">
          <button
            onClick={handleLike}
            className={`p-3 rounded-full transition-colors ${
              isLiked ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart size={20} className={isLiked ? 'fill-current' : ''} />
          </button>
          <button
            onClick={handleShare}
            className="p-3 rounded-full text-gray-400 hover:text-primary-500 transition-colors"
          >
            <Share2 size={20} />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layoutId={`gallery-item-${project.id}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer backdrop-blur-sm border ${
        theme === 'dark' 
          ? 'bg-gray-800/50 hover:bg-gray-800/70 border-gray-700/50' 
          : 'bg-white/70 hover:bg-white/90 border-gray-200/50'
      }`}
      onClick={() => onSelect(project)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className={`w-full h-full ${projectImage.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
          <div className="text-white text-center">
            <projectImage.icon size={48} className="mx-auto mb-2" />
            <div className="text-lg font-semibold">{project.title}</div>
          </div>
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            project.status === 'Terminé' ? 'bg-green-500/90 text-white' :
            project.status === 'En développement' ? 'bg-yellow-500/90 text-white' :
            'bg-blue-500/90 text-white'
          }`}>
            {project.status}
          </div>
        </div>
        
        {/* Category badge */}
        <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
          {project.category}
        </div>
        
        {/* Quick actions */}
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleLike}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Heart size={16} className={isLiked ? 'fill-current' : ''} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-colors"
          >
            <Share2 size={16} />
          </button>
        </div>
        
        {/* Progress indicator */}
        {project.progress && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${project.progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
            />
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className={`font-bold text-xl mb-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {project.title}
        </h3>
        
        <p className={`text-sm mb-4 line-clamp-2 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {project.description}
        </p>
        
        <div className={`text-sm mb-3 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {project.period}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {project.tech.slice(0, 2).map((tech, idx) => (
              <span 
                key={idx}
                className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded text-xs font-medium"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 2 && (
              <span className={`px-2 py-1 rounded text-xs ${
                theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
              }`}>
                +{project.tech.length - 2}
              </span>
            )}
          </div>
          
          {project.progress && (
            <div className="flex items-center gap-1 text-xs text-primary-600 font-medium">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              {project.progress}%
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Gallery Filter Component
const GalleryFilter = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  searchTerm, 
  onSearchChange,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  t
}) => {
  const { theme } = useTheme();

  return (
    <div className="space-y-6">
      {/* Search and Controls */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className={`absolute left-3 top-3 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`} size={20} />
          <input
            type="text"
            placeholder={t.gallery.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors backdrop-blur-sm ${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400' 
                : 'bg-white/70 border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-primary-500`}
          />
        </div>
        
        <div className="flex items-center gap-3">
          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className={`px-4 py-2 rounded-lg border transition-colors backdrop-blur-sm ${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700 text-white' 
                : 'bg-white/70 border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-primary-500`}
          >
            <option value="date">{t.gallery.sortOptions.date}</option>
            <option value="title">{t.gallery.sortOptions.title}</option>
            <option value="category">{t.gallery.sortOptions.category}</option>
            <option value="status">{t.gallery.sortOptions.status}</option>
          </select>
          
          {/* View mode toggle */}
          <div className={`flex rounded-lg p-1 ${
            theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100/70'
          } backdrop-blur-sm`}>
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-primary-600 text-white shadow-sm' 
                  : theme === 'dark' 
                    ? 'hover:bg-gray-700 text-gray-300' 
                    : 'hover:bg-gray-200 text-gray-600'
              }`}
              title={t.gallery.viewModes.grid}
            >
              <Grid3X3 size={16} />
            </button>
            <button
              onClick={() => onViewModeChange('masonry')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'masonry' 
                  ? 'bg-primary-600 text-white shadow-sm' 
                  : theme === 'dark' 
                    ? 'hover:bg-gray-700 text-gray-300' 
                    : 'hover:bg-gray-200 text-gray-600'
              }`}
              title={t.gallery.viewModes.masonry}
            >
              <Grid2X2 size={16} />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list' 
                  ? 'bg-primary-600 text-white shadow-sm' 
                  : theme === 'dark' 
                    ? 'hover:bg-gray-700 text-gray-300' 
                    : 'hover:bg-gray-200 text-gray-600'
              }`}
              title={t.gallery.viewModes.list}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Category filters */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
            selectedCategory === 'all'
              ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
              : theme === 'dark' 
                ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700 border border-gray-700' 
                : 'bg-white/70 text-gray-700 hover:bg-gray-100 border border-gray-200'
          } backdrop-blur-sm`}
        >
          <Filter size={16} />
          {t.gallery.filters.all}
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
                : theme === 'dark' 
                  ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700 border border-gray-700' 
                  : 'bg-white/70 text-gray-700 hover:bg-gray-100 border border-gray-200'
            } backdrop-blur-sm`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

// Project Detail Modal
const ProjectDetailModal = ({ project, onClose, onNext, onPrev, hasNext, hasPrev, t }) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const projectImage = generateProjectImage(project);

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (hasPrev) onPrev();
          break;
        case 'ArrowRight':
          if (hasNext) onNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [hasNext, hasPrev, onClose, onNext, onPrev]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
    trackEvent('share_project_modal', { projectId: project.id });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Navigation */}
        {hasPrev && (
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        
        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Modal content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-6xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`rounded-2xl shadow-2xl overflow-hidden ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            {/* Header with project image */}
            <div className="relative h-80">
              <div className={`w-full h-full ${projectImage.color} flex items-center justify-center`}>
                <div className="text-white text-center">
                  <projectImage.icon size={80} className="mx-auto mb-4" />
                  <div className="text-3xl font-bold">{project.title}</div>
                  <div className="text-lg opacity-90 mt-2">{project.category}</div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                    project.status === 'Terminé' ? 'bg-green-500/90 text-white' :
                    project.status === 'En développement' ? 'bg-yellow-500/90 text-white' :
                    'bg-blue-500/90 text-white'
                  }`}>
                    {project.status}
                  </div>
                  <div className="text-white/80 text-sm">{project.period}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleShare}
                    className="p-3 bg-white/20 text-white rounded-full hover:bg-white/30 backdrop-blur-sm transition-colors"
                  >
                    <Share2 size={20} />
                  </button>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/20 text-white rounded-full hover:bg-white/30 backdrop-blur-sm transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Tabs */}
              <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
                {[
                  { id: 'overview', label: 'Vue d\'ensemble', icon: Info },
                  { id: 'tech', label: t.gallery.technologies, icon: Code },
                  { id: 'features', label: t.gallery.features, icon: Star }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary-600 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <tab.icon size={16} />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="space-y-8">
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className={`text-2xl font-bold mb-4 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        Description
                      </h3>
                      <p className={`text-lg leading-relaxed ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {project.longDescription || project.description}
                      </p>
                    </div>

                    {project.progress && (
                      <div>
                        <h3 className={`text-xl font-semibold mb-4 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {t.gallery.progress}
                        </h3>
                        <div className="flex justify-between text-sm mb-2">
                          <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                            Avancement du projet
                          </span>
                          <span className="text-primary-600 font-medium">
                            {project.progress}%
                          </span>
                        </div>
                        <div className={`w-full h-3 rounded-full ${
                          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                        }`}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                          />
                        </div>
                      </div>
                    )}

                    {project.achievements && (
                      <div>
                        <h3 className={`text-xl font-semibold mb-4 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {t.gallery.achievements}
                        </h3>
                        <ul className="space-y-2">
                          {project.achievements.map((achievement, idx) => (
                            <li key={idx} className={`flex items-start gap-3 ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'tech' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className={`text-xl font-semibold mb-4 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {t.gallery.technologies}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {project.tech.map((tech, idx) => (
                          <span 
                            key={idx}
                            className="bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900 dark:to-accent-900 text-primary-800 dark:text-primary-200 px-4 py-2 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className={`font-semibold mb-3 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          Informations du projet
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                              {t.gallery.category}:
                            </span>
                            <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                              {project.category}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                              {t.gallery.status}:
                            </span>
                            <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                              {project.status}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                              {t.gallery.period}:
                            </span>
                            <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                              {project.period}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                              Type:
                            </span>
                            <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                              {project.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'features' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className={`text-xl font-semibold mb-6 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {t.gallery.features}
                      </h3>
                      <div className="grid gap-4">
                        {project.features?.map((feature, idx) => (
                          <div 
                            key={idx}
                            className={`p-4 rounded-lg border-l-4 border-primary-500 ${
                              theme === 'dark' ? 'bg-gray-700/50' : 'bg-primary-50'
                            }`}
                          >
                            <p className={`${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {feature}
                            </p>
                          </div>
                        )) || (
                          <p className={`text-center py-8 ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Fonctionnalités détaillées à venir...
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Main Gallery Component
const EnhancedGallery = () => {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('date');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  const t = translations[language];

  const categories = [...new Set(projects.map(project => project.category))];

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Filter and sort projects
  useEffect(() => {
    let filtered = projects;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.period.split(' - ')[0]) - new Date(a.period.split(' - ')[0]);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    setFilteredProjects(filtered);
  }, [selectedCategory, searchTerm, sortBy]);

  const handleProjectSelect = (project) => {
    const index = filteredProjects.findIndex(p => p.id === project.id);
    setCurrentIndex(index);
    setSelectedProject(project);
    trackEvent('view_project_detail', { projectId: project.id, projectTitle: project.title });
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % filteredProjects.length;
    setCurrentIndex(nextIndex);
    setSelectedProject(filteredProjects[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = currentIndex === 0 ? filteredProjects.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedProject(filteredProjects[prevIndex]);
  };

  const hasNext = currentIndex < filteredProjects.length - 1;
  const hasPrev = currentIndex > 0;

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

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
        <FloatingParticles />
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
                    <Wifi size={16} className="text-green-500" title={t.common.online} />
                  ) : (
                    <WifiOff size={16} className="text-red-500" title={t.common.offline} />
                  )}
                </div>
              </div>
            </motion.div>
            
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                theme === 'dark' 
                  ? 'bg-gray-800 text-gray-300 hover:text-primary-400' 
                  : 'bg-gray-100 text-gray-600 hover:text-primary-600'
              }`}
            >
              <ArrowLeft size={18} />
              {t.nav.backToPortfolio}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="relative w-32 h-32 mx-auto mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-primary-500 via-accent-500 to-purple-500 rounded-full p-1"
                >
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                    <Camera size={40} className="text-primary-600" />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.h1 
              {...fadeInUp}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 via-accent-600 to-purple-600 bg-clip-text text-transparent"
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
              className={`flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <div className="flex items-center gap-2">
                <Rocket size={16} />
                <span className="text-sm">{projects.length} {t.hero.totalProjects}</span>
              </div>
              <div className="flex items-center gap-2">
                <Folder size={16} />
                <span className="text-sm">{categories.length} {t.hero.categories}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className={`py-12 ${
        theme === 'dark' ? 'bg-gray-800/20' : 'bg-white/20'
      } backdrop-blur-sm`}>
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              {...fadeInUp}
              className="mb-12"
            >
              <GalleryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                sortBy={sortBy}
                onSortChange={setSortBy}
                t={t}
              />
            </motion.div>

            {filteredProjects.length === 0 ? (
              <motion.div
                {...fadeInUp}
                className="text-center py-16"
              >
                <div className={`text-6xl mb-4 ${
                  theme === 'dark' ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  🔍
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {t.gallery.noResults}
                </h3>
                <p className={`${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {t.gallery.noResultsDesc}
                </p>
              </motion.div>
            ) : (
              <motion.div
                layout
                className={
                  viewMode === 'list' 
                    ? 'space-y-6'
                    : viewMode === 'masonry'
                    ? 'columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6'
                    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                }
              >
                {filteredProjects.map((project, index) => (
                  <GalleryItem
                    key={project.id}
                    project={project}
                    onSelect={handleProjectSelect}
                    viewMode={viewMode}
                    t={t}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onNext={handleNext}
          onPrev={handlePrev}
          hasNext={hasNext}
          hasPrev={hasPrev}
          t={t}
        />
      )}

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
        <ArrowLeft size={20} className="rotate-90" />
      </motion.button>
    </div>
  );
};

// Main component with providers
const GalleryWithProviders = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <EnhancedGallery />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default GalleryWithProviders;