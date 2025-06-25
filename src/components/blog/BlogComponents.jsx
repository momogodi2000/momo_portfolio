// src/components/blog/BlogComponents.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  Calendar, Clock, Eye, Heart, Share2, MessageCircle, ArrowRight,
  BookOpen, Filter, Search, ChevronLeft, ChevronRight, Tag,
  Facebook, Twitter, Linkedin, Copy, Check, ExternalLink,
  TrendingUp, User, Globe, Bookmark, Download, Print
} from 'lucide-react';
import { useAnalytics } from '../../utils/analytics';

// Blog Post Card Component
export const BlogPostCard = ({ post, featured = false, compact = false }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { trackBlogRead, trackButtonClick } = useAnalytics();

  const handleReadPost = () => {
    trackBlogRead(post.title, post.readTime);
    trackButtonClick('read_blog_post', 'blog');
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    trackButtonClick('like_blog_post', 'blog');
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    trackButtonClick('bookmark_blog_post', 'blog');
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
        featured ? 'md:col-span-2 lg:col-span-3' : ''
      } ${compact ? 'flex flex-row' : 'flex flex-col'}`}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden ${
        compact ? 'w-1/3 flex-shrink-0' : 'w-full'
      } ${featured ? 'h-80' : compact ? 'h-32' : 'h-48'}`}>
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
            <TrendingUp size={14} />
            Featured
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
            {post.category || 'Article'}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className={`p-6 flex flex-col justify-between flex-1 bg-white dark:bg-gray-800 ${
        compact ? 'py-4' : ''
      }`}>
        {/* Meta information */}
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
          </div>
          {post.views && (
            <div className="flex items-center gap-1">
              <Eye size={14} />
              <span>{post.views}</span>
            </div>
          )}
        </div>
        
        {/* Title */}
        <h3 className={`font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors ${
          featured ? 'text-2xl md:text-3xl' : compact ? 'text-lg' : 'text-xl'
        }`}>
          {post.title}
        </h3>
        
        {/* Excerpt */}
        <p className={`text-gray-600 dark:text-gray-300 mb-4 ${
          featured ? 'text-lg line-clamp-3' : 'line-clamp-2'
        }`}>
          {post.excerpt}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-gray-500 text-xs">+{post.tags.length - 3} more</span>
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
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-full transition-colors ${
                isBookmarked
                  ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'
              }`}
            >
              <Bookmark size={16} className={isBookmarked ? 'fill-current' : ''} />
            </button>
            <ShareButton post={post} />
          </div>
        </div>
      </div>
    </motion.article>
  );
};

// Share Button Component
export const ShareButton = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { trackSocialShare } = useAnalytics();

  const shareUrl = `${window.location.origin}/blog/${post.slug}`;
  const shareText = `${post.title} - ${post.excerpt}`;

  const shareOptions = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'text-blue-600'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      color: 'text-blue-400'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: 'text-blue-700'
    }
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      trackSocialShare('copy_link', 'blog_post');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = (platform, url) => {
    window.open(url, '_blank', 'width=600,height=400');
    trackSocialShare(platform, 'blog_post');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
      >
        <Share2 size={16} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute right-0 bottom-full mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 z-10"
          >
            <div className="flex flex-col gap-1 min-w-[120px]">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => handleShare(option.name.toLowerCase(), option.url)}
                  className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${option.color}`}
                >
                  <option.icon size={16} />
                  <span className="text-sm">{option.name}</span>
                </button>
              ))}
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span className="text-sm">{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Blog Filter Component
export const BlogFilter = ({ categories, selectedCategory, onCategoryChange, searchTerm, onSearchChange }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Rechercher des articles..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
        />
      </div>
      
      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-gray-600'
          }`}
        >
          Tous
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

// Blog Pagination Component
export const BlogPagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`min-w-[40px] h-10 rounded-lg font-medium transition-colors ${
            page === currentPage
              ? 'bg-primary-600 text-white'
              : page === '...'
              ? 'text-gray-400 cursor-default'
              : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

// Blog Post Content Component
export const BlogPostContent = ({ post }) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const { trackBlogRead } = useAnalytics();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Track reading progress
    const timer = setTimeout(() => {
      trackBlogRead(post.title, post.readTime);
    }, 30000); // Track after 30 seconds

    return () => clearTimeout(timer);
  }, [post.title, post.readTime, trackBlogRead]);

  const components = {
    code({node, inline, className, children, ...props}) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
  };

  return (
    <article className="max-w-4xl mx-auto">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>
      
      {/* Header */}
      <header className="mb-12">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full text-sm font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
          <div className="flex items-center gap-2">
            <User size={20} />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={20} />
            <span>{new Date(post.date).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={20} />
            <span>{post.readTime} min de lecture</span>
          </div>
          {post.views && (
            <div className="flex items-center gap-2">
              <Eye size={20} />
              <span>{post.views} vues</span>
            </div>
          )}
        </div>
        
        {post.image && (
          <div className="rounded-2xl overflow-hidden mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        )}
      </header>
      
      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <ReactMarkdown components={components}>
          {post.content}
        </ReactMarkdown>
      </div>
      
      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-gray-600 dark:text-gray-400">Partager cet article:</span>
            <ShareButton post={post} />
          </div>
          
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <Download size={16} />
              <span className="text-sm">Télécharger PDF</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Print size={16} />
              <span className="text-sm">Imprimer</span>
            </button>
          </div>
        </div>
      </footer>
    </article>
  );
};

// Related Posts Component
export const RelatedPosts = ({ currentPost, allPosts, maxPosts = 3 }) => {
  const getRelatedPosts = () => {
    const filtered = allPosts.filter(post => post.id !== currentPost.id);
    
    // Score posts based on shared tags
    const scored = filtered.map(post => {
      const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag));
      return {
        ...post,
        score: sharedTags.length
      };
    });
    
    // Sort by score and return top results
    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, maxPosts);
  };

  const relatedPosts = getRelatedPosts();

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        Articles similaires
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} compact />
        ))}
      </div>
    </section>
  );
};

// Blog Newsletter Signup Component
export const BlogNewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const { trackNewsletterSignup } = useAnalytics();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // Here you would integrate with your newsletter service
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setStatus('success');
      setEmail('');
      trackNewsletterSignup('blog_inline');
      
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white">
      <div className="max-w-md mx-auto text-center">
        <h3 className="text-2xl font-bold mb-4">
          Restez informé
        </h3>
        <p className="mb-6 text-blue-100">
          Recevez les derniers articles sur la technologie et l'innovation en Afrique directement dans votre boîte mail.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            required
            disabled={status === 'loading'}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'loading' || !email}
            className="w-full px-6 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {status === 'loading' ? 'Inscription...' : 'S\'abonner'}
          </button>
        </form>
        
        {status === 'success' && (
          <p className="mt-4 text-green-200">
            ✅ Inscription réussie ! Vérifiez votre email.
          </p>
        )}
        
        {status === 'error' && (
          <p className="mt-4 text-red-200">
            ❌ Erreur lors de l'inscription. Réessayez.
          </p>
        )}
        
        <p className="mt-4 text-xs text-blue-200">
          Pas de spam, désabonnement possible à tout moment.
        </p>
      </div>
    </div>
  );
};