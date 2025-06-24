// src/components/SEO/SEOHead.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

export const SEOHead = ({ 
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  author = 'MOMO GODI YVAN',
  publishedTime,
  modifiedTime,
  section,
  tags = []
}) => {
  const siteTitle = 'MOMO GODI YVAN - Portfolio Professionnel';
  const siteDescription = 'Ingénieur en Génie Logiciel spécialisé en développement web et mobile, expert en transformation digitale au Cameroun. Découvrez mes projets, compétences et services.';
  const siteUrl = 'https://momoyvan-portfolio.com';
  const defaultImage = `${siteUrl}/og-image.jpg`;
  
  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const pageDescription = description || siteDescription;
  const pageImage = image || defaultImage;
  const pageUrl = url || siteUrl;
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'Person',
    ...(type === 'article' ? {
      headline: title,
      description: pageDescription,
      image: pageImage,
      author: {
        '@type': 'Person',
        name: author,
        url: siteUrl
      },
      publisher: {
        '@type': 'Person',
        name: author,
        url: siteUrl
      },
      datePublished: publishedTime,
      dateModified: modifiedTime,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': pageUrl
      }
    } : {
      name: 'MOMO GODI YVAN',
      jobTitle: 'Ingénieur en Génie Logiciel',
      description: pageDescription,
      url: siteUrl,
      image: pageImage,
      email: 'yvangodimomo@gmail.com',
      telephone: '+237695922065',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Yaoundé',
        addressRegion: 'Centre',
        addressCountry: 'CM'
      },
      sameAs: [
        'https://linkedin.com/in/momo-godi-yvan-206642244',
        'https://github.com/momoyvan',
        'https://twitter.com/momoyvan',
        'https://instagram.com/momoyvan'
      ],
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Institut Africain d\'Informatique (IAI) - Cameroun'
      },
      knowsAbout: [
        'Développement Web',
        'Développement Mobile',
        'React.js',
        'Django',
        'Laravel',
        'Flutter',
        'Transformation Digitale',
        'Formation IT',
        'Cybersécurité'
      ],
      offers: {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Services de Développement Web et Mobile',
          description: 'Développement d\'applications web et mobile, transformation digitale, formation IT'
        }
      }
    })
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={keywords || 'développeur web, ingénieur logiciel, React, Django, Laravel, Flutter, Cameroun, Yaoundé, transformation digitale, formation IT'} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="fr-FR" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:alt" content={title || 'MOMO GODI YVAN Portfolio'} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:locale:alternate" content="en_US" />
      
      {type === 'article' && (
        <>
          <meta property="article:author" content={author} />
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:modified_time" content={modifiedTime} />
          <meta property="article:section" content={section} />
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      <meta name="twitter:image:alt" content={title || 'MOMO GODI YVAN Portfolio'} />
      <meta name="twitter:site" content="@momoyvan" />
      <meta name="twitter:creator" content="@momoyvan" />
      
      {/* LinkedIn Meta Tags */}
      <meta property="linkedin:owner" content="momo-godi-yvan-206642244" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#0284c7" />
      <meta name="msapplication-TileColor" content="#0284c7" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />
      
      {/* Alternate Languages */}
      <link rel="alternate" hrefLang="fr" href={pageUrl} />
      <link rel="alternate" hrefLang="en" href={`${pageUrl}?lang=en`} />
      <link rel="alternate" hrefLang="x-default" href={pageUrl} />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Additional Structured Data for Website */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteTitle,
          url: siteUrl,
          description: siteDescription,
          author: {
            '@type': 'Person',
            name: 'MOMO GODI YVAN'
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: `${siteUrl}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
          }
        })}
      </script>
      
      {/* Breadcrumb Structured Data */}
      {section && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Accueil',
                item: siteUrl
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: section,
                item: pageUrl
              }
            ]
          })}
        </script>
      )}
    </Helmet>
  );
};

// src/utils/seo.js - SEO utilities
export const generateSEOConfig = (page, data = {}) => {
  const configs = {
    home: {
      title: 'Accueil',
      description: 'Portfolio professionnel de MOMO GODI YVAN - Ingénieur en Génie Logiciel spécialisé en développement web et mobile, expert en transformation digitale au Cameroun.',
      keywords: 'MOMO GODI YVAN, développeur web, ingénieur logiciel, React, Django, Laravel, Flutter, transformation digitale, Cameroun, Yaoundé',
      type: 'website'
    },
    about: {
      title: 'À Propos',
      description: 'Découvrez mon parcours, mes compétences et mon expertise en développement web, mobile et transformation digitale. Ingénieur diplômé de l\'IAI Cameroun.',
      keywords: 'à propos, parcours, compétences, expertise, IAI Cameroun, formation, expérience professionnelle',
      section: 'À Propos'
    },
    projects: {
      title: 'Projets & Réalisations',
      description: 'Découvrez mes projets de développement web et mobile : EAT FAST, Radio Flambou Banka, plateformes e-learning et solutions IoT.',
      keywords: 'projets, réalisations, EAT FAST, Radio Flambou Banka, développement web, applications mobile, IoT',
      section: 'Projets'
    },
    blog: {
      title: 'Blog Tech & Innovation',
      description: 'Articles sur le développement web et mobile, l\'innovation technologique en Afrique, la transformation digitale et les bonnes pratiques.',
      keywords: 'blog, articles, développement web, innovation, Afrique, transformation digitale, tutoriels',
      section: 'Blog'
    },
    contact: {
      title: 'Contact',
      description: 'Contactez-moi pour vos projets de développement web, mobile, transformation digitale ou formation IT. Disponible à Yaoundé, Cameroun.',
      keywords: 'contact, développement web, mobile, transformation digitale, formation IT, Yaoundé, Cameroun',
      section: 'Contact'
    },
    skills: {
      title: 'Compétences Techniques',
      description: 'Mes compétences en développement : React.js, Django, Laravel, Flutter, Python, JavaScript, bases de données, DevOps et plus.',
      keywords: 'compétences, React, Django, Laravel, Flutter, Python, JavaScript, bases de données, DevOps',
      section: 'Compétences'
    },
    experience: {
      title: 'Expérience Professionnelle',
      description: 'Mon expérience professionnelle : transformation digitale, développement d\'applications, formation IT et accompagnement d\'organisations.',
      keywords: 'expérience, transformation digitale, développement, formation IT, accompagnement',
      section: 'Expérience'
    },
    education: {
      title: 'Formation & Éducation',
      description: 'Ma formation académique : Diplôme d\'Ingénieur en Informatique de l\'IAI Cameroun, certifications et formation continue.',
      keywords: 'formation, éducation, IAI Cameroun, diplôme ingénieur, certifications',
      section: 'Formation'
    },
    gallery: {
      title: 'Galerie',
      description: 'Galerie de mes réalisations : captures d\'écran d\'applications, photos de formations, démonstrations vidéo de projets.',
      keywords: 'galerie, réalisations, captures écran, photos formations, démonstrations vidéo',
      section: 'Galerie'
    }
  };

  const baseConfig = configs[page] || configs.home;
  
  // Merge with provided data
  return {
    ...baseConfig,
    ...data,
    url: `${process.env.REACT_APP_SITE_URL || 'https://momoyvan-portfolio.com'}${data.path || ''}`,
    image: data.image || `${process.env.REACT_APP_SITE_URL || 'https://momoyvan-portfolio.com'}/og-image.jpg`
  };
};

// Blog post specific SEO
export const generateBlogSEO = (post) => {
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    type: 'article',
    author: post.author,
    publishedTime: post.date,
    modifiedTime: post.updatedAt || post.date,
    section: 'Blog',
    tags: post.tags,
    image: post.image,
    url: `${process.env.REACT_APP_SITE_URL || 'https://momoyvan-portfolio.com'}/blog/${post.slug}`
  };
};

// Project specific SEO
export const generateProjectSEO = (project) => {
  return {
    title: project.title,
    description: project.description,
    keywords: project.tech.join(', '),
    type: 'website',
    section: 'Projets',
    image: project.images?.[0],
    url: `${process.env.REACT_APP_SITE_URL || 'https://momoyvan-portfolio.com'}/projects/${project.slug || project.id}`
  };
};

// Sitemap generation
export const generateSitemap = () => {
  const baseUrl = process.env.REACT_APP_SITE_URL || 'https://momoyvan-portfolio.com';
  const currentDate = new Date().toISOString();
  
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: '/#about', priority: '0.8', changefreq: 'monthly' },
    { url: '/#projects', priority: '0.9', changefreq: 'weekly' },
    { url: '/#blog', priority: '0.8', changefreq: 'daily' },
    { url: '/#contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/#skills', priority: '0.6', changefreq: 'monthly' },
    { url: '/#experience', priority: '0.6', changefreq: 'monthly' },
    { url: '/#education', priority: '0.5', changefreq: 'yearly' },
    { url: '/#gallery', priority: '0.6', changefreq: 'weekly' }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
</urlset>`;

  return sitemap;
};

// Robots.txt generation
export const generateRobotsTxt = () => {
  const baseUrl = process.env.REACT_APP_SITE_URL || 'https://momoyvan-portfolio.com';
  
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow admin pages (if any)
Disallow: /admin/
Disallow: /api/
Disallow: /*.json$

# Allow important files
Allow: /assets/
Allow: /images/
Allow: /favicon.ico
Allow: /manifest.json`;
};

// Meta pixel and tracking
export const initSEOTracking = () => {
  // Google Search Console verification
  const gscMeta = document.createElement('meta');
  gscMeta.name = 'google-site-verification';
  gscMeta.content = process.env.REACT_APP_GSC_VERIFICATION || 'your-verification-code';
  document.head.appendChild(gscMeta);

  // Bing Webmaster Tools verification
  const bingMeta = document.createElement('meta');
  bingMeta.name = 'msvalidate.01';
  bingMeta.content = process.env.REACT_APP_BING_VERIFICATION || 'your-verification-code';
  document.head.appendChild(bingMeta);

  // Pinterest verification
  const pinterestMeta = document.createElement('meta');
  pinterestMeta.name = 'p:domain_verify';
  pinterestMeta.content = process.env.REACT_APP_PINTEREST_VERIFICATION || 'your-verification-code';
  document.head.appendChild(pinterestMeta);
};

// Performance monitoring for SEO
export const monitorCoreWebVitals = () => {
  if ('web-vital' in window) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });
  }
};

// Social media meta tags for sharing
export const generateSocialMeta = (data) => {
  const { title, description, image, url } = data;
  
  return {
    // Open Graph
    'og:title': title,
    'og:description': description,
    'og:image': image,
    'og:url': url,
    'og:type': 'website',
    'og:site_name': 'MOMO GODI YVAN Portfolio',
    
    // Twitter
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
    'twitter:site': '@momoyvan',
    
    // LinkedIn
    'linkedin:owner': 'momo-godi-yvan-206642244'
  };
};

// Local SEO for Cameroon
export const generateLocalSEO = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'MOMO GODI YVAN - Services IT',
    description: 'Services de développement web et mobile, transformation digitale',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Yaoundé VI, Biyemassi, Maison Blanche',
      addressLocality: 'Yaoundé',
      addressRegion: 'Centre',
      postalCode: '00000',
      addressCountry: 'CM'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 3.8480,
      longitude: 11.5021
    },
    telephone: '+237695922065',
    email: 'yvangodimomo@gmail.com',
    url: 'https://momoyvan-portfolio.com',
    openingHours: 'Mo-Fr 08:00-17:00, Sa 09:00-13:00',
    priceRange: '$$',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer, Mobile Money',
    currenciesAccepted: 'XAF, EUR, USD'
  };
};