import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Calendar, Clock, Eye, Heart, Share2, ArrowRight,
  BookOpen, Filter, Search, Facebook, Twitter, Linkedin, 
  Copy, Check, User, ArrowLeft, Sun, Moon, Wifi, WifiOff,
  Sparkles, Send, CheckCircle2, AlertCircle, Star, Tag
} from 'lucide-react';

// Simple blog posts data
const blogPosts = [
  {
    id: 1,
    title: "L'avenir du développement web en Afrique : Opportunités et défis",
    slug: "avenir-developpement-web-afrique",
    excerpt: "Analyse des tendances actuelles et des perspectives d'avenir pour le développement web sur le continent africain, avec un focus sur les technologies émergentes.",
    author: "MOMO GODI YVAN",
    date: '2025-01-20',
    readTime: 8,
    category: 'Développement Web',
    tags: ['Afrique', 'Développement Web', 'Innovation', 'Mobile First'],
    image: "data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='400' fill='%23dbeafe'/%3E%3Ctext x='400' y='200' text-anchor='middle' fill='%231d4ed8' font-size='20' font-family='Arial'%3EDéveloppement Web Afrique%3C/text%3E%3C/svg%3E",
    featured: true,
    views: 1250,
    likes: 89
  },
  {
    id: 2,
    title: "Guide complet : Créer une Progressive Web App avec React",
    slug: "guide-pwa-react",
    excerpt: "Tutoriel détaillé pour développer une PWA performante avec React, incluant les service workers et les notifications push.",
    author: "MOMO GODI YVAN",
    date: '2025-01-15',
    readTime: 12,
    category: 'Tutoriel',
    tags: ['React', 'PWA', 'JavaScript', 'Mobile'],
    image: "data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='400' fill='%23dcfce7'/%3E%3Ctext x='400' y='200' text-anchor='middle' fill='%23166534' font-size='20' font-family='Arial'%3EPWA avec React%3C/text%3E%3C/svg%3E",
    featured: false,
    views: 890,
    likes: 67
  },
  {
    id: 3,
    title: "Intelligence Artificielle et développement : L'IA va-t-elle remplacer les développeurs ?",
    slug: "ia-developpeurs-avenir",
    excerpt: "Analyse approfondie de l'impact de l'IA sur le métier de développeur et l'évolution nécessaire des compétences.",
    author: "MOMO GODI YVAN",
    date: '2025-01-10',
    readTime: 10,
    category: 'Intelligence Artificielle',
    tags: ['IA', 'Développement', 'Futur', 'Carrière'],
    image: "data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='400' fill='%23fef3c7'/%3E%3Ctext x='400' y='200' text-anchor='middle' fill='%23d97706' font-size='20' font-family='Arial'%3EIA et Développement%3C/text%3E%3C/svg%3E",
    featured: true,
    views: 1100,
    likes: 92
  },
  {
    id: 4,
    title: "Transformation digitale des PME camerounaises : Guide pratique",
    slug: "transformation-digitale-pme-cameroun",
    excerpt: "Stratégies concrètes pour accompagner les petites et moyennes entreprises camerounaises dans leur transition numérique.",
    author: "MOMO GODI YVAN",
    date: '2025-01-05',
    readTime: 15,
    category: 'Transformation Digitale',
    tags: ['PME', 'Cameroun', 'Digital', 'Business'],
    image: "data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='400' fill='%23f3e8ff'/%3E%3Ctext x='400' y='200' text-anchor='middle' fill='%237c3aed' font-size='20' font-family='Arial'%3ETransformation Digitale%3C/text%3E%3C/svg%3E",
    featured: false,
    views: 750,
    likes: 58
  }
];

// Simple theme hook
const useTheme = () => {
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

// Blog Post Card Component
const BlogPostCard = ({ post, featured = false }) => {
  const { theme } = useTheme();
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const handleReadPost = () => {
    // For now, just show alert - you can implement full post view later
    alert(`Lecture de l'article: ${post.title}`);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Featured badge */}
        {post.featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Star size={14} />
            À la une
          </div>
        )}
        
        {/* Reading time */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
          <Clock size={14} />
          {post.readTime} min
        </div>
        
        {/* Category */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-primary-500/90 text-white px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
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
            <span>{post.views}</span>
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
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className={`text-xs ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              +{post.tags.length - 3} more
            </span>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleReadPost}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            Lire l'article
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`p-2 rounded-full transition-colors ${
                isLiked
                  ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
              }`}
            >
              <Heart size={16} className={isLiked ? 'fill-current' : ''} />
            </button>
            <button className="p-2 rounded-full text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
              <Share2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

// Blog Filter Component
const BlogFilter = ({ categories, selectedCategory, onCategoryChange, searchTerm, onSearchChange }) => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
      {/* Search */}
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

// Newsletter Signup Component
const NewsletterSignup = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
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
          Restez informé
        </h3>
        <p className="mb-6 text-blue-100">
          Recevez les derniers articles sur la technologie et l'innovation en Afrique.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            required
            disabled={status === 'loading'}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 backdrop-blur-sm"
          />
          <motion.button
            type="submit"
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
                S'abonner
              </>
            )}
          </motion.button>
        </form>
        
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
          Pas de spam, désabonnement possible à tout moment.
        </p>
      </div>
    </motion.div>
  );
};

// Main Blog Component
const BlogPage = () => {
  const [posts] = useState(blogPosts);
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isOnline, setIsOnline] = useState(true);

  const { theme, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const categories = [...new Set(posts.map(post => post.category))];

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

  const featuredPost = filteredPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

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
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <div className="flex items-center gap-1">
                  <Wifi size={16} className="text-green-500" />
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
              Retour au Portfolio
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
                    <BookOpen size={40} className="text-primary-600" />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.h1 
              {...fadeInUp}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 via-accent-600 to-purple-600 bg-clip-text text-transparent"
            >
              Blog & Articles
            </motion.h1>

            <motion.p 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className={`text-xl md:text-2xl mb-4 leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Mes réflexions sur la technologie et l'innovation
            </motion.p>

            <motion.p 
              {...fadeInUp}
              transition={{ delay: 0.3 }}
              className={`text-lg mb-8 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Découvrez mes articles sur le développement, la transformation digitale et l'écosystème tech africain.
            </motion.p>

            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.4 }}
              className={`flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <div className="flex items-center gap-2">
                <BookOpen size={16} />
                <span className="text-sm">{posts.length} Articles publiés</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag size={16} />
                <span className="text-sm">{categories.length} Catégories</span>
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
                  Essayez de modifier vos filtres de recherche
                </p>
              </motion.div>
            ) : (
              <>
                {/* Featured Post */}
                {featuredPost && (
                  <motion.div
                    {...fadeInUp}
                    className="mb-16"
                  >
                    <BlogPostCard post={featuredPost} featured={true} />
                  </motion.div>
                )}

                {/* Regular Posts Grid */}
                {regularPosts.length > 0 && (
                  <motion.div
                    {...fadeInUp}
                    transition={{ delay: 0.2 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
                  >
                    {regularPosts.map((post) => (
                      <BlogPostCard key={post.id} post={post} />
                    ))}
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