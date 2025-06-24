// src/data/portfolioData.js

export const personalInfo = {
  name: "MOMO GODI YVAN",
  title: "Ingénieur en Génie Logiciel | Développeur Web & Mobile | Expert en Transformation Digitale",
  location: "Yaoundé VI, Biyemassi, Maison Blanche, Cameroun",
  email: "yvangodimomo@gmail.com",
  phone: "(+237) 695 922 065",
  portfolio: "https://momoyvan-porfoloi.onrender.com",
  linkedin: "https://linkedin.com/in/momo-godi-yvan-206642244",
  website: "https://www.protegeqv.org",
  github: "https://github.com/momoyvan", // Add your GitHub if available
  bio: "Ingénieur en génie logiciel diplômé de l'IAI Cameroun, parfaitement bilingue (français/anglais), spécialisé en développement web et mobile. Expert en transformation digitale avec une expérience confirmée dans la digitalisation d'organisations communautaires et la formation numérique."
};

export const skills = {
  programming: [
    { name: "Python", level: 90, icon: "🐍", category: "Backend" },
    { name: "JavaScript", level: 85, icon: "📜", category: "Frontend" },
    { name: "PHP", level: 80, icon: "🌐", category: "Backend" },
    { name: "Dart", level: 75, icon: "🎯", category: "Mobile" }
  ],
  frameworks: [
    { name: "React.js", level: 85, icon: "⚛️", category: "Frontend" },
    { name: "Laravel", level: 80, icon: "🏗️", category: "Backend" },
    { name: "Django", level: 85, icon: "🎸", category: "Backend" },
    { name: "Flutter", level: 75, icon: "📱", category: "Mobile" },
    { name: "Flask", level: 70, icon: "🌶️", category: "Backend" }
  ],
  databases: [
    { name: "MySQL", level: 80, icon: "🗄️", category: "Database" },
    { name: "PostgreSQL", level: 75, icon: "🐘", category: "Database" },
    { name: "SQLite", level: 70, icon: "💾", category: "Database" }
  ],
  tools: [
    { name: "Git/GitHub", level: 85, icon: "🔧", category: "Version Control" },
    { name: "Docker", level: 70, icon: "🐳", category: "DevOps" },
    { name: "UML/Merise", level: 80, icon: "📊", category: "Design" },
    { name: "Agile/Scrum", level: 75, icon: "🏃", category: "Methodology" }
  ]
};

export const experiences = [
  {
    id: 1,
    title: "Volontaire - Transformation Digitale",
    company: "Radio Flambou Banka",
    period: "Juin 2025 - Présent",
    location: "Banka, Bafang, Cameroun",
    type: "Volontariat",
    current: true,
    description: "Digitalisation complète d'une radio communautaire locale en plateforme web radio moderne.",
    achievements: [
      "Digitalisation complète d'une radio communautaire en web radio",
      "Formation des équipes locales aux outils numériques et gestion de contenu",
      "Mise en place d'une stratégie de diffusion web multiplateforme",
      "Accompagnement technique et pédagogique des animateurs radio",
      "Développement de solutions adaptées au contexte rural camerounais"
    ],
    technologies: ["Web Radio", "CMS", "Formation Digitale", "Stratégie Web"]
  },
  {
    id: 2,
    title: "Volontaire - IT Support & Formateur",
    company: "ONG PROTEGE QV",
    period: "Janvier 2025 - Présent",
    location: "Yaoundé, Cameroun",
    type: "Volontariat",
    current: true,
    description: "Support technique et formation numérique pour l'autonomisation des femmes dans les technologies.",
    achievements: [
      "Support technique lors de séminaires et ateliers de formation numérique",
      "Formation de 30 femmes lors de l'atelier 'Sécurité Numérique' au Centre Jean XXIII",
      "Animation de formations WordPress et outils bureautiques",
      "Conception de supports pédagogiques bilingues (français/anglais)",
      "Promotion de l'entrepreneuriat numérique féminin dans le secteur tech"
    ],
    technologies: ["WordPress", "Cybersécurité", "Formation IT", "Outils Bureautiques"]
  },
  {
    id: 3,
    title: "Développeur Fullstack",
    company: "Bertiland Corporation",
    period: "2024",
    location: "Yaoundé, Cameroun",
    type: "CDI",
    current: false,
    description: "Développement d'applications web et mobile sécurisées pour des clients corporate et gouvernementaux.",
    achievements: [
      "Développement de deux applications web sécurisées avec Laravel et Django",
      "Intégration de systèmes d'authentification avancés et paiement en ligne",
      "Création d'une application mobile Flutter pour la gestion de stocks en temps réel",
      "Conception d'une plateforme gouvernementale de prise de rendez-vous pour la CNI",
      "Optimisation des performances et sécurisation des bases de données"
    ],
    technologies: ["Laravel", "Django", "Flutter", "MySQL", "PostgreSQL", "API REST"]
  },
  {
    id: 4,
    title: "Stagiaire Développeur",
    company: "ICCSOFT",
    period: "2022 - 2023",
    location: "Yaoundé, Cameroun",
    type: "Stage",
    current: false,
    description: "Stage de formation en développement web avec apprentissage des méthodologies agiles.",
    achievements: [
      "Développement d'un module PHP de gestion des utilisateurs avec base MySQL",
      "Formation pratique en environnement professionnel agile (PHP/Laravel)",
      "Participation à des projets de développement d'applications web d'entreprise",
      "Apprentissage des bonnes pratiques de développement sécurisé"
    ],
    technologies: ["PHP", "MySQL", "Laravel", "Agile", "MVC"]
  }
];

export const projects = [
  {
    id: 1,
    title: "EAT FAST",
    description: "Application de livraison de nourriture 100% Camerounaise adaptée au marché local",
    longDescription: "Plateforme complète de livraison de repas conçue spécifiquement pour le marché camerounais, intégrant les solutions de paiement mobile money et la géolocalisation adaptée aux villes camerounaises.",
    period: "Avril 2025 - Présent",
    status: "En développement",
    progress: 65,
    tech: ["React.js", "Django REST", "PostgreSQL", "React Native"],
    features: [
      "Géolocalisation intégrée adaptée aux villes camerounaises",
      "Paiement mobile money (Orange Money, MTN MoMo)",
      "Interface multilingue (français/anglais)",
      "Gestion intelligente des stocks restaurants",
      "Système de recommandations personnalisées",
      "Support client temps réel"
    ],
    category: "Web & Mobile App",
    type: "Personal Project",
    url: null,
    image: "/api/placeholder/400/300"
  },
  {
    id: 2,
    title: "Portfolio Professionnel Django",
    description: "Site web responsive moderne présentant compétences et réalisations",
    longDescription: "Portfolio personnel développé avec Django, présentant mes compétences techniques, projets et expériences professionnelles avec une interface moderne et responsive.",
    period: "2024",
    status: "Terminé",
    progress: 100,
    tech: ["Django", "Bootstrap", "JavaScript", "PostgreSQL"],
    features: [
      "Design responsive et moderne",
      "Optimisation SEO avancée",
      "Système de gestion de contenu dynamique",
      "Interface d'administration personnalisée",
      "Intégration avec APIs externes",
      "Performance optimisée"
    ],
    category: "Web Application",
    type: "Personal Project",
    url: "https://momoyvan-porfoloi.onrender.com",
    image: "/api/placeholder/400/300"
  },
  {
    id: 3,
    title: "Application de Gestion de Tâches",
    description: "Interface intuitive pour la gestion de projets personnels et professionnels",
    longDescription: "Application web complète de gestion de tâches et projets avec fonctionnalités avancées de planification, suivi et collaboration.",
    period: "2023",
    status: "Terminé",
    progress: 100,
    tech: ["Python", "Flask", "SQLite", "Bootstrap", "JavaScript"],
    features: [
      "Planification d'objectifs SMART",
      "Suivi de progression en temps réel",
      "Interface utilisateur intuitive et responsive",
      "Gestion de projets collaboratifs",
      "Notifications et rappels automatiques",
      "Rapports et analytics"
    ],
    category: "Web Application",
    type: "Personal Project",
    url: null,
    image: "/api/placeholder/400/300"
  },
  {
    id: 4,
    title: "Marketplace de Services",
    description: "Plateforme e-commerce complète avec gestion multi-utilisateurs",
    longDescription: "Marketplace moderne permettant aux prestataires de services de proposer leurs services avec un système complet de réservations et paiements sécurisés.",
    period: "2023",
    status: "Terminé",
    progress: 100,
    tech: ["PHP", "MySQL", "JavaScript", "Bootstrap", "PayPal API"],
    features: [
      "Système de réservations en temps réel",
      "Paiements sécurisés multi-devises",
      "Architecture modulaire et extensible",
      "Gestion avancée des profils utilisateurs",
      "Système de reviews et ratings",
      "Tableau de bord analytics"
    ],
    category: "E-commerce Platform",
    type: "Commercial Project",
    url: null,
    image: "/api/placeholder/400/300"
  },
  {
    id: 5,
    title: "Plateforme de Prise de Rendez-vous CNI",
    description: "Application gouvernementale pour la gestion des rendez-vous Carte Nationale d'Identité",
    longDescription: "Système développé pour le gouvernement camerounais permettant aux citoyens de prendre rendez-vous en ligne pour leurs démarches administratives.",
    period: "2024",
    status: "Déployé",
    progress: 100,
    tech: ["Laravel", "MySQL", "Vue.js", "Bootstrap"],
    features: [
      "Système de réservation en ligne",
      "Gestion des créneaux horaires",
      "Notifications SMS et email",
      "Interface administrative complète",
      "Sécurité renforcée",
      "Support multi-centres"
    ],
    category: "Government Platform",
    type: "Professional Project",
    url: null,
    image: "/api/placeholder/400/300"
  }
];

export const education = [
  {
    id: 1,
    degree: "Diplôme d'Ingénieur en Informatique",
    specialization: "Génie Logiciel",
    school: "Institut Africain d'Informatique (IAI) - Cameroun",
    year: "2024",
    period: "2021 - 2024",
    grade: "180 ECTS validés",
    gpa: "14,13/20",
    achievements: [
      "Licence Professionnelle en Informatique (Mention: GOOD - 14,13/20)",
      "Diplôme de Technicien Supérieur (DTS) en Informatique (2023)",
      "Spécialisation Software Engineering",
      "Projet de fin d'études: Système de gestion d'école en ligne"
    ],
    courses: [
      "Génie Logiciel Avancé",
      "Architectures Distribuées",
      "Bases de Données Avancées",
      "Développement Web et Mobile",
      "Gestion de Projets IT",
      "Sécurité Informatique"
    ]
  },
  {
    id: 2,
    degree: "GCE A-Level (Advanced Level)",
    school: "Lycée Bilingue d'Application - Yaoundé",
    year: "2021",
    period: "2018 - 2021",
    grade: "3/4 matières réussies",
    subjects: [
      "Economics (F) - Non validé",
      "Geography (E) - Validé",
      "History (D) - Validé", 
      "Information and Communication Technology (C) - Validé"
    ],
    achievements: [
      "Candidat n°110097045",
      "Centre: Government Bilingual Practical High School Yaoundé",
      "Formation bilingue français-anglais"
    ]
  },
  {
    id: 3,
    degree: "GCE O-Level (Ordinary Level)",
    school: "Lycée Bilingue d'Application - Yaoundé",
    year: "2018",
    period: "2015 - 2018",
    achievements: [
      "Formation secondaire bilingue",
      "Base solide en sciences et littérature",
      "Développement des compétences linguistiques"
    ]
  }
];

export const certifications = [
  {
    id: 1,
    name: "Cybersecurity Fundamentals",
    issuer: "Formation Continue IAI",
    year: "2024",
    type: "Sécurité"
  },
  {
    id: 2,
    name: "Agile & Scrum Methodology",
    issuer: "Formation Professionnelle",
    year: "2023",
    type: "Méthodologie"
  },
  {
    id: 3,
    name: "Digital Transformation",
    issuer: "ONG PROTEGE QV",
    year: "2025",
    type: "Transformation Digitale"
  }
];

export const languages = [
  { name: "Français", level: "Natif", proficiency: 100 },
  { name: "Anglais", level: "Professionnel", proficiency: 85 },
  { name: "Bamiléké", level: "Notions", proficiency: 40 },
  { name: "Douala", level: "Notions", proficiency: 35 }
];

export const interests = [
  { name: "Karaté Wado Ryu", description: "Professeur depuis 2024", icon: "🥋" },
  { name: "Transformation Digitale", description: "Passion pour l'innovation", icon: "💻" },
  { name: "Formation IT", description: "Transmission de connaissances", icon: "👨‍🏫" },
  { name: "Entrepreneuriat Social", description: "Impact communautaire", icon: "🌍" },
  { name: "Veille Technologique", description: "Innovation continue", icon: "🔬" }
];

export const testimonials = [
  {
    id: 1,
    name: "DANG AKUH Dominic",
    role: "Registrar, GCE Board",
    company: "General Certificate of Education Board",
    content: "Yvan has demonstrated exceptional dedication and technical skills throughout his academic journey.",
    rating: 5,
    image: "/api/placeholder/60/60"
  },
  {
    id: 2,
    name: "Martin MBARGA NGUÉLÉ",
    role: "Directeur Technique",
    company: "Radio Flambou Banka",
    content: "La transformation digitale de notre radio n'aurait pas été possible sans l'expertise de Yvan.",
    rating: 5,
    image: "/api/placeholder/60/60"
  }
];

export const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/momo-godi-yvan-206642244",
    icon: "linkedin"
  },
  {
    name: "GitHub",
    url: "https://github.com/momoyvan",
    icon: "github"
  },
  {
    name: "Portfolio",
    url: "https://momoyvan-porfoloi.onrender.com",
    icon: "globe"
  },
  {
    name: "Email",
    url: "mailto:yvangodimomo@gmail.com",
    icon: "mail"
  }
];