// src/data/portfolioData.js

export const personalInfo = {
  name: "MOMO GODI YVAN",
  title: "Ingénieur en Génie Logiciel | Développeur Web & Mobile | Expert en Transformation Digitale",
  location: "Yaoundé VI, Biyemassi, Maison Blanche, Cameroun",
  email: "yvangodimomo@gmail.com",
  phone: "(+237) 695 922 065",
  whatsapp: "+237695922065",
  portfolio: "https://momoyvan-porfoloi.onrender.com",
  linkedin: "https://linkedin.com/in/momo-godi-yvan-206642244",
  website: "https://www.protegeqv.org",
  github: "https://github.com/momogodi2000?tab=repositories",
  instagram: "https://instagram.com/momoyvan",
  twitter: "https://twitter.com/momoyvan",
  youtube: "https://youtube.com/@momoyvan",
  resume: "../assets/MOMO_GODI_YVAN_CV.pdf",
  bio: "Ingénieur en génie logiciel diplômé de l'IAI Cameroun, parfaitement bilingue (français/anglais), spécialisé en développement web et mobile. Expert en transformation digitale avec une expérience confirmée dans la digitalisation d'organisations communautaires et la formation numérique."
};

export const skills = {
  programming: [
    { name: "Python", level: 80, icon: "🐍", category: "Backend", years: 2 },
    { name: "JavaScript", level: 68, icon: "📜", category: "Frontend", years: 1 },
    { name: "PHP", level: 72, icon: "🌐", category: "Backend", years: 2 },
    { name: "Dart", level: 78, icon: "🎯", category: "Mobile", years: 1 }
  ],
  frameworks: [
    { name: "React.js", level: 90, icon: "⚛️", category: "Frontend", years: 1 },
    { name: "Django", level: 88, icon: "🎸", category: "Backend", years: 2 },
    { name: "Laravel", level: 85, icon: "🏗️", category: "Backend", years: 2 },
    { name: "Flutter", level: 80, icon: "📱", category: "Mobile", years: 1 },
    { name: "Flask", level: 75, icon: "🌶️", category: "Backend", years: 2 }
  ],
  databases: [
    { name: "PostgreSQL", level: 85, icon: "🐘", category: "Database", years: 2 },
    { name: "MySQL", level: 88, icon: "🗄️", category: "Database", years: 3 },
    { name: "MongoDB", level: 80, icon: "🍃", category: "Database", years: 1 },
    { name: "Redis", level: 75, icon: "🔴", category: "Cache", years: 1 },
    { name: "SQLite", level: 82, icon: "💾", category: "Database", years: 3 }
  ],
  tools: [
    { name: "Git/GitHub", level: 90, icon: "🔧", category: "Version Control", years: 4 },
    { name: "Docker", level: 78, icon: "🐳", category: "DevOps", years: 2 },
    { name: "Linux", level: 85, icon: "🐧", category: "System", years: 3 },
    { name: "Figma", level: 80, icon: "🎨", category: "Design", years: 2 },
    { name: "Postman", level: 88, icon: "📮", category: "API", years: 3 },
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
    longDescription: "Plateforme complète de livraison de repas conçue spécifiquement pour le marché camerounais, intégrant les solutions de paiement mobile money et la géolocalisation adaptée aux réalités locales.",
    period: "Avril 2025 - Présent",
    status: "En développement",
    progress: 75,
    tech: ["React.js", "Django REST", "PostgreSQL", "React Native", "Mobile Money API", "Redis"],
    features: [
      "Géolocalisation intégrée adaptée aux villes camerounaises",
      "Paiement mobile money (Orange Money, MTN MoMo)",
      "Interface multilingue (français/anglais)",
      "Notifications push en temps réel",
      "Système de tracking de commandes intelligent",
      "Dashboard analytics pour restaurants",
      "Mode hors ligne pour zones à faible connectivité",
      "Optimisation pour les connexions 2G/3G"
    ],
    category: "Mobile App",
    type: "Personal Project",
    url: "https://eat-fast-demo.vercel.app",
    github: "https://github.com/momoyvan/eat-fast",
    image: "data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='600' fill='%23f0f9ff'/%3E%3Ctext x='400' y='300' text-anchor='middle' fill='%230284c7' font-size='24' font-family='Arial'%3EEAT FAST - App Screenshot%3C/text%3E%3C/svg%3E",
    highlights: [
      "Interface optimisée pour le marché africain",
      "Intégration native des systèmes de paiement locaux",
      "Performance adaptée aux connexions limitées"
    ]
  },
  {
    id: 2,
    title: "BueaDelights E-commerce",
    description: "Django-based e-commerce for Cameroonian food business",
    longDescription: "A comprehensive Django-based e-commerce web application for a local Cameroonian food business in Buea, Southwest Region. The platform serves authentic Cameroonian cuisine with modern web technologies, mobile-first design, and integrated payment solutions.",
    period: "2024",
    status: "Terminé",
    progress: 100,
    tech: ["Django", "Python", "PostgreSQL", "Mobile Money API", "Bootstrap"],
    features: [
      "Product showcase with categories",
      "Shopping cart system",
      "Reservation system",
      "Local payment integration (Mobile Money)",
      "Customer accounts with order history",
      "Simplified admin interface"
    ],
    category: "E-commerce",
    type: "Business Project",
    url: null,
    github: "https://github.com/momogodi2000/bueabelight.git",
    image: "data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='600' fill='%23f8fafc'/%3E%3Ctext x='400' y='300' text-anchor='middle' fill='%230369a1' font-size='24' font-family='Arial'%3EBueaDelights E-commerce%3C/text%3E%3C/svg%3E"
  },
  {
    id: 3,
    title: "Kori Mobile App",
    description: "Cultural preservation and education platform",
    longDescription: "A cultural and educational mobile application that preserves and promotes local language, culture, and traditions. The app follows MVVM architecture and includes features like dictionary management, arts library, events calendar, thematic forums, and educational games.",
    period: "2024",
    status: "En cours",
    progress: 80,
    tech: ["Flutter", "Dart", "Django", "MVVM Architecture", "Firebase"],
    features: [
      "Interactive dictionary with audio pronunciations",
      "Cultural media library",
      "Events calendar with notifications",
      "Thematic discussion forums",
      "Educational games (6 types)",
      "User management system"
    ],
    category: "Mobile Application",
    type: "Educational Project",
    url: null,
    github: null,
    image: "data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='600' fill='%23ecfdf5'/%3E%3Ctext x='400' y='300' text-anchor='middle' fill='%23059669' font-size='24' font-family='Arial'%3EKori Mobile App%3C/text%3E%3C/svg%3E"
  },
  {
    id: 4,
    title: "MentorCam Platform",
    description: "Professional-amateur connection platform",
    longDescription: "An innovative platform that connects amateurs and professionals for mentorship, training, and events. The platform is tailored to the socio-economic realities of Cameroon with features like intelligent search, mentorship sessions, local payment integration, and event management.",
    period: "2024",
    status: "Production",
    progress: 100,
    tech: ["Django", "React.js", "PostgreSQL", "Twilio/Jitsi", "Mobile Money API"],
    features: [
      "User management with local authentication",
      "AI-powered search with voice support",
      "Mentorship session booking",
      "Local event management",
      "Mobile Money payment integration",
      "Multilingual support (French/English)"
    ],
    category: "Web Platform",
    type: "Professional Project",
    url: null,
    github: "https://github.com/momogodi2000/mentorcam_front.git",
    image: "data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='600' fill='%23fef3c7'/%3E%3Ctext x='400' y='300' text-anchor='middle' fill='%23d97706' font-size='24' font-family='Arial'%3EMentorCam Platform%3C/text%3E%3C/svg%3E"
  },
  {
    id: 5,
    title: "E-Railway Passenger Dashboard",
    description: "Train travel management system",
    longDescription: "A web application designed for users to manage their train travel experiences with ease. It provides features for booking tickets, checking train schedules, and accessing customer support, along with various statistics and promotions.",
    period: "2024",
    status: "Terminé",
    progress: 100,
    tech: ["Django", "Bootstrap", "jQuery", "Chart.js", "Google Maps API"],
    features: [
      "User-friendly dashboard interface",
      "Travel statistics visualization",
      "Ticket booking system",
      "Real-time train schedules",
      "Customer support access",
      "Google Maps integration"
    ],
    category: "Web Application",
    type: "Transportation Project",
    url: null,
    github: "https://github.com/momogodi2000/E-railway.git",
    image: "data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='600' fill='%23f3e8ff'/%3E%3Ctext x='400' y='300' text-anchor='middle' fill='%237c3aed' font-size='24' font-family='Arial'%3EE-Railway Dashboard%3C/text%3E%3C/svg%3E"
  },
  {
    id: 6,
    title: "Food Recipe Web App",
    description: "Django-based recipe sharing platform",
    longDescription: "A Django-based web application designed to help users discover and share food recipes. The app allows users to create accounts, submit their own recipes, and browse through a collection of recipes submitted by others.",
    period: "2024",
    status: "Terminé",
    progress: 100,
    tech: ["Django", "Python", "SQLite", "Bootstrap"],
    features: [
      "User account creation",
      "Recipe submission and management",
      "Recipe browsing and searching",
      "Category organization",
      "User interaction features",
      "Responsive design"
    ],
    category: "Web Application",
    type: "Personal Project",
    url: null,
    github: "https://github.com/momogodi2000/food-recipe-web-app.git",
    image: "data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='600' fill='%23ffe4e6'/%3E%3Ctext x='400' y='300' text-anchor='middle' fill='%23be123c' font-size='24' font-family='Arial'%3EFood Recipe App%3C/text%3E%3C/svg%3E"
  },
  {
    id: 7,
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
    github: null,
    image: "/api/placeholder/400/300"
  },
  {
    id: 8,
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
    github: null,
    image: "/api/placeholder/400/300"
  }
];

export const blogPosts = [
  {
    id: 1,
    title: "Guide Complet du Développement Web Moderne au Cameroun",
    slug: "guide-developpement-web-moderne-cameroun",
    excerpt: "Découvrez les meilleures pratiques et technologies pour le développement web adapté au contexte camerounais.",
    author: "MOMO GODI YVAN",
    date: "2025-01-15",
    readTime: 8,
    tags: ["Web Development", "Cameroun", "React", "Django"],
    image: "data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='400' fill='%23dbeafe'/%3E%3Ctext x='400' y='200' text-anchor='middle' fill='%231d4ed8' font-size='20' font-family='Arial'%3EGuide Développement Web%3C/text%3E%3C/svg%3E",
    featured: true,
    views: 1250,
    likes: 89
  },
  {
    id: 2,
    title: "L'IA et le Développement : Révolution ou Evolution ?",
    slug: "ia-developpement-revolution-evolution",
    excerpt: "Analyse de l'impact de l'intelligence artificielle sur le métier de développeur en Afrique.",
    author: "MOMO GODI YVAN",
    date: "2025-01-10",
    readTime: 6,
    tags: ["IA", "Développement", "Afrique", "Innovation"],
    image: "data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='400' fill='%23dcfce7'/%3E%3Ctext x='400' y='200' text-anchor='middle' fill='%23166534' font-size='20' font-family='Arial'%3EIA et Développement%3C/text%3E%3C/svg%3E",
    featured: false,
    views: 890,
    likes: 67
  },
  {
    id: 3,
    title: "Transformation Digitale des PME Camerounaises",
    slug: "transformation-digitale-pme-camerounaises",
    excerpt: "Stratégies pratiques pour digitaliser les petites et moyennes entreprises au Cameroun.",
    author: "MOMO GODI YVAN",
    date: "2025-01-05",
    readTime: 10,
    tags: ["Transformation Digitale", "PME", "Cameroun", "Business"],
    image: "data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='400' fill='%23fef3c7'/%3E%3Ctext x='400' y='200' text-anchor='middle' fill='%23d97706' font-size='20' font-family='Arial'%3ETransformation Digitale%3C/text%3E%3C/svg%3E",
    featured: true,
    views: 1100,
    likes: 92
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
    url: "https://github.com/momogodi2000?tab=repositories",
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
  },
  {
    name: "Instagram",
    url: "https://instagram.com/momoyvan",
    icon: "instagram"
  },
  {
    name: "Twitter",
    url: "https://twitter.com/momoyvan",
    icon: "twitter"
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@momoyvan",
    icon: "youtube"
  }
];