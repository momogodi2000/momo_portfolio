import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Calendar, Clock, Eye, Heart, Share2, ArrowRight,
  BookOpen, Filter, Search, Facebook, Twitter, Linkedin, 
  Copy, Check, User, ArrowLeft, Sun, Moon, Wifi, WifiOff,
  Sparkles, Send, CheckCircle2, AlertCircle, Star, Tag,
  FileText, Download, ExternalLink, TrendingUp, MessageCircle,
  Users, Award, Globe
} from 'lucide-react';

// Enhanced blog posts data with local PDF links
const blogPosts = [
  {
    id: 1,
    title: "L'avenir du développement web en Afrique : Opportunités et défis",
    slug: "avenir-developpement-web-afrique",
    excerpt: "Analyse approfondie des tendances actuelles et des perspectives d'avenir pour le développement web sur le continent africain. Ce document examine les technologies émergentes, les défis infrastructurels, et les opportunités d'innovation dans l'écosystème tech africain.",
    fullDescription: "Une étude complète sur l'état actuel et les perspectives du développement web en Afrique, incluant une analyse des marchés émergents, des solutions mobiles innovantes, et des stratégies d'adaptation aux contraintes locales.",
    author: "MOMO GODI YVAN",
    date: '2025-01-20',
    readTime: 15,
    category: 'Développement Web',
    tags: ['Afrique', 'Développement Web', 'Innovation', 'Mobile First', 'Technologie'],
    image: "data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%234f46e5;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%237c3aed;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad1)'/%3E%3Ctext x='400' y='180' text-anchor='middle' fill='white' font-size='28' font-weight='bold' font-family='Arial'%3EDéveloppement Web%3C/text%3E%3Ctext x='400' y='220' text-anchor='middle' fill='white' font-size='24' font-family='Arial'%3EAfrique 2025%3C/text%3E%3C/svg%3E",
    featured: true,
    views: 2150,
    likes: 147,
    comments: 23,
    pdfPath: "/articles/L'avenir du développement web en Afrique _ Opportunités et défis.pdf",
    difficulty: "Intermédiaire",
    estimatedWords: 3500
  },
  {
    id: 2,
    title: "Guide complet : Créer une Progressive Web App avec React",
    slug: "guide-pwa-react",
    excerpt: "Tutoriel détaillé et pratique pour développer une PWA performante avec React. Incluant la configuration des service workers, l'optimisation des performances, les notifications push, et les meilleures pratiques pour une expérience utilisateur native.",
    fullDescription: "Un guide technique complet couvrant tous les aspects du développement PWA avec React, de la configuration initiale aux techniques avancées d'optimisation et de déploiement.",
    author: "MOMO GODI YVAN",
    date: '2025-01-15',
    readTime: 25,
    category: 'Tutoriel',
    tags: ['React', 'PWA', 'JavaScript', 'Mobile', 'Performance', 'Service Workers'],
    image: "data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2306b6d4;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%230891b2;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad2)'/%3E%3Ctext x='400' y='180' text-anchor='middle' fill='white' font-size='28' font-weight='bold' font-family='Arial'%3EPWA avec React%3C/text%3E%3Ctext x='400' y='220' text-anchor='middle' fill='white' font-size='20' font-family='Arial'%3EGuide Complet%3C/text%3E%3C/svg%3E",
    featured: false,
    views: 1890,
    likes: 134,
    comments: 45,
    pdfPath: "/articles/guide-pwa-react.pdf",
    difficulty: "Avancé",
    estimatedWords: 5200
  },
  {
    id: 3,
    title: "Intelligence Artificielle et développement : L'IA va-t-elle remplacer les développeurs ?",
    slug: "ia-developpeurs-avenir",
    excerpt: "Analyse critique et prospective de l'impact de l'intelligence artificielle sur le métier de développeur. Exploration des outils IA actuels, de leur intégration dans les workflows, et réflexion sur l'évolution nécessaire des compétences techniques et humaines.",
    fullDescription: "Une réflexion approfondie sur la transformation du métier de développeur à l'ère de l'IA, incluant des études de cas, des interviews d'experts, et des recommandations stratégiques pour l'évolution de carrière.",
    author: "MOMO GODI YVAN",
    date: '2025-01-10',
    readTime: 18,
    category: 'Intelligence Artificielle',
    tags: ['IA', 'Développement', 'Futur', 'Carrière', 'Automatisation', 'Compétences'],
    image: "data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f59e0b;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23d97706;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad3)'/%3E%3Ctext x='400' y='180' text-anchor='middle' fill='white' font-size='26' font-weight='bold' font-family='Arial'%3EIA et Développement%3C/text%3E%3Ctext x='400' y='220' text-anchor='middle' fill='white' font-size='18' font-family='Arial'%3EAvenir du Métier%3C/text%3E%3C/svg%3E",
    featured: true,
    views: 2340,
    likes: 189,
    comments: 67,
    pdfPath: "/articles/Intelligence Artificielle et développement _ L'IA va-t-elle remplacer les développeurs _.pdf",
    difficulty: "Intermédiaire",
    estimatedWords: 4100
  },
  {
    id: 4,
    title: "Transformation digitale des PME camerounaises : Guide pratique",
    slug: "transformation-digitale-pme-cameroun",
    excerpt: "Stratégies concrètes et méthodologie éprouvée pour accompagner les petites et moyennes entreprises camerounaises dans leur transition numérique. Cas d'études réels, outils recommandés, et approche step-by-step adaptée au contexte local.",
    fullDescription: "Un manuel pratique basé sur des expériences terrain pour guider les PME dans leur digitalisation, avec des études de cas camerounaises, des outils gratuits et accessibles, et une approche progressive.",
    author: "MOMO GODI YVAN",
    date: '2025-01-05',
    readTime: 22,
    category: 'Transformation Digitale',
    tags: ['PME', 'Cameroun', 'Digital', 'Business', 'Stratégie', 'Local'],
    image: "data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad4' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%238b5cf6;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%237c3aed;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad4)'/%3E%3Ctext x='400' y='170' text-anchor='middle' fill='white' font-size='24' font-weight='bold' font-family='Arial'%3ETransformation%3C/text%3E%3Ctext x='400' y='200' text-anchor='middle' fill='white' font-size='24' font-weight='bold' font-family='Arial'%3EDigitale PME%3C/text%3E%3Ctext x='400' y='230' text-anchor='middle' fill='white' font-size='18' font-family='Arial'%3ECameroun%3C/text%3E%3C/svg%3E",
    featured: false,
    views: 1450,
    likes: 98,
    comments: 34,
    pdfPath: "/articles/Transformation digitale des PME camerounaises _ Guide pratique.pdf",
    difficulty: "Débutant",
    estimatedWords: 4800
  },
  {
    id: 5,
    title: "Cybersécurité en Afrique : Enjeux et solutions pour les entreprises locales",
    slug: "cybersecurite-afrique-entreprises",
    excerpt: "État des lieux de la cybersécurité sur le continent africain et recommandations spécifiques pour les entreprises locales. Analyse des menaces courantes, solutions abordables, et stratégies de protection adaptées aux ressources limitées.",
    fullDescription: "Une étude complète sur les défis de cybersécurité en Afrique, avec des solutions pratiques et économiques pour les entreprises locales, incluant des frameworks de sécurité adaptés au contexte africain.",
    author: "MOMO GODI YVAN",
    date: '2024-12-28',
    readTime: 20,
    category: 'Cybersécurité',
    tags: ['Cybersécurité', 'Afrique', 'Entreprises', 'Sécurité', 'Protection', 'Local'],
    image: "data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad5' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23dc2626;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23b91c1c;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='url(%23grad5)'/%3E%3Ctext x='400' y='180' text-anchor='middle' fill='white' font-size='26' font-weight='bold' font-family='Arial'%3ECybersécurité%3C/text%3E%3Ctext x='400' y='220' text-anchor='middle' fill='white' font-size='20' font-family='Arial'%3EAfrique%3C/text%3E%3C/svg%3E",
    featured: false,
    views: 1120,
    likes: 76,
    comments: 19,
    pdfPath: "/articles/Cybersécurité en Afrique _ Enjeux et solutions pour les entreprises locales.pdf",
    difficulty: "Intermédiaire",
    estimatedWords: 3800
  },
];

// Simple theme hook - using in-memory storage instead of localStorage
const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return { theme, toggleTheme };
};

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
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

// Difficulty Badge Component
const DifficultyBadge = ({ difficulty, className = "" }) => {
  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Débutant':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Intermédiaire':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Avancé':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)} ${className}`}>
      {difficulty}
    </span>
  );
};

// Enhanced Blog Post Card Component
const BlogPostCard = ({ post, featured = false }) => {
  const { theme } = useTheme();
  const [isLiked, setIsLiked] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleReadPost = () => {
    // Open PDF in new tab for viewing (not downloading)
    if (post.pdfPath) {
      window.open(post.pdfPath, '_blank', 'noopener,noreferrer');
    } else {
      alert(`Article "${post.title}" sera bientôt disponible en PDF.`);
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    setIsSharing(true);
    
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.origin + '/blog/' + post.slug
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(shareData.url);
        alert('Lien copié dans le presse-papiers !');
      }
    } catch (error) {
      console.log('Error sharing:', error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer backdrop-blur-sm border ${
        theme === 'dark' 
          ? 'bg-gray-800/50 hover:bg-gray-800/70 border-gray-700/50' 
          : 'bg-white/70 hover:bg-white/90 border-gray-200/50'
      } ${featured ? 'md:col-span-2 lg:col-span-3' : ''}`}
      onClick={handleReadPost}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden w-full ${featured ? 'h-80' : 'h-48'}`}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        {/* Featured badge */}
        {post.featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Star size={14} />
            À la une
          </div>
        )}
        
        {/* Reading time and difficulty */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <Clock size={14} />
            {post.readTime} min
          </div>
          <DifficultyBadge difficulty={post.difficulty} />
        </div>
        
        {/* Category */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-primary-500/90 text-white px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
        </div>

        {/* PDF indicator */}
        <div className="absolute bottom-4 right-4 bg-blue-500/90 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
          <FileText size={12} />
          PDF
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col justify-between flex-1">
        {/* Meta information */}
        <div className={`flex items-center gap-4 text-sm mb-3 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye size={14} />
            <span>{post.views.toLocaleString()}</span>
          </div>
        </div>
        
        {/* Title */}
        <h3 className={`font-bold mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        } ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
          {post.title}
        </h3>
        
        {/* Excerpt */}
        <p className={`mb-4 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        } ${featured ? 'text-lg line-clamp-3' : 'line-clamp-2'}`}>
          {post.excerpt}
        </p>

        {/* Article Stats */}
        <div className={`flex items-center gap-4 text-sm mb-4 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <div className="flex items-center gap-1">
            <MessageCircle size={14} />
            <span>{post.comments} commentaires</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen size={14} />
            <span>~{post.estimatedWords} mots</span>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, featured ? 5 : 3).map((tag, index) => (
            <span
              key={index}
              className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
          {post.tags.length > (featured ? 5 : 3) && (
            <span className={`text-xs ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              +{post.tags.length - (featured ? 5 : 3)} more
            </span>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleReadPost}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors group/btn"
          >
            <ExternalLink size={16} />
            Voir l'article PDF
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`p-2 rounded-full transition-colors flex items-center gap-1 ${
                isLiked
                  ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
              }`}
            >
              <Heart size={16} className={isLiked ? 'fill-current' : ''} />
              <span className="text-xs">{post.likes + (isLiked ? 1 : 0)}</span>
            </button>
            <button 
              onClick={handleShare}
              disabled={isSharing}
              className="p-2 rounded-full text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors disabled:opacity-50"
            >
              {isSharing ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles size={16} />
                </motion.div>
              ) : (
                <Share2 size={16} />
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

// Enhanced Blog Filter Component
const BlogFilter = ({ categories, selectedCategory, onCategoryChange, searchTerm, onSearchChange }) => {
  const { theme } = useTheme();
  const [sortBy, setSortBy] = useState('date');

  return (
    <div className="space-y-6">
      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <Search className={`absolute left-3 top-3 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`} size={20} />
          <input
            type="text"
            placeholder="Rechercher des articles..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors backdrop-blur-sm ${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400' 
                : 'bg-white/70 border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-primary-500`}
          />
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <Filter size={18} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-4 py-2 rounded-lg border transition-colors backdrop-blur-sm ${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700 text-white' 
                : 'bg-white/70 border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-primary-500`}
          >
            <option value="date">Plus récents</option>
            <option value="views">Plus vus</option>
            <option value="likes">Plus aimés</option>
            <option value="comments">Plus commentés</option>
          </select>
        </div>
      </div>
      
      {/* Category filters */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 backdrop-blur-sm ${
            selectedCategory === 'all'
              ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
              : theme === 'dark' 
                ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700 border border-gray-700' 
                : 'bg-white/70 text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Toutes les catégories
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 backdrop-blur-sm ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
                : theme === 'dark' 
                  ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700 border border-gray-700' 
                  : 'bg-white/70 text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

// Enhanced Newsletter Signup Component
const NewsletterSignup = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <FloatingParticles />
      </div>
      
      <div className="max-w-md mx-auto text-center relative z-10">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-4xl mb-4"
        >
          📧
        </motion.div>
        
        <h3 className="text-2xl font-bold mb-4">
          Restez informé des nouveaux articles
        </h3>
        <p className="mb-6 text-blue-100">
          Recevez les derniers articles sur la technologie et l'innovation en Afrique directement dans votre boîte mail.
        </p>
        
        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            disabled={status === 'loading'}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 backdrop-blur-sm"
          />
          <motion.button
            onClick={handleSubmit}
            disabled={status === 'loading' || !email}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-6 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full"
                />
                Inscription...
              </>
            ) : (
              <>
                <Send size={16} />
                S'abonner à la newsletter
              </>
            )}
          </motion.button>
        </div>
        
        <AnimatePresence>
          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 text-green-200 flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={16} />
              Inscription réussie ! Vérifiez votre email.
            </motion.p>
          )}
        </AnimatePresence>
        
        <p className="mt-4 text-xs text-blue-200">
          Pas de spam, désabonnement possible à tout moment. Articles en PDF haute qualité.
        </p>
      </div>
    </motion.div>
  );
};

// Enhanced Blog Stats Component
const BlogStats = ({ posts }) => {
  const { theme } = useTheme();
  const totalViews = posts.reduce((sum, post) => sum + post.views, 0);
  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
  const totalComments = posts.reduce((sum, post) => sum + post.comments, 0);

  const stats = [
    { label: 'Articles publiés', value: posts.length, icon: BookOpen },
    { label: 'Vues totales', value: totalViews.toLocaleString(), icon: Eye },
    { label: 'Likes totaux', value: totalLikes.toLocaleString(), icon: Heart },
    { label: 'Commentaires', value: totalComments.toLocaleString(), icon: MessageCircle }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`text-center p-4 rounded-lg backdrop-blur-sm ${
            theme === 'dark' 
              ? 'bg-gray-800/30 border border-gray-700/50' 
              : 'bg-white/30 border border-gray-200/50'
          }`}
        >
          <stat.icon size={24} className="mx-auto mb-2 text-primary-600" />
          <div className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {stat.value}
          </div>
          <div className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Main Blog Component
const BlogPage = () => {
  
  const [posts] = useState(blogPosts);
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const { theme, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const categories = [...new Set(posts.map(post => post.category))];
  

  // Check online status
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

  // Filter posts
  useEffect(() => {
    let filtered = posts;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.fullDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
  }, [posts, selectedCategory, searchTerm]);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const handleReturnToPortfolio = () => {
    // In a real app, this would navigate to the portfolio page
    alert('Retour au portfolio - Cette fonctionnalité nécessite React Router dans votre application');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-900'
    }`}>
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
              <button  onClick={() => navigate("/")}
               className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                MOMO YVAN
              </button>
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
                <div className="flex items-center gap-1">
                  {isOnline ? (
                    <Wifi size={16} className="text-green-500" />
                  ) : (
                    <WifiOff size={16} className="text-red-500" />
                  )}
                </div>
              </div>
            </motion.div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'bg-gray-800 text-gray-300 hover:text-primary-400' 
                    : 'bg-gray-100 text-gray-600 hover:text-primary-600'
                }`}
              >
                <ArrowLeft size={18} />
                Retour au Portfolio
              </button>
            </div>
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
                    <BookOpen size={40} className="text-primary-600" />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.h1 
              {...fadeInUp}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 via-accent-600 to-purple-600 bg-clip-text text-transparent"
            >
              Blog Technique & Innovation
            </motion.h1>

            <motion.p 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className={`text-xl md:text-2xl mb-4 leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Articles PDF détaillés sur la technologie et l'innovation en Afrique
            </motion.p>

            <motion.p 
              {...fadeInUp}
              transition={{ delay: 0.3 }}
              className={`text-lg mb-8 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Découvrez mes analyses approfondies, guides pratiques et réflexions sur l'écosystème tech africain.
              Tous les articles sont disponibles en format PDF haute qualité.
            </motion.p>

            {/* Blog Stats */}
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.4 }}
            >
              <BlogStats posts={posts} />
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
            {/* Filters */}
            <motion.div
              {...fadeInUp}
              className="mb-12"
            >
              <BlogFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </motion.div>

            {/* No Results */}
            {filteredPosts.length === 0 ? (
              <motion.div
                {...fadeInUp}
                className="text-center py-16"
              >
                <div className={`text-6xl mb-4 ${
                  theme === 'dark' ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  📝
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Aucun article trouvé
                </h3>
                <p className={`${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Essayez de modifier vos filtres de recherche ou explorez d'autres catégories
                </p>
              </motion.div>
            ) : (
              <>
                {/* Featured Posts */}
                {featuredPosts.length > 0 && (
                  <motion.div
                    {...fadeInUp}
                    className="mb-16"
                  >
                    <h2 className={`text-3xl font-bold mb-8 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Articles en vedette
                    </h2>
                    <div className="grid gap-8">
                      {featuredPosts.map((post) => (
                        <BlogPostCard key={post.id} post={post} featured={true} />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Regular Posts Grid */}
                {regularPosts.length > 0 && (
                  <motion.div
                    {...fadeInUp}
                    transition={{ delay: 0.2 }}
                    className="mb-16"
                  >
                    <h2 className={`text-3xl font-bold mb-8 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Tous les articles
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {regularPosts.map((post) => (
                        <BlogPostCard key={post.id} post={post} />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Newsletter Signup */}
                <motion.div
                  {...fadeInUp}
                  transition={{ delay: 0.4 }}
                  className="mb-16"
                >
                  <NewsletterSignup />
                </motion.div>
              </>
            )}
          </div>
        </div>
      </section>

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

export default BlogPage;