// src/components/gallery/GalleryComponents.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX,
  Download, Share2, Heart, Eye, Calendar, Tag, Filter, Search,
  Grid3X3, Grid2X2, List, ZoomIn, ZoomOut, RotateCw, Info,
  ExternalLink, Copy, Check, Facebook, Twitter, Linkedin,
  Image as ImageIcon, Video, Camera, Folder, Star, Clock
} from 'lucide-react';
import { useAnalytics } from '../../utils/analytics';

// Gallery data structure
const galleryItems = [
  {
    id: 1,
    type: 'image',
    src: '/api/placeholder/800/600',
    thumbnail: '/api/placeholder/400/300',
    title: 'EAT FAST - Interface Mobile',
    description: 'Design de l\'application mobile de livraison de nourriture',
    category: 'Mobile Design',
    tags: ['React Native', 'UI/UX', 'Mobile'],
    date: '2025-01-15',
    project: 'EAT FAST',
    views: 1250,
    likes: 89,
    featured: true
  },
  {
    id: 2,
    type: 'video',
    src: '/api/placeholder/video',
    thumbnail: '/api/placeholder/800/450',
    title: 'Radio Flambou Banka - Démo',
    description: 'Démonstration de la plateforme web radio développée',
    category: 'Web Platform',
    tags: ['React', 'Node.js', 'Streaming'],
    date: '2025-01-10',
    project: 'Radio Flambou Banka',
    duration: '2:30',
    views: 890,
    likes: 67
  },
  {
    id: 3,
    type: 'image',
    src: '/api/placeholder/1200/800',
    thumbnail: '/api/placeholder/400/300',
    title: 'Formation ONG PROTEGE QV',
    description: 'Session de formation sécurité numérique pour femmes',
    category: 'Formation',
    tags: ['Formation', 'Cybersécurité', 'Femmes'],
    date: '2024-06-10',
    project: 'ONG PROTEGE QV',
    views: 650,
    likes: 45
  },
  {
    id: 4,
    type: 'image',
    src: '/api/placeholder/800/1000',
    thumbnail: '/api/placeholder/400/300',
    title: 'Dashboard Analytics',
    description: 'Interface d\'analytics pour plateforme e-learning',
    category: 'Web Design',
    tags: ['Dashboard', 'Analytics', 'Vue.js'],
    date: '2024-12-20',
    project: 'Formation Platform',
    views: 980,
    likes: 76
  },
  {
    id: 5,
    type: 'image',
    src: '/api/placeholder/900/600',
    thumbnail: '/api/placeholder/400/300',
    title: 'Smart City IoT Dashboard',
    description: 'Interface de monitoring urbain avec capteurs IoT',
    category: 'IoT Interface',
    tags: ['IoT', 'Dashboard', 'Smart City'],
    date: '2024-11-15',
    project: 'Smart City Yaoundé',
    views: 1100,
    likes: 92
  },
  {
    id: 6,
    type: 'video',
    src: '/api/placeholder/video',
    thumbnail: '/api/placeholder/800/450',
    title: 'Formation WordPress',
    description: 'Atelier WordPress pour entrepreneurs',
    category: 'Formation',
    tags: ['WordPress', 'Formation', 'CMS'],
    date: '2024-09-05',
    project: 'Formation IT',
    duration: '5:15',
    views: 750,
    likes: 58
  }
];

// Gallery Item Component
export const GalleryItem = ({ item, onSelect, viewMode = 'grid' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { trackButtonClick } = useAnalytics();

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    trackButtonClick('like_gallery_item', 'gallery');
  };

  const handleShare = (e) => {
    e.stopPropagation();
    // Share functionality
    trackButtonClick('share_gallery_item', 'gallery');
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        layoutId={`gallery-item-${item.id}`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.02 }}
        className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
        onClick={() => onSelect(item)}
      >
        <div className="relative w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover"
            onLoad={() => setIsLoaded(true)}
          />
          {item.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <Play size={20} className="text-white" />
            </div>
          )}
          {item.featured && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
              <Star size={12} className="inline mr-1" />
              Featured
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">{item.description}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {new Date(item.date).toLocaleDateString('fr-FR')}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={12} />
              {item.views}
            </span>
            <span className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded">
              {item.category}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <button
            onClick={handleLike}
            className={`p-2 rounded-full transition-colors ${
              isLiked ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart size={16} className={isLiked ? 'fill-current' : ''} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full text-gray-400 hover:text-primary-500 transition-colors"
          >
            <Share2 size={16} />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layoutId={`gallery-item-${item.id}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => onSelect(item)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onLoad={() => setIsLoaded(true)}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Type indicator */}
        <div className="absolute top-3 left-3">
          {item.type === 'video' ? (
            <div className="bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
              <Video size={12} />
              {item.duration}
            </div>
          ) : (
            <div className="bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
              <ImageIcon size={12} />
              Photo
            </div>
          )}
        </div>
        
        {/* Featured badge */}
        {item.featured && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Star size={12} />
            Featured
          </div>
        )}
        
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
        
        {/* Play button for videos */}
        {item.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Play size={24} className="text-white ml-1" />
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">{item.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{item.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                #{tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Eye size={12} />
              {item.views}
            </span>
            <span className="flex items-center gap-1">
              <Heart size={12} />
              {item.likes}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Gallery Filter Component
export const GalleryFilter = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  searchTerm, 
  onSearchChange,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange
}) => {
  return (
    <div className="space-y-4">
      {/* Search and View Mode */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher dans la galerie..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
          />
        </div>
        
        <div className="flex items-center gap-2">
          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="date">Plus récent</option>
            <option value="views">Plus vues</option>
            <option value="likes">Plus aimées</option>
            <option value="title">Titre A-Z</option>
          </select>
          
          {/* View mode toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white dark:bg-gray-600 shadow-sm' 
                  : 'hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Grid3X3 size={16} />
            </button>
            <button
              onClick={() => onViewModeChange('masonry')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'masonry' 
                  ? 'bg-white dark:bg-gray-600 shadow-sm' 
                  : 'hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Grid2X2 size={16} />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white dark:bg-gray-600 shadow-sm' 
                  : 'hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
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
          <Filter size={16} className="inline mr-2" />
          Tout
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

// Lightbox Component
export const Lightbox = ({ item, onClose, onNext, onPrev, hasNext, hasPrev }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const videoRef = useRef(null);
  const { trackButtonClick } = useAnalytics();

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = item.src;
    link.download = `${item.title}.${item.type === 'video' ? 'mp4' : 'jpg'}`;
    link.click();
    trackButtonClick('download_gallery_item', 'gallery');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.description,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copy URL
      await navigator.clipboard.writeText(window.location.href);
    }
    trackButtonClick('share_gallery_item', 'gallery');
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

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
        case ' ':
          e.preventDefault();
          if (item.type === 'video') togglePlayPause();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [item.type, isPlaying, hasNext, hasPrev, onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
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

        {/* Media content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="max-w-[90vw] max-h-[90vh] relative"
          onClick={(e) => e.stopPropagation()}
        >
          {item.type === 'video' ? (
            <div className="relative">
              <video
                ref={videoRef}
                src={item.src}
                className="max-w-full max-h-[80vh] rounded-lg"
                controls={false}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              
              {/* Video controls */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <button
                  onClick={togglePlayPause}
                  className="p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                
                <button
                  onClick={toggleMute}
                  className="p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
            </div>
          ) : (
            <img
              src={item.src}
              alt={item.title}
              className="max-w-full max-h-[80vh] rounded-lg"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
                transition: 'transform 0.3s ease'
              }}
            />
          )}
        </motion.div>

        {/* Toolbar */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
          {item.type === 'image' && (
            <>
              <button
                onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
                className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
              >
                <ZoomOut size={20} />
              </button>
              <button
                onClick={() => setZoom(Math.min(3, zoom + 0.25))}
                className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
              >
                <ZoomIn size={20} />
              </button>
              <button
                onClick={() => setRotation((rotation + 90) % 360)}
                className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
              >
                <RotateCw size={20} />
              </button>
            </>
          )}
          
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
          >
            <Info size={20} />
          </button>
          
          <button
            onClick={handleDownload}
            className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
          >
            <Download size={20} />
          </button>
          
          <button
            onClick={handleShare}
            className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
          >
            <Share2 size={20} />
          </button>
        </div>

        {/* Info panel */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="absolute top-0 right-0 bottom-0 w-80 bg-black/80 backdrop-blur-sm p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-gray-300 mb-4">{item.description}</p>
              
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-400">Projet:</span>
                  <span className="text-white ml-2">{item.project}</span>
                </div>
                <div>
                  <span className="text-gray-400">Catégorie:</span>
                  <span className="text-white ml-2">{item.category}</span>
                </div>
                <div>
                  <span className="text-gray-400">Date:</span>
                  <span className="text-white ml-2">{new Date(item.date).toLocaleDateString('fr-FR')}</span>
                </div>
                <div>
                  <span className="text-gray-400">Vues:</span>
                  <span className="text-white ml-2">{item.views}</span>
                </div>
                <div>
                  <span className="text-gray-400">J'aime:</span>
                  <span className="text-white ml-2">{item.likes}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <span className="text-gray-400 text-sm">Tags:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.tags.map((tag, index) => (
                    <span key={index} className="bg-white/20 text-white px-2 py-1 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

// Main Gallery Component
export const Gallery = () => {
  const [items, setItems] = useState(galleryItems);
  const [filteredItems, setFilteredItems] = useState(galleryItems);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('date');
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [...new Set(items.map(item => item.category))];

  // Filter and sort items
  useEffect(() => {
    let filtered = items;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'views':
          return b.views - a.views;
        case 'likes':
          return b.likes - a.likes;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredItems(filtered);
  }, [items, selectedCategory, searchTerm, sortBy]);

  const handleItemSelect = (item) => {
    const index = filteredItems.findIndex(i => i.id === item.id);
    setCurrentIndex(index);
    setSelectedItem(item);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setCurrentIndex(nextIndex);
    setSelectedItem(filteredItems[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedItem(filteredItems[prevIndex]);
  };

  const hasNext = currentIndex < filteredItems.length - 1;
  const hasPrev = currentIndex > 0;

  return (
    <div className="space-y-8">
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
      />

      {filteredItems.length === 0 ? (
        <div className="text-center py-16">
          <Camera size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Aucun élément trouvé
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Essayez de modifier vos filtres de recherche
          </p>
        </div>
      ) : (
        <motion.div
          layout
          className={
            viewMode === 'list' 
              ? 'space-y-4'
              : viewMode === 'masonry'
              ? 'columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6'
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          }
        >
          {filteredItems.map((item) => (
            <GalleryItem
              key={item.id}
              item={item}
              onSelect={handleItemSelect}
              viewMode={viewMode}
            />
          ))}
        </motion.div>
      )}

      {selectedItem && (
        <Lightbox
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onNext={handleNext}
          onPrev={handlePrev}
          hasNext={hasNext}
          hasPrev={hasPrev}
        />
      )}
    </div>
  );
};