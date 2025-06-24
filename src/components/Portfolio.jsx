import React, { useState, useEffect, useContext, createContext } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Menu, X, ChevronDown, Mail, Phone, MapPin, Linkedin, Github, ExternalLink,
  Download, Code, Database, Smartphone, Server, Award, Briefcase, GraduationCap,
  Users, Globe, Heart, Star, Calendar, CheckCircle, Filter, Search, MessageCircle,
  Sun, Moon, Languages, Eye, ArrowRight, Play, Pause, Volume2, VolumeX,
  Instagram, Twitter, Facebook, Youtube, Zap, Sparkles, Rocket, Target,
  TrendingUp, BarChart3, PieChart, Activity, Clock, BookOpen, FileText,
  Camera, Video, Image, Layers, Palette, Cpu, Cloud, Shield, Lock,
  Smartphone as Mobile, Tablet, Monitor, Headphones, Coffee, Pizza
} from 'lucide-react';

// Context for theme and language
const ThemeContext = createContext();
const LanguageContext = createContext();

// Theme Provider
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
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
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Language Provider
const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'fr';
    }
    return 'fr';
  });

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
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
      contact: 'Contact'
    },
    hero: {
      title: 'MOMO GODI YVAN',
      subtitle: 'Ingénieur en Génie Logiciel | Développeur Web & Mobile | Expert en Transformation Digitale',
      cta1: 'Me Contacter',
      cta2: 'Voir Mes Projets',
      location: 'Yaoundé, Cameroun',
      availability: 'Disponible Mondialement'
    },
    about: {
      title: 'À Propos de Moi',
      description1: 'Ingénieur en génie logiciel diplômé de l\'IAI Cameroun, parfaitement bilingue (français/anglais), spécialisé en développement web et mobile.',
      description2: 'Expert en transformation digitale avec une expérience confirmée dans la digitalisation d\'organisations communautaires.',
      years: 'Années d\'Expérience',
      projects: 'Projets Réalisés',
      women: 'Femmes Formées',
      languages: 'Langues Maîtrisées'
    },
    contact: {
      title: 'Contactez-Moi',
      subtitle: 'Prêt à collaborer sur votre prochain projet ? N\'hésitez pas à me contacter !',
      email: 'Envoyer un Email',
      whatsapp: 'WhatsApp',
      call: 'Appeler'
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
      contact: 'Contact'
    },
    hero: {
      title: 'MOMO GODI YVAN',
      subtitle: 'Software Engineer | Web & Mobile Developer | Digital Transformation Expert',
      cta1: 'Contact Me',
      cta2: 'View My Projects',
      location: 'Yaoundé, Cameroon',
      availability: 'Available Worldwide'
    },
    about: {
      title: 'About Me',
      description1: 'Software engineer graduated from IAI Cameroon, perfectly bilingual (French/English), specialized in web and mobile development.',
      description2: 'Digital transformation expert with proven experience in digitalizing community organizations.',
      years: 'Years of Experience',
      projects: 'Projects Completed',
      women: 'Women Trained',
      languages: 'Languages Mastered'
    },
    contact: {
      title: 'Contact Me',
      subtitle: 'Ready to collaborate on your next project? Feel free to reach out!',
      email: 'Send Email',
      whatsapp: 'WhatsApp',
      call: 'Call'
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

// Enhanced project data with galleries
const enhancedProjects = [
  {
    id: 1,
    title: "EAT FAST",
    description: "Application de livraison de nourriture 100% Camerounaise",
    longDescription: "Plateforme complète de livraison de repas conçue spécifiquement pour le marché camerounais, intégrant les solutions de paiement mobile money et la géolocalisation.",
    period: "Avril 2025 - Présent",
    status: "En développement",
    progress: 75,
    tech: ["React.js", "Django REST", "PostgreSQL", "React Native", "Mobile Money API"],
    features: [
      "Géolocalisation intégrée",
      "Paiement mobile money (Orange Money, MTN MoMo)",
      "Interface multilingue",
      "Notifications push en temps réel",
      "Système de tracking de commandes",
      "Dashboard analytics pour restaurants"
    ],
    category: "Mobile App",
    type: "Personal Project",
    github: "https://github.com/momoyvan/eat-fast",
    demo: "https://eat-fast-demo.vercel.app",
    images: [
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
      "/api/placeholder/800/600"
    ],
    video: "/api/placeholder/video",
    testimonial: {
      text: "Une solution innovante parfaitement adaptée au marché camerounais",
      author: "Client Test",
      role: "Restaurant Owner"
    }
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
      "Interface d'administration",
      "Cache Redis pour performance",
      "Tâches asynchrones avec Celery"
    ],
    category: "Web Application",
    type: "Personal Project",
    github: "https://github.com/momoyvan/django-portfolio",
    demo: "https://momoyvan-porfoloi.onrender.com",
    images: [
      "/api/placeholder/800/600",
      "/api/placeholder/800/600"
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
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
      "/api/placeholder/800/600"
    ],
    video: "/api/placeholder/video"
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
      "/api/placeholder/800/600",
      "/api/placeholder/800/600"
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
      "/api/placeholder/800/600"
    ]
  }
];

// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Guide Complet du Développement Web Moderne au Cameroun",
    slug: "guide-developpement-web-moderne-cameroun",
    excerpt: "Découvrez les meilleures pratiques et technologies pour le développement web adapté au contexte camerounais.",
    content: `# Guide Complet du Développement Web Moderne au Cameroun

Le développement web au Cameroun connaît une croissance remarquable. Dans cet article, nous explorons les technologies et approches les plus adaptées à notre contexte local.

## Technologies Recommandées

### Frontend
- **React.js** : Parfait pour les applications interactives
- **Vue.js** : Alternative excellente, plus simple à apprendre
- **Tailwind CSS** : Framework CSS utilitaire

### Backend
- **Django** : Idéal pour les applications complexes
- **Laravel** : Excellent pour le développement rapide
- **Node.js** : Parfait pour les applications temps réel

## Défis Locaux

### Connectivité Internet
- Optimisation pour les connexions lentes
- Mise en cache aggressive
- Progressive Web Apps (PWA)

### Paiements Mobile Money
- Intégration Orange Money
- API MTN Mobile Money
- Solutions hybrides

## Conclusion

Le développement web au Cameroun nécessite une approche adaptée à nos réalités locales tout en restant à la pointe de la technologie.`,
    author: "MOMO GODI YVAN",
    date: "2025-01-15",
    readTime: 8,
    tags: ["Web Development", "Cameroun", "React", "Django"],
    image: "/api/placeholder/800/400",
    featured: true
  },
  {
    id: 2,
    title: "L'IA et le Développement : Révolution ou Evolution ?",
    slug: "ia-developpement-revolution-evolution",
    excerpt: "Analyse de l'impact de l'intelligence artificielle sur le métier de développeur en Afrique.",
    content: `# L'IA et le Développement : Révolution ou Evolution ?

L'intelligence artificielle transforme notre façon de développer. Voici mon analyse de cette transformation.

## Impact sur les Développeurs

### Outils d'Assistance
- GitHub Copilot
- ChatGPT pour le code
- Outils de debugging automatisé

### Nouvelles Compétences Requises
- Prompt engineering
- Compréhension des modèles IA
- Ethics de l'IA

## Opportunités en Afrique

L'Afrique peut tirer parti de cette révolution pour accélérer son développement technologique.

## Conclusion

L'IA est un outil puissant qui augmente nos capacités plutôt que de nous remplacer.`,
    author: "MOMO GODI YVAN",
    date: "2025-01-10",
    readTime: 6,
    tags: ["IA", "Développement", "Afrique", "Innovation"],
    image: "/api/placeholder/800/400",
    featured: false
  },
  {
    id: 3,
    title: "Transformation Digitale des PME Camerounaises",
    slug: "transformation-digitale-pme-camerounaises",
    excerpt: "Stratégies pratiques pour digitaliser les petites et moyennes entreprises au Cameroun.",
    content: `# Transformation Digitale des PME Camerounaises

La digitalisation n'est plus un luxe mais une nécessité pour les PME camerounaises.

## Étapes Clés

### 1. Audit Digital
- Évaluation de l'existant
- Identification des besoins
- Définition des objectifs

### 2. Solutions Prioritaires
- Site web professionnel
- Présence sur les réseaux sociaux
- Outils de gestion clients

### 3. Formation des Équipes
- Sensibilisation aux outils digitaux
- Formation continue
- Support technique

## Cas d'Usage

### Radio Flambou Banka
Notre transformation de cette radio communautaire montre qu'avec les bonnes approches, même les structures rurales peuvent se digitaliser efficacement.

## ROI de la Digitalisation

Les entreprises qui se digitalisent voient en moyenne :
- +30% d'efficacité opérationnelle
- +25% de nouveaux clients
- +40% de satisfaction client

## Conclusion

La transformation digitale est un investissement rentable qui ouvre de nouvelles opportunités.`,
    author: "MOMO GODI YVAN",
    date: "2025-01-05",
    readTime: 10,
    tags: ["Transformation Digitale", "PME", "Cameroun", "Business"],
    image: "/api/placeholder/800/400",
    featured: true
  }
];

// 3D Icon Component
const Icon3D = ({ icon: IconComponent, className = "", animate = true }) => (
  <motion.div
    className={`relative ${className}`}
    whileHover={animate ? { 
      scale: 1.1,
      rotateY: 15,
      rotateX: 15,
      z: 50
    } : {}}
    transition={{ duration: 0.3 }}
    style={{
      transformStyle: 'preserve-3d',
      transformOrigin: 'center center'
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-lg blur-xl transform translate-z-[-10px]" />
    <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-lg shadow-lg">
      <IconComponent className="text-white" size={24} />
    </div>
  </motion.div>
);

// Project Filter Component
const ProjectFilter = ({ projects, onFilter, activeFilter }) => {
  const categories = ['All', ...new Set(projects.map(p => p.category))];
  
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onFilter(category)}
          className={`px-4 py-2 rounded-full transition-all duration-200 ${
            activeFilter === category
              ? 'bg-primary-600 text-white shadow-lg'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-gray-600'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

// Blog Card Component
const BlogCard = ({ post, t }) => (
  <motion.article
    whileHover={{ y: -10 }}
    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <div className="relative overflow-hidden">
      <img 
        src={post.image} 
        alt={post.title}
        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
      />
      {post.featured && (
        <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          ⭐ Featured
        </div>
      )}
    </div>
    
    <div className="p-6">
      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
        <span className="flex items-center gap-1">
          <Calendar size={16} />
          {new Date(post.date).toLocaleDateString('fr-FR')}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={16} />
          {post.readTime} min
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
            {tag}
          </span>
        ))}
      </div>
      
      <button className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors">
        Lire l'article
        <ArrowRight size={16} />
      </button>
    </div>
  </motion.article>
);

// Enhanced Portfolio Component
const EnhancedPortfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [projectFilter, setProjectFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState({});
  
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const t = translations[language];

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Personal Information
  const personalInfo = {
    name: "MOMO GODI YVAN",
    title: t.hero.subtitle,
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
    youtube: "https://youtube.com/@momoyvan"
  };

  // Enhanced Skills Data
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

  // Filter projects
  const filteredProjects = enhancedProjects.filter(project => {
    const matchesFilter = projectFilter === 'All' || project.category === projectFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Navigation items
  const navItems = [
    { id: 'home', label: t.nav.home, icon: Globe },
    { id: 'about', label: t.nav.about, icon: Users },
    { id: 'skills', label: t.nav.skills, icon: Code },
    { id: 'experience', label: t.nav.experience, icon: Briefcase },
    { id: 'projects', label: t.nav.projects, icon: Rocket },
    { id: 'blog', label: t.nav.blog, icon: BookOpen },
    { id: 'gallery', label: t.nav.gallery, icon: Camera },
    { id: 'education', label: t.nav.education, icon: GraduationCap },
    { id: 'contact', label: t.nav.contact, icon: MessageCircle }
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

  // Scroll to section
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

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

  // Google Analytics Effect
  useEffect(() => {
    // Google Analytics 4
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');
    `;
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-900'
    }`}>
      {/* Animated Background */}
      <motion.div
        className="fixed inset-0 opacity-30"
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
        {/* Floating Elements */}
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
              className={`text-xl md:text-2xl mb-8 leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {personalInfo.title}
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
                className={`border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                  theme === 'dark' ? 'hover:bg-primary-600' : ''
                }`}
              >
                <Rocket size={20} />
                {t.hero.cta2}
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
                <Zap size={16} className="text-green-500" />
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
                { icon: Linkedin, href: `https://${personalInfo.linkedin}`, color: 'hover:text-blue-600' },
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
            <motion.h2 
              {...fadeInUp}
              className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"
            >
              {t.about.title}
            </motion.h2>
            
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
                      className={`p-6 rounded-xl bg-gradient-to-br ${stat.color} text-white transform transition-all duration-300`}
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
                      className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-300 ${
                        theme === 'dark' 
                          ? 'bg-gray-700/50 hover:bg-gray-700' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <Icon3D icon={specialty.icon} className="flex-shrink-0" />
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
            <motion.h2 
              {...fadeInUp}
              className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"
            >
              Compétences Techniques
            </motion.h2>
            
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
                    {category === 'programming' ? 'Langages' : 
                     category === 'frameworks' ? 'Frameworks' :
                     category === 'databases' ? 'Bases de Données' : 'Outils'}
                  </h3>
                  <div className="space-y-6">
                    {skillList.map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <div className="flex justify-between items-center mb-2">
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
                        <div className={`w-full h-3 rounded-full overflow-hidden ${
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
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
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
            <motion.h2 
              {...fadeInUp}
              className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"
            >
              Projets & Réalisations
            </motion.h2>
            
            <motion.p
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className={`text-center text-lg mb-12 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Découvrez mes dernières créations et innovations technologiques
            </motion.p>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12">
              <div className="relative flex-1 max-w-md">
                <Search className={`absolute left-3 top-3 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} size={20} />
                <input
                  type="text"
                  placeholder="Rechercher un projet..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-primary-500`}
                />
              </div>
              <ProjectFilter 
                projects={enhancedProjects}
                onFilter={setProjectFilter}
                activeFilter={projectFilter}
              />
            </div>

            {/* Projects Grid */}
            <motion.div
              variants={stagger}
              animate="animate"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  {...fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer ${
                    theme === 'dark' 
                      ? 'bg-gray-800/70 hover:bg-gray-800' 
                      : 'bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedProject(project)}
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
                            Progression
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
                      Voir les détails
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
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
                  Aucun projet trouvé pour "{searchTerm}" dans la catégorie "{projectFilter}"
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
            <motion.h2 
              {...fadeInUp}
              className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"
            >
              Blog & Articles
            </motion.h2>
            
            <motion.p
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className={`text-center text-lg mb-12 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Mes réflexions sur la technologie, le développement et l'innovation en Afrique
            </motion.p>

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
              <button className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 mx-auto">
                <BookOpen size={20} />
                Voir tous les articles
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className={`py-20 ${
        theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'
      } backdrop-blur-sm`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <motion.h2 
              {...fadeInUp}
              className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"
            >
              Galerie & Réalisations
            </motion.h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(12)].map((_, index) => (
                <motion.div
                  key={index}
                  {...fadeInUp}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative group cursor-pointer rounded-lg overflow-hidden"
                >
                  <img
                    src={`/api/placeholder/400/300`}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="text-white p-2 rounded-full bg-white/20 backdrop-blur-sm">
                      <Eye size={24} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
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
                <motion.a
                  key={method.type}
                  href={method.href}
                  target={method.type === 'whatsapp' ? '_blank' : undefined}
                  rel={method.type === 'whatsapp' ? 'noopener noreferrer' : undefined}
                  {...fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:bg-white/20 group"
                >
                  <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <method.icon size={32} className="text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{method.label}</h3>
                  <p className="text-blue-100 text-sm">{method.value}</p>
                </motion.a>
              ))}
            </div>
            
            {/* Additional Contact Options */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.5 }}
              className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4">Disponibilité</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Disponible pour nouveaux projets</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={16} />
                    <span>Réponse sous 24h</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe size={16} />
                    <span>Travail à distance possible</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4">Services</h3>
                <div className="space-y-2 text-left text-sm">
                  <div>• Développement Web & Mobile</div>
                  <div>• Transformation Digitale</div>
                  <div>• Formation IT</div>
                  <div>• Consulting Technique</div>
                  <div>• Architecture Logicielle</div>
                </div>
              </div>
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
                Ingénieur en Génie Logiciel passionné par l'innovation technologique en Afrique.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Linkedin, href: `https://${personalInfo.linkedin}` },
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
              © 2025 MOMO GODI YVAN. Tous droits réservés.
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
              </div>
              
              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedProject.status === 'En développement' ? 'bg-yellow-100 text-yellow-800' :
                    selectedProject.status === 'Terminé' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {selectedProject.status}
                  </span>
                  <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedProject.category}
                  </span>
                </div>
                
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
                      Technologies utilisées
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
                      Fonctionnalités clés
                    </h3>
                    <ul className="space-y-2">
                      {selectedProject.features.slice(0, 4).map((feature, idx) => (
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
                
                {selectedProject.images.length > 1 && (
                  <div className="mb-8">
                    <h3 className={`text-xl font-semibold mb-4 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Captures d'écran
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedProject.images.slice(1).map((image, idx) => (
                        <img
                          key={idx}
                          src={image}
                          alt={`${selectedProject.title} screenshot ${idx + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      ))}
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
                    >
                      <Github size={20} />
                      Voir le code
                    </a>
                  )}
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                    >
                      <ExternalLink size={20} />
                      Voir la démo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Main App Component
const Portfolio = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <EnhancedPortfolio />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Portfolio;