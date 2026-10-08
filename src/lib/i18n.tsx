// RHIZORA TECH Portfolio — i18n dictionaries (EN / FR)
// Single source of truth for every piece of UI copy on the site.
// DB-driven content (projects, testimonials) carries parallel FR fields
// in the database and falls back to English when a translation is missing.

export type Lang = 'en' | 'fr'

const en = {
  meta: {
    title: 'Atong Glory — Frontend Developer & Designer | RHIZORA TECH Portfolio',
  },
  nav: {
    skipToContent: 'Skip to content',
    home: 'Home',
    about: 'About',
    services: 'Services',
    skills: 'Skills',
    projects: 'Projects',
    testimonials: 'Testimonials',
    contact: 'Contact',
    letsTalk: "Let's Talk",
  },
  hero: {
    greeting: "Hello, I'm",
    roles: ['Frontend Developer', 'Graphics Designer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'],
    description:
      'I build exceptional digital experiences with modern technologies. Passionate about clean code, scalable solutions, and turning ideas into reality.',
    hireMe: 'Hire Me',
    viewMyWork: 'View My Work',
    available: 'Available for Freelance',
    portraitAlt:
      'Portrait of Atong Glory — Frontend Developer, UI/UX and Graphics Designer',
  },
  about: {
    label: 'About Me',
    title: (
      <>
        Building Digital Solutions
        <br className="hidden sm:block" /> That Make a Difference
      </>
    ),
    paragraphs: [
      "I'm a passionate Frontend Developer & UI/UX Designer with 6+ years of experience crafting web experiences that are fast, accessible, and beautiful. My journey started with curiosity about how the web works, and it has grown into a career of designing and building interfaces used by thousands of people every day.",
      'I specialize in React, Next.js, TypeScript and Tailwind CSS, and I love turning complex problems into elegant, human-centered designs. From Figma wireframes to pixel-perfect responsive interfaces — and polished brand visuals — I care about every detail of the product and the people who use it.',
    ],
    stats: [
      { value: 6, suffix: '+', label: 'Years Experience' },
      { value: 40, suffix: '+', label: 'Projects Completed' },
      { value: 25, suffix: '+', label: 'Happy Clients' },
      { value: 100, suffix: '%', label: 'Client Satisfaction' },
    ],
    downloadResume: 'Download Resume',
    info: {
      name: 'Name:',
      nameValue: 'Atong Glory',
      email: 'Email:',
      location: 'Location:',
      locationValue: 'Douala, Cameroon',
      availability: 'Availability:',
      availabilityValue: 'Available for Freelance',
    },
  },
  services: {
    label: 'What I Do',
    title: 'My Services',
    learnMore: 'Learn More',
    learnMoreAria: (title: string) => `Learn more about ${title}`,
    items: [
      {
        title: 'Web Development',
        description:
          'Fast, responsive websites built with modern technologies — from landing pages and portfolios to complex web platforms.',
      },
      {
        title: 'Frontend Development',
        description:
          'Responsive and interactive user interfaces with React, Next.js, and Tailwind CSS that feel fast and look stunning.',
      },
      {
        title: 'UI/UX Design',
        description:
          'Human-centered interfaces — from research and wireframes to polished Figma prototypes and scalable design systems.',
      },
      {
        title: 'Graphic Design',
        description:
          'Brand identities, logos, marketing visuals and social media designs that make your product unforgettable.',
      },
    ],
  },
  skills: {
    label: 'My Expertise',
    title: 'Skills & Technologies',
    proficiencyAria: (name: string) => `${name} proficiency`,
    bars: [
      { name: 'JavaScript / TypeScript', level: 95 },
      { name: 'React & Next.js', level: 92 },
      { name: 'HTML / CSS / Tailwind', level: 95 },
      { name: 'UI/UX Design (Figma)', level: 90 },
      { name: 'Graphic Design (Ps / Ai)', level: 85 },
      { name: 'Node.js & Databases', level: 78 },
    ],
    soft: {
      strike: 'Soft',
      real: 'Real Skills',
      items: ['Leadership', 'Research', 'Reading', 'Communication', 'Emotional Intelligence'],
      more: 'More',
    },
  },
  projects: {
    label: 'Featured Projects',
    title: 'Some of My Recent Work',
    viewAll: 'View All Projects',
    loadingAria: 'Loading projects',
    error: 'Projects are warming up — refresh in a moment.',
    demoAria: (title: string) => `Open live demo of ${title}`,
    previewAlt: (title: string) => `${title} — web project preview built by Atong Glory`,
    // Category translations for DB-driven categories
    categories: {
      'Data Visualization': 'Data Visualization',
      'E-Commerce': 'E-Commerce',
      Productivity: 'Productivity',
    } as Record<string, string>,
  },
  testimonials: {
    label: 'Testimonials',
    title: 'What Clients Say',
    ratedAria: (rating: number) => `Rated ${rating} out of 5 stars`,
    goToAria: (i: number) => `Go to testimonial ${i}`,
  },
  contact: {
    label: 'Get In Touch',
    title: (
      <>
        Let&apos;s Build Something
        <br className="hidden sm:block" /> Amazing Together
      </>
    ),
    form: {
      yourName: 'Your Name',
      yourNamePlaceholder: 'Your name',
      yourEmail: 'Your Email',
      yourEmailPlaceholder: 'you@example.com',
      projectType: 'Project Type',
      projectTypePlaceholder: 'Select project type',
      budgetRange: 'Budget Range',
      budgetRangePlaceholder: 'Select budget range',
      message: 'Tell me about your project...',
      messagePlaceholder: 'Project goals, timeline, features you need — anything that helps.',
      send: 'Send Message',
      sending: 'Sending...',
    },
    validation: {
      name: 'Please enter your name.',
      email: 'Please enter a valid email.',
      message: 'Tell me a bit more (min 10 characters).',
    },
    toast: {
      sentTitle: 'Message sent!',
      sentDescription: "Thanks for reaching out — I'll get back to you within 24 hours.",
      errorTitle: 'Could not send message',
      fallbackDescription: 'Please review the form and try again.',
      networkTitle: 'Network error',
      networkDescription: 'Please check your connection and try again.',
    },
    projectTypes: ['Web Application', 'E-Commerce Store', 'SaaS Platform', 'UI/UX Design', 'Graphic Design', 'Other'],
    budgets: ['Under $1,000', '$1,000 – $5,000', '$5,000 – $10,000', '$10,000+'],
    info: {
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      responseTime: 'Response Time',
      responseTimeValue: 'Within 24 hours',
    },
    availabilityCard: {
      strong: 'Currently available',
      rest:
        " for freelance projects and full-time opportunities. Let's turn your idea into a product people love.",
    },
  },
  caseStudy: {
    backHome: 'Back to Home',
    metricsTitle: 'Project Metrics',
    liveDemo: 'Live Demo',
    sourceCode: 'Source Code',
  },
  footer: {
    description:
      'Frontend Developer & UI/UX Designer building fast, responsive websites and web apps with React, Next.js and TypeScript — digital solutions that drive results and create exceptional user experiences.',
    quickLinks: 'Quick Links',
    services: 'Services',
    followMe: 'Follow Me',
    visitorPrefixLabel: "You're visitor",
    visitorSuffix: ' — counted live from the database',
    rights: (year: number) => `© ${year} Atong Glory. All rights reserved.`,
    builtWith: 'Built with ',
    builtWithMiddle: ', Next.js and lots of ',
  },
}

export type Dictionary = typeof en

const fr: Dictionary = {
  meta: {
    title: 'Atong Glory — Développeur Frontend & Designer | Portfolio RHIZORA TECH',
  },
  nav: {
    skipToContent: 'Aller au contenu',
    home: 'Accueil',
    about: 'À propos',
    services: 'Services',
    skills: 'Compétences',
    projects: 'Projets',
    testimonials: 'Témoignages',
    contact: 'Contact',
    letsTalk: 'Discutons',
  },
  hero: {
    greeting: 'Bonjour, je suis',
    roles: ['Développeur Frontend', 'Designer Graphique', 'Designer UI/UX', 'Résolveur de problèmes', 'Passionné de technologie'],
    description:
      'Je crée des expériences numériques exceptionnelles avec des technologies modernes. Passionné par le code propre, les solutions évolutives et la transformation des idées en réalité.',
    hireMe: 'Embauchez-moi',
    viewMyWork: 'Voir mes projets',
    available: 'Disponible pour freelance',
    portraitAlt:
      'Portrait d’Atong Glory — développeur frontend et designer UI/UX & graphique',
  },
  about: {
    label: 'À propos de moi',
    title: (
      <>
        Construire des solutions numériques
        <br className="hidden sm:block" /> qui font la différence
      </>
    ),
    paragraphs: [
      'Je suis un développeur frontend et designer UI/UX passionné, avec plus de 6 ans d’expérience dans la création d’expériences web rapides, accessibles et élégantes. Mon parcours a commencé par la curiosité de comprendre le fonctionnement du web, et s’est transformé en une carrière dédiée à la conception d’interfaces utilisées chaque jour par des milliers de personnes.',
      'Je suis spécialisé en React, Next.js, TypeScript et Tailwind CSS, et j’aime transformer des problèmes complexes en designs élégants, centrés sur l’humain. Des maquettes Figma aux interfaces responsives au pixel près — en passant par des identités visuelles soignées — je me soucie de chaque détail du produit et des personnes qui l’utilisent.',
    ],
    stats: [
      { value: 6, suffix: '+', label: 'Années d’expérience' },
      { value: 40, suffix: '+', label: 'Projets réalisés' },
      { value: 25, suffix: '+', label: 'Clients satisfaits' },
      { value: 100, suffix: '%', label: 'Satisfaction client' },
    ],
    downloadResume: 'Télécharger le CV',
    info: {
      name: 'Nom :',
      nameValue: 'Atong Glory',
      email: 'E-mail :',
      location: 'Localisation :',
      locationValue: 'Douala, Cameroun',
      availability: 'Disponibilité :',
      availabilityValue: 'Disponible pour freelance',
    },
  },
  services: {
    label: 'Ce que je fais',
    title: 'Mes services',
    learnMore: 'En savoir plus',
    learnMoreAria: (title: string) => `En savoir plus sur ${title}`,
    items: [
      {
        title: 'Développement Web',
        description:
          'Sites web rapides et responsives construits avec des technologies modernes — des pages d’atterrissage et portfolios aux plateformes web complexes.',
      },
      {
        title: 'Développement Frontend',
        description:
          'Interfaces utilisateur réactives et interactives avec React, Next.js et Tailwind CSS, à la fois rapides et spectaculaires.',
      },
      {
        title: 'Design UI/UX',
        description:
          'Interfaces centrées sur l’humain — de la recherche et des wireframes aux prototypes Figma aboutis et aux design systems évolutifs.',
      },
      {
        title: 'Design Graphique',
        description:
          'Identités de marque, logos, visuels marketing et designs pour réseaux sociaux qui rendent votre produit inoubliable.',
      },
    ],
  },
  skills: {
    label: 'Mon expertise',
    title: 'Compétences & Technologies',
    proficiencyAria: (name: string) => `Niveau en ${name}`,
    bars: [
      { name: 'JavaScript / TypeScript', level: 95 },
      { name: 'React & Next.js', level: 92 },
      { name: 'HTML / CSS / Tailwind', level: 95 },
      { name: 'Design UI/UX (Figma)', level: 90 },
      { name: 'Design Graphique (Ps / Ai)', level: 85 },
      { name: 'Node.js & Bases de données', level: 78 },
    ],
    soft: {
      strike: 'Soft',
      real: 'Real Skills',
      items: ['Leadership', 'Recherche', 'Lecture', 'Communication', 'Intelligence émotionnelle'],
      more: 'Plus',
    },
  },
  projects: {
    label: 'Projets à la une',
    title: 'Quelques-uns de mes travaux récents',
    viewAll: 'Voir tous les projets',
    loadingAria: 'Chargement des projets',
    error: 'Les projets arrivent — actualisez dans un instant.',
    demoAria: (title: string) => `Ouvrir la démo de ${title}`,
    previewAlt: (title: string) => `Aperçu du projet web ${title} — réalisé par Atong Glory`,
    categories: {
      'Data Visualization': 'Visualisation de données',
      'E-Commerce': 'E-Commerce',
      Productivity: 'Productivité',
    } as Record<string, string>,
  },
  testimonials: {
    label: 'Témoignages',
    title: 'Ce que disent les clients',
    ratedAria: (rating: number) => `Noté ${rating} sur 5 étoiles`,
    goToAria: (i: number) => `Aller au témoignage ${i}`,
  },
  contact: {
    label: 'Restons en contact',
    title: (
      <>
        Construisons quelque chose
        <br className="hidden sm:block" /> d’extraordinaire ensemble
      </>
    ),
    form: {
      yourName: 'Votre nom',
      yourNamePlaceholder: 'Votre nom',
      yourEmail: 'Votre e-mail',
      yourEmailPlaceholder: 'vous@exemple.com',
      projectType: 'Type de projet',
      projectTypePlaceholder: 'Sélectionnez le type de projet',
      budgetRange: 'Fourchette de budget',
      budgetRangePlaceholder: 'Sélectionnez votre budget',
      message: 'Parlez-moi de votre projet...',
      messagePlaceholder: 'Objectifs, calendrier, fonctionnalités nécessaires — tout ce qui peut aider.',
      send: 'Envoyer le message',
      sending: 'Envoi en cours...',
    },
    validation: {
      name: 'Veuillez saisir votre nom.',
      email: 'Veuillez saisir une adresse e-mail valide.',
      message: 'Dites-m’en un peu plus (min. 10 caractères).',
    },
    toast: {
      sentTitle: 'Message envoyé !',
      sentDescription: 'Merci de m’avoir contacté — je vous répondrai sous 24 heures.',
      errorTitle: 'Impossible d’envoyer le message',
      fallbackDescription: 'Veuillez vérifier le formulaire et réessayer.',
      networkTitle: 'Erreur réseau',
      networkDescription: 'Veuillez vérifier votre connexion et réessayer.',
    },
    projectTypes: ['Application Web', 'Boutique E-Commerce', 'Plateforme SaaS', 'Design UI/UX', 'Design Graphique', 'Autre'],
    budgets: ['Moins de 1 000 $', '1 000 $ – 5 000 $', '5 000 $ – 10 000 $', 'Plus de 10 000 $'],
    info: {
      email: 'E-mail',
      phone: 'Téléphone',
      location: 'Localisation',
      responseTime: 'Délai de réponse',
      responseTimeValue: 'Sous 24 heures',
    },
    availabilityCard: {
      strong: 'Actuellement disponible',
      rest:
        ' pour des missions freelance et des postes à temps plein. Transformons votre idée en un produit que les gens adorent.',
    },
  },
  caseStudy: {
    backHome: 'Retour à l\'accueil',
    metricsTitle: 'Indicateurs clés',
    liveDemo: 'Démo en direct',
    sourceCode: 'Code source',
  },
  footer: {
    description:
      'Développeur Frontend & Designer UI/UX — création de sites web et d’applications rapides et responsives avec React, Next.js et TypeScript. Des solutions numériques qui génèrent des résultats et des expériences utilisateur exceptionnelles.',
    quickLinks: 'Liens rapides',
    services: 'Services',
    followMe: 'Suivez-moi',
    visitorPrefixLabel: 'Vous êtes le visiteur',
    visitorSuffix: ' — comptabilisé en direct depuis la base de données',
    rights: (year: number) => `© ${year} Atong Glory. Tous droits réservés.`,
    builtWith: 'Construit avec ',
    builtWithMiddle: ', Next.js et beaucoup de ',
  },
}

export const dictionaries: Record<Lang, Dictionary> = { en, fr }
