// src/components/contact/EnhancedContactForm.jsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, CheckCircle, AlertCircle, User, Mail, MessageCircle, Phone,
  MapPin, Calendar, Clock, ExternalLink, Copy, Check, Smartphone,
  Globe, Zap, Shield, HeartHandshake, Briefcase, GraduationCap
} from 'lucide-react';
import { useAnalytics } from '../utils/analytics';

const EnhancedContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    projectType: '',
    budget: '',
    timeline: '',
    preferredContact: 'email',
    newsletter: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [copied, setCopied] = useState('');
  
  const formRef = useRef(null);
  const { trackFormSubmission, trackContactMethod, trackButtonClick } = useAnalytics();

  // Contact information
  const contactInfo = {
    email: 'yvangodimomo@gmail.com',
    phone: '+237695922065',
    whatsapp: '+237695922065',
    location: 'Yaoundé VI, Biyemassi, Maison Blanche, Cameroun',
    availability: 'Lun-Ven: 8h-17h, Sam: 9h-13h',
    responseTime: '< 24h',
    languages: ['Français', 'English']
  };

  // Project types
  const projectTypes = [
    'Site Web Vitrine',
    'E-commerce',
    'Application Mobile',
    'Transformation Digitale',
    'Formation IT',
    'Consulting',
    'Maintenance',
    'Autre'
  ];

  // Budget ranges
  const budgetRanges = [
    '< 500 000 FCFA',
    '500k - 1M FCFA',
    '1M - 2M FCFA',
    '2M - 5M FCFA',
    '> 5M FCFA',
    'À discuter'
  ];

  // Timeline options
  const timelineOptions = [
    'Urgent (< 1 mois)',
    'Court terme (1-3 mois)',
    'Moyen terme (3-6 mois)',
    'Long terme (6+ mois)',
    'Flexible'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Le sujet est requis';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    // Phone validation (optional but must be valid if provided)
    if (formData.phone && !/^\+?[1-9]\d{1,14}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Format de téléphone invalide';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
    
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create mailto link with all form data
      const mailtoLink = `mailto:${contactInfo.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Bonjour,

Voici les détails de ma demande :

Nom: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone || 'Non renseigné'}
Entreprise: ${formData.company || 'Non renseigné'}
Type de projet: ${formData.projectType || 'Non renseigné'}
Budget: ${formData.budget || 'Non renseigné'}
Délai: ${formData.timeline || 'Non renseigné'}
Contact préféré: ${formData.preferredContact}

Message:
${formData.message}

${formData.newsletter ? 'Je souhaite recevoir la newsletter.' : ''}

Cordialement,
${formData.name}`
      )}`;
      
      window.location.href = mailtoLink;
      
      setSubmitStatus('success');
      trackFormSubmission('contact_form', true);
      trackContactMethod('email');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        projectType: '',
        budget: '',
        timeline: '',
        preferredContact: 'email',
        newsletter: false
      });
      
    } catch (error) {
      setSubmitStatus('error');
      trackFormSubmission('contact_form', false);
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppContact = () => {
    const message = `Bonjour MOMO YVAN,

Je souhaite vous contacter concernant :
${formData.subject || 'Un projet'}

${formData.message || 'Pouvons-nous discuter de mon projet ?'}

Cordialement,
${formData.name || 'Prospect'}`;
    
    const whatsappUrl = `https://wa.me/${contactInfo.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    trackContactMethod('whatsapp');
    trackButtonClick('whatsapp_contact', 'contact');
  };

  const handleCopyInfo = async (info, type) => {
    try {
      await navigator.clipboard.writeText(info);
      setCopied(type);
      setTimeout(() => setCopied(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const inputClasses = `
    w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 
    bg-white dark:bg-gray-800 text-gray-900 dark:text-white
    placeholder-gray-500 dark:placeholder-gray-400
    focus:border-primary-500 focus:outline-none transition-colors duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const errorClasses = `
    border-red-300 dark:border-red-600 focus:border-red-500
  `;

  return (
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-8"
      >
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Parlons de votre projet
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Que vous ayez un projet web, mobile ou besoin d'une transformation digitale, 
            je suis là pour vous accompagner dans sa réalisation.
          </p>
        </div>

        {/* Quick Contact Methods */}
        <div className="grid gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={handleWhatsAppContact}
          >
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <MessageCircle size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">WhatsApp Direct</h3>
              <p className="text-sm text-green-100">Réponse immédiate</p>
            </div>
            <ExternalLink size={20} className="text-green-200" />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => window.location.href = `mailto:${contactInfo.email}`}
          >
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Mail size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Email</h3>
              <p className="text-sm text-blue-100">Réponse sous 24h</p>
            </div>
            <ExternalLink size={20} className="text-blue-200" />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => window.location.href = `tel:${contactInfo.phone}`}
          >
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Phone size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Appel Téléphonique</h3>
              <p className="text-sm text-purple-100">Lun-Ven: 8h-17h</p>
            </div>
            <ExternalLink size={20} className="text-purple-200" />
          </motion.div>
        </div>

        {/* Detailed Contact Info */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Informations de Contact
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-primary-600" />
                <span className="text-gray-700 dark:text-gray-300">{contactInfo.email}</span>
              </div>
              <button
                onClick={() => handleCopyInfo(contactInfo.email, 'email')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copied === 'email' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-primary-600" />
                <span className="text-gray-700 dark:text-gray-300">{contactInfo.phone}</span>
              </div>
              <button
                onClick={() => handleCopyInfo(contactInfo.phone, 'phone')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copied === 'phone' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
            </div>

            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-primary-600 mt-1" />
              <span className="text-gray-700 dark:text-gray-300">{contactInfo.location}</span>
            </div>

            <div className="flex items-center gap-3">
              <Clock size={20} className="text-primary-600" />
              <span className="text-gray-700 dark:text-gray-300">{contactInfo.availability}</span>
            </div>

            <div className="flex items-center gap-3">
              <Zap size={20} className="text-primary-600" />
              <span className="text-gray-700 dark:text-gray-300">Temps de réponse: {contactInfo.responseTime}</span>
            </div>

            <div className="flex items-center gap-3">
              <Globe size={20} className="text-primary-600" />
              <span className="text-gray-700 dark:text-gray-300">Langues: {contactInfo.languages.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Services Overview */}
        <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Services Disponibles
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Globe, text: 'Sites Web', color: 'text-blue-600' },
              { icon: Smartphone, text: 'Apps Mobile', color: 'text-green-600' },
              { icon: Briefcase, text: 'Consulting', color: 'text-purple-600' },
              { icon: GraduationCap, text: 'Formation', color: 'text-orange-600' }
            ].map((service, index) => (
              <div key={index} className="flex items-center gap-2">
                <service.icon size={18} className={service.color} />
                <span className="text-sm text-gray-700 dark:text-gray-300">{service.text}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Formulaire de Contact
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Décrivez votre projet et je vous recontacterai rapidement
          </p>
        </div>

        {/* Status Messages */}
        <AnimatePresence>
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-4 mb-6"
            >
              <div className="flex items-center">
                <CheckCircle className="text-green-400 mr-3" size={20} />
                <p className="text-green-700 dark:text-green-300">
                  Message envoyé avec succès ! Je vous répondrai sous 24h.
                </p>
              </div>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4 mb-6"
            >
              <div className="flex items-center">
                <AlertCircle className="text-red-400 mr-3" size={20} />
                <p className="text-red-700 dark:text-red-300">
                  Erreur lors de l'envoi. Contactez-moi directement par WhatsApp ou email.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <User size={16} className="inline mr-2" />
                Nom complet *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Votre nom complet"
                className={`${inputClasses} ${errors.name ? errorClasses : ''}`}
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Mail size={16} className="inline mr-2" />
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre@email.com"
                className={`${inputClasses} ${errors.email ? errorClasses : ''}`}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Phone size={16} className="inline mr-2" />
                Téléphone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+237 6XX XXX XXX"
                className={`${inputClasses} ${errors.phone ? errorClasses : ''}`}
                disabled={isSubmitting}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Briefcase size={16} className="inline mr-2" />
                Entreprise
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Nom de votre entreprise"
                className={inputClasses}
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Project Details */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type de projet
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className={inputClasses}
                disabled={isSubmitting}
              >
                <option value="">Sélectionnez</option>
                {projectTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Budget estimé
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={inputClasses}
                disabled={isSubmitting}
              >
                <option value="">Sélectionnez</option>
                {budgetRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Délai souhaité
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className={inputClasses}
                disabled={isSubmitting}
              >
                <option value="">Sélectionnez</option>
                {timelineOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <MessageCircle size={16} className="inline mr-2" />
              Sujet *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Objet de votre message"
              className={`${inputClasses} ${errors.subject ? errorClasses : ''}`}
              disabled={isSubmitting}
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Message détaillé *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Décrivez votre projet, vos besoins, vos objectifs..."
              rows={6}
              className={`${inputClasses} resize-none ${errors.message ? errorClasses : ''}`}
              disabled={isSubmitting}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
            )}
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {formData.message.length}/1000 caractères
            </p>
          </div>

          {/* Preferences */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Méthode de contact préférée
              </label>
              <div className="space-y-2">
                {[
                  { value: 'email', label: 'Email', icon: Mail },
                  { value: 'phone', label: 'Téléphone', icon: Phone },
                  { value: 'whatsapp', label: 'WhatsApp', icon: MessageCircle }
                ].map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="preferredContact"
                      value={option.value}
                      checked={formData.preferredContact === option.value}
                      onChange={handleChange}
                      className="mr-3 text-primary-600"
                      disabled={isSubmitting}
                    />
                    <option.icon size={16} className="mr-2 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                  className="mr-3 mt-1 text-primary-600"
                  disabled={isSubmitting}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Je souhaite recevoir des actualités sur les technologies et l'innovation en Afrique
                </span>
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                flex-1 py-4 px-6 rounded-lg font-medium transition-all duration-200
                flex items-center justify-center gap-2
                ${isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white shadow-lg hover:shadow-xl'
                }
              `}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Envoyer le message
                </>
              )}
            </motion.button>

            <motion.button
              type="button"
              onClick={handleWhatsAppContact}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="sm:w-auto py-4 px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <MessageCircle size={20} />
              WhatsApp
            </motion.button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              <Shield size={16} className="inline mr-1" />
              Vos données sont sécurisées et ne seront jamais partagées
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <HeartHandshake size={16} className="inline mr-1" />
              Première consultation gratuite pour tous les projets
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedContactForm;