import React, { useState, useEffect, useContext, createContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Send, CheckCircle, AlertCircle, User, Mail, MessageCircle, Phone, MapPin,
  ArrowLeft, Home, Sun, Moon, Wifi, WifiOff, Globe, Calendar, Clock, 
  Building, Briefcase, Star, Heart, Sparkles, Rocket, Target, 
  Linkedin, Github, Instagram, Twitter, ExternalLink, Copy, Check
} from 'lucide-react';

// Import personal info from portfolioData
import { personalInfo, socialLinks } from '../data/portfolioData';

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
      home: 'Accueil',
      backToPortfolio: 'Retour au Portfolio'
    },
    hero: {
      title: 'Contactez-Moi',
      subtitle: 'Discutons de votre prochain projet',
      description: 'Je suis toujours ravi de discuter de nouveaux projets, d\'idées créatives ou d\'opportunités de collaboration.',
      availability: 'Disponible pour nouveaux projets',
      responseTime: 'Réponse sous 24h'
    },
    form: {
      title: 'Envoyez-moi un message',
      subtitle: 'Remplissez le formulaire ci-dessous et je vous répondrai rapidement.',
      name: 'Nom complet',
      namePlaceholder: 'Votre nom complet',
      email: 'Adresse email',
      emailPlaceholder: 'votre@email.com',
      subject: 'Sujet',
      subjectPlaceholder: 'Sujet de votre message',
      message: 'Message',
      messagePlaceholder: 'Décrivez votre projet ou votre message...',
      send: 'Envoyer le message',
      sending: 'Envoi en cours...',
      required: 'Champ requis',
      invalidEmail: 'Format d\'email invalide',
      messageLength: 'Le message doit contenir au moins 10 caractères',
      characterCount: 'caractères',
      successTitle: 'Message envoyé avec succès !',
      successMessage: 'Merci pour votre message. Je vous répondrai dans les plus brefs délais.',
      errorTitle: 'Erreur d\'envoi',
      errorMessage: 'Une erreur s\'est produite lors de l\'envoi. Veuillez réessayer ou me contacter directement.',
      callPreference: 'Vous préférez m\'appeler ?'
    },
    contact: {
      info: 'Informations de Contact',
      directContact: 'Contact Direct',
      office: 'Bureau',
      availability: 'Disponibilité',
      response: 'Temps de Réponse',
      location: 'Localisation',
      services: 'Services Offerts',
      workingHours: 'Heures de Travail',
      mondayFriday: 'Lun - Ven: 8h00 - 18h00',
      saturday: 'Sam: 9h00 - 15h00',
      sunday: 'Dim: Sur rendez-vous'
    },
    services: [
      'Développement Web & Mobile',
      'Transformation Digitale',
      'Formation IT',
      'Consulting Technique',
      'Architecture Logicielle',
      'Support & Maintenance'
    ],
    common: {
      loading: 'Chargement...',
      online: 'En ligne',
      offline: 'Hors ligne',
      copy: 'Copier',
      copied: 'Copié !',
      newTab: 'Ouvrir dans un nouvel onglet'
    }
  },
  en: {
    nav: {
      home: 'Home',
      backToPortfolio: 'Back to Portfolio'
    },
    hero: {
      title: 'Contact Me',
      subtitle: 'Let\'s discuss your next project',
      description: 'I\'m always excited to discuss new projects, creative ideas, or collaboration opportunities.',
      availability: 'Available for new projects',
      responseTime: 'Response within 24h'
    },
    form: {
      title: 'Send me a message',
      subtitle: 'Fill out the form below and I\'ll get back to you quickly.',
      name: 'Full name',
      namePlaceholder: 'Your full name',
      email: 'Email address',
      emailPlaceholder: 'your@email.com',
      subject: 'Subject',
      subjectPlaceholder: 'Subject of your message',
      message: 'Message',
      messagePlaceholder: 'Describe your project or message...',
      send: 'Send message',
      sending: 'Sending...',
      required: 'Required field',
      invalidEmail: 'Invalid email format',
      messageLength: 'Message must contain at least 10 characters',
      characterCount: 'characters',
      successTitle: 'Message sent successfully!',
      successMessage: 'Thank you for your message. I will respond to you as soon as possible.',
      errorTitle: 'Sending error',
      errorMessage: 'An error occurred while sending. Please try again or contact me directly.',
      callPreference: 'Prefer to call me?'
    },
    contact: {
      info: 'Contact Information',
      directContact: 'Direct Contact',
      office: 'Office',
      availability: 'Availability',
      response: 'Response Time',
      location: 'Location',
      services: 'Services Offered',
      workingHours: 'Working Hours',
      mondayFriday: 'Mon - Fri: 8:00 AM - 6:00 PM',
      saturday: 'Sat: 9:00 AM - 3:00 PM',
      sunday: 'Sun: By appointment'
    },
    services: [
      'Web & Mobile Development',
      'Digital Transformation',
      'IT Training',
      'Technical Consulting',
      'Software Architecture',
      'Support & Maintenance'
    ],
    common: {
      loading: 'Loading...',
      online: 'Online',
      offline: 'Offline',
      copy: 'Copy',
      copied: 'Copied!',
      newTab: 'Open in new tab'
    }
  }
};

// Utility functions
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Google Sheets API configuration
const GOOGLE_SHEETS_CONFIG = {
  // Replace with your Google Apps Script Web App URL
  scriptURL: 'https://script.google.com/macros/s/AKfycbyFTY9qHd9D8q02l0X59decWDGGB9tKJL-zyisgbxcfWxB8DfZcxsRJuLll9Rq03fmS/exec',
  // You'll need to create a Google Apps Script web app with this code:
  /*
  function doPost(e) {
    try {
      const sheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID').getActiveSheet();
      const data = JSON.parse(e.postData.contents);
      
      sheet.appendRow([
        new Date(),
        data.name,
        data.email,
        data.subject,
        data.message,
        data.userAgent || 'N/A',
        data.timestamp || new Date().toISOString()
      ]);
      
      return ContentService
        .createTextOutput(JSON.stringify({success: true, message: 'Data saved successfully'}))
        .setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
      return ContentService
        .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }
  */
};

// Contact form submission function
const submitToGoogleSheets = async (formData) => {
  try {
    const payload = {
      ...formData,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer || window.location.href
    };

    const response = await fetch(GOOGLE_SHEETS_CONFIG.scriptURL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    throw error;
  }
};

// Components
const ContactMethod = ({ method, t, onCopy }) => {
  const { theme } = useTheme();

  const handleClick = () => {
    if (method.type === 'copy') {
      onCopy(method.value, method.type);
    } else if (method.href) {
      if (method.external) {
        window.open(method.href, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = method.href;
      }
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={`p-6 rounded-xl transition-all duration-300 cursor-pointer ${
        theme === 'dark' 
          ? 'bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700/50' 
          : 'bg-white/70 hover:bg-white/90 border border-gray-200/50'
      } backdrop-blur-sm shadow-lg hover:shadow-xl`}
    >
      <div className={`w-12 h-12 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
        <method.icon size={24} className="text-white" />
      </div>
      <h3 className={`font-bold text-lg mb-2 text-center ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        {method.label}
      </h3>
      <p className={`text-center ${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {method.value}
      </p>
      {method.description && (
        <p className={`text-sm text-center mt-2 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {method.description}
        </p>
      )}
    </motion.div>
  );
};

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
        Vous êtes hors ligne. Le formulaire sera envoyé une fois la connexion rétablie.
      </div>
    </motion.div>
  );
};

// Main Contact Form Component
const EnhancedContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [copied, setCopied] = useState('');
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  const t = translations[language];

  // Contact methods
  const contactMethods = [
    {
      type: 'email',
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      icon: Mail,
      color: 'bg-blue-500',
      description: t.contact.response + ': < 24h'
    },
    {
      type: 'phone',
      label: 'Téléphone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      icon: Phone,
      color: 'bg-green-500',
      description: 'Appel direct'
    },
    {
      type: 'whatsapp',
      label: 'WhatsApp',
      value: personalInfo.phone,
      href: `https://wa.me/${personalInfo.phone.replace(/[^0-9]/g, '')}`,
      icon: MessageCircle,
      color: 'bg-emerald-500',
      external: true,
      description: 'Message instantané'
    },
    {
      type: 'location',
      label: t.contact.location,
      value: 'Yaoundé, Cameroun',
      icon: MapPin,
      color: 'bg-purple-500',
      description: 'Bureau principal'
    }
  ];

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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t.form.required;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t.form.required;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = t.form.invalidEmail;
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = t.form.required;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t.form.required;
    } else if (formData.message.length < 10) {
      newErrors.message = t.form.messageLength;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (!isOnline) {
      setSubmitStatus('offline');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Submit to Google Sheets
      const result = await submitToGoogleSheets(formData);
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Also create mailto link as backup
        const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
          `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )}`;
        
        // Optional: Open mailto link
        // window.location.href = mailtoLink;
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      
      // Fallback to mailto
      const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoLink;
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const inputClasses = `
    w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-primary-500/20
    ${theme === 'dark' 
      ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-primary-400' 
      : 'bg-white/70 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-primary-500'
    }
    backdrop-blur-sm
  `;

  const errorClasses = `border-red-400 focus:border-red-500`;

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
                    <MessageCircle size={40} className="text-primary-600" />
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
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-500">{t.hero.availability}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span className="text-sm">{t.hero.responseTime}</span>
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
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Form */}
              <motion.div
                {...fadeInUp}
                className={`rounded-2xl shadow-2xl p-8 ${
                  theme === 'dark' 
                    ? 'bg-gray-800/50 border border-gray-700/50' 
                    : 'bg-white/70 border border-gray-200/50'
                } backdrop-blur-sm`}
              >
                <div className="text-center mb-8">
                  <h2 className={`text-3xl font-bold mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {t.form.title}
                  </h2>
                  <p className={`${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {t.form.subtitle}
                  </p>
                </div>

                {/* Status Messages */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 mb-6 rounded-lg"
                    >
                      <div className="flex items-center">
                        <CheckCircle className="text-green-500 mr-3" size={20} />
                        <div>
                          <p className="text-green-800 dark:text-green-200 font-semibold">
                            {t.form.successTitle}
                          </p>
                          <p className="text-green-700 dark:text-green-300 text-sm">
                            {t.form.successMessage}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 mb-6 rounded-lg"
                    >
                      <div className="flex items-center">
                        <AlertCircle className="text-red-500 mr-3" size={20} />
                        <div>
                          <p className="text-red-800 dark:text-red-200 font-semibold">
                            {t.form.errorTitle}
                          </p>
                          <p className="text-red-700 dark:text-red-300 text-sm">
                            {t.form.errorMessage}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {submitStatus === 'offline' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 p-4 mb-6 rounded-lg"
                    >
                      <div className="flex items-center">
                        <WifiOff className="text-orange-500 mr-3" size={20} />
                        <div>
                          <p className="text-orange-800 dark:text-orange-200 font-semibold">
                            Connexion requise
                          </p>
                          <p className="text-orange-700 dark:text-orange-300 text-sm">
                            Veuillez vérifier votre connexion internet et réessayer.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <User size={16} className="inline mr-2" />
                        {t.form.name} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t.form.namePlaceholder}
                        className={`${inputClasses} ${errors.name ? errorClasses : ''}`}
                        disabled={isSubmitting}
                      />
                      {errors.name && (
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-1 text-sm text-red-500"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <Mail size={16} className="inline mr-2" />
                        {t.form.email} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t.form.emailPlaceholder}
                        className={`${inputClasses} ${errors.email ? errorClasses : ''}`}
                        disabled={isSubmitting}
                      />
                      {errors.email && (
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-1 text-sm text-red-500"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <MessageCircle size={16} className="inline mr-2" />
                      {t.form.subject} *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={t.form.subjectPlaceholder}
                      className={`${inputClasses} ${errors.subject ? errorClasses : ''}`}
                      disabled={isSubmitting}
                    />
                    {errors.subject && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-1 text-sm text-red-500"
                      >
                        {errors.subject}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {t.form.message} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t.form.messagePlaceholder}
                      rows={6}
                      className={`${inputClasses} resize-none ${errors.message ? errorClasses : ''}`}
                      disabled={isSubmitting}
                      maxLength={1000}
                    />
                    {errors.message && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-1 text-sm text-red-500"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                    <p className={`mt-1 text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {formData.message.length}/1000 {t.form.characterCount}
                    </p>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting || !isOnline}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`
                      w-full py-4 px-6 rounded-lg font-medium transition-all duration-200
                      flex items-center justify-center gap-3 text-lg
                      ${isSubmitting || !isOnline
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white shadow-lg hover:shadow-xl'
                      }
                    `}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        {t.form.sending}
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        {t.form.send}
                        <Sparkles size={16} className="animate-pulse" />
                      </>
                    )}
                  </motion.button>
                </form>

                <div className={`mt-8 pt-6 border-t ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <p className={`text-center text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {t.form.callPreference}
                    <a 
                      href={`tel:${personalInfo.phone}`}
                      className="text-primary-600 hover:text-primary-700 font-medium ml-1"
                    >
                      {personalInfo.phone}
                    </a>
                  </p>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                {...fadeInUp}
                transition={{ delay: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h2 className={`text-3xl font-bold mb-6 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {t.contact.info}
                  </h2>
                  
                  <div className="grid gap-4">
                    {contactMethods.map((method, index) => (
                      <ContactMethod 
                        key={method.type} 
                        method={method} 
                        t={t} 
                        onCopy={copyToClipboard}
                      />
                    ))}
                  </div>
                </div>

                {/* Additional Info */}
                <div className={`p-6 rounded-xl ${
                  theme === 'dark' 
                    ? 'bg-gray-800/50 border border-gray-700/50' 
                    : 'bg-white/70 border border-gray-200/50'
                } backdrop-blur-sm`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    <Clock size={20} />
                    {t.contact.workingHours}
                  </h3>
                  <div className={`space-y-2 text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <div>{t.contact.mondayFriday}</div>
                    <div>{t.contact.saturday}</div>
                    <div>{t.contact.sunday}</div>
                  </div>
                </div>

                <div className={`p-6 rounded-xl ${
                  theme === 'dark' 
                    ? 'bg-gray-800/50 border border-gray-700/50' 
                    : 'bg-white/70 border border-gray-200/50'
                } backdrop-blur-sm`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    <Briefcase size={20} />
                    {t.contact.services}
                  </h3>
                  <div className={`space-y-2 text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {t.services.map((service, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                        {service}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-4">
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
                        className={`p-3 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                      >
                        <IconComponent size={20} />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </div>
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

      {/* Copy notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2"
          >
            <Check size={16} />
            {t.common.copied}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Main component with providers
const ContactFormWithProviders = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <EnhancedContactForm />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default ContactFormWithProviders;