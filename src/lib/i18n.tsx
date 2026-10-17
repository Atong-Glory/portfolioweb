// Portfolio i18n dictionaries (EN / FR)
// Single source of truth for every piece of UI copy on the site.
// DB-driven content (projects, testimonials) carries parallel FR fields
// in the database and falls back to English when a translation is missing.

export type Lang = 'en' | 'fr'

const en = {
  meta: {
    title: 'Atong Glory — Full-Stack Software Engineer',
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
    roles: ['Full-Stack Software Engineer', 'TypeScript & React Developer', 'Next.js & Cloudflare Builder'],
    description:
      'I build web applications across the interface, server routes, data layer, and deployment—making thoughtful trade-offs and keeping the code easy to work with.',
    hireMe: 'Discuss an Opportunity',
    viewMyWork: 'Explore the Build',
    portraitAlt:
      'Portrait of Atong Glory, full-stack software engineer',
  },
  about: {
    label: 'About Me',
    title: (
      <>
        Product-minded
        <br className="hidden sm:block" /> Full-Stack Engineering
      </>
    ),
    paragraphs: [
      'I’m Atong Glory, a full-stack software engineer interested in building useful, well-structured web applications. I care about understanding the problem, choosing a practical approach, and making the result clear to use and straightforward to maintain.',
      'This portfolio is a working example: a bilingual Next.js application with typed UI, server routes, database-backed project content, an admin area, and a Cloudflare deployment path. The code and its trade-offs are more useful evidence than unverified performance numbers or client claims.',
    ],
    downloadResume: 'Download Resume',
    info: {
      name: 'Name:',
      nameValue: 'Atong Glory',
      email: 'Email:',
      location: 'Location:',
      locationValue: 'Bamenda, Cameroon',
    },
  },
  services: {
    label: 'How I Contribute',
    title: 'Full-Stack Engineering',
    learnMore: 'Discuss this area',
    learnMoreAria: (title: string) => `Discuss ${title}`,
    items: [
      {
        title: 'Frontend & Product UI',
        description:
          'Build responsive, accessible interfaces with React and TypeScript, connecting clear interaction design to real product behavior.',
      },
      {
        title: 'Application APIs',
        description:
          'Create server-side routes and integrations with explicit validation, useful error handling, and maintainable boundaries.',
      },
      {
        title: 'Data & Persistence',
        description:
          'Model application data and connect it to the product with Prisma, relational databases, and environment-appropriate adapters.',
      },
      {
        title: 'Delivery & Operations',
        description:
          'Bring the pieces together with production builds, deployment configuration, and clear local setup and operating instructions.',
      },
    ],
  },
  skills: {
    label: 'Tools in This Build',
    title: 'A practical full-stack toolkit',
    intro: 'These technologies are used in this portfolio repository.',
    groups: [
      { title: 'Application', items: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS'] },
      { title: 'Data & APIs', items: ['Prisma', 'SQLite', 'Cloudflare D1'] },
      { title: 'Delivery', items: ['Cloudflare Workers', 'OpenNext', 'Git'] },
    ],
  },
  projects: {
    label: 'Selected Build',
    title: 'A full-stack project you can inspect',
    viewAll: 'Discuss the build',
    loadingAria: 'Loading projects',
    error: 'Projects are warming up — refresh in a moment.',
    retry: 'Try again',
    empty: 'The featured project is being prepared. Please check back soon.',
    caseStudy: 'Read the case study',
    demoAria: (title: string) => `Open live demo of ${title}`,
    previewAlt: (title: string) => `${title} — web project preview built by Atong Glory`,
    // Category translations for DB-driven categories
    categories: {
      'Data Visualization': 'Data Visualization',
      'E-Commerce': 'E-Commerce',
      Productivity: 'Productivity',
      'Full-stack Application': 'Full-stack Application',
    } as Record<string, string>,
  },
  testimonials: {
    label: 'Testimonials',
    title: 'What Clients Say',
    ratedAria: (rating: number) => `Rated ${rating} out of 5 stars`,
    goToAria: (i: number) => `Go to testimonial ${i}`,
  },
  contact: {
    label: 'Contact',
    title: (
      <>
        Let&apos;s Talk About
        <br className="hidden sm:block" /> Engineering
      </>
    ),
    form: {
      yourName: 'Your Name',
      yourNamePlaceholder: 'Your name',
      yourEmail: 'Your Email',
      yourEmailPlaceholder: 'you@example.com',
      projectType: 'Conversation topic',
      projectTypePlaceholder: 'Select a topic',
      message: 'Your message',
      messagePlaceholder: 'Share the role, team, or engineering problem you would like to discuss.',
      required: 'required',
      optional: 'optional',
      requiredFieldsNote: 'Fields marked required must be completed.',
      messageCount: (current: number, max: number) => `${current} / ${max} characters`,
      send: 'Send Email',
      sending: 'Sending...',
      privacyNotice:
        'Your name, email, topic, and message are stored for 12 months, then removed during a daily cleanup. Your request IP is used for rate limiting; expired rate-limit records are also cleaned daily. Cloudflare Turnstile may process verification data, and Resend may deliver an email notification when configured. Email copies are not removed by this database cleanup. To request earlier deletion, contact:',
    },
    validation: {
      nameRequired: 'Please enter your name.',
      nameLength: 'Your name must be between 2 and 120 characters.',
      emailRequired: 'Please enter your email address.',
      email: 'Please enter a valid email.',
      projectTypeLength: 'Please keep the conversation topic under 120 characters.',
      messageRequired: 'Please enter a message.',
      messageLength: 'Your message must be between 10 and 5,000 characters.',
      form: 'Please review the highlighted fields and try again.',
    },
    toast: {
      sentTitle: 'Message sent!',
      sentDescription: 'Thanks for reaching out. I’ll reply by email.',
      errorTitle: 'Could not send message',
      fallbackDescription: 'Please review the form and try again.',
      networkTitle: 'Network error',
      networkDescription: 'Please check your connection and try again.',
    },
    projectTypes: ['Full-time engineering role', 'Team conversation', 'Project collaboration', 'Other'],
    info: {
      email: 'Email',
      location: 'Location',
    },
    conversationCard: {
      strong: 'Hiring and team conversations',
      rest: 'I’m glad to discuss the role, product, and engineering problems your team is working on.',
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
      'Full-stack software engineer building web applications with TypeScript, React, Next.js, Prisma, and Cloudflare.',
    quickLinks: 'Quick Links',
    services: 'Services',
    followMe: 'Follow Me',
    rights: (year: number) => `© ${year} Atong Glory. All rights reserved.`,
    builtWith: 'Built with ',
    builtWithMiddle: ', Next.js and lots of ',
  },
}

export type Dictionary = typeof en

const fr: Dictionary = {
  meta: {
    title: 'Atong Glory — Ingénieur logiciel full-stack',
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
    roles: ['Ingénieur logiciel full-stack', 'Développeur TypeScript & React', 'Développeur Next.js & Cloudflare'],
    description:
      'Je développe des applications web de l’interface aux routes serveur, aux données et au déploiement, avec des choix réfléchis et un code facile à maintenir.',
    hireMe: 'Parlons d’une opportunité',
    viewMyWork: 'Voir la réalisation',
    portraitAlt:
      'Portrait d’Atong Glory, ingénieur logiciel full-stack',
  },
  about: {
    label: 'À propos de moi',
    title: (
      <>
        Ingénierie full-stack
        <br className="hidden sm:block" /> orientée produit
      </>
    ),
    paragraphs: [
      'Je suis Atong Glory, ingénieur logiciel full-stack intéressé par la création d’applications web utiles et bien structurées. Je m’attache à comprendre le problème, choisir une approche pragmatique et produire un résultat clair et facile à maintenir.',
      'Ce portfolio en est un exemple concret : une application Next.js bilingue avec interface typée, routes serveur, contenu de projets en base de données, espace d’administration et déploiement prévu pour Cloudflare. Le code et ses compromis sont de meilleures preuves que des chiffres ou des références clients non vérifiés.',
    ],
    downloadResume: 'Télécharger le CV',
    info: {
      name: 'Nom :',
      nameValue: 'Atong Glory',
      email: 'E-mail :',
      location: 'Localisation :',
      locationValue: 'Bamenda, Cameroun',
    },
  },
  services: {
    label: 'Ma contribution',
    title: 'Ingénierie full-stack',
    learnMore: 'Discuter de ce domaine',
    learnMoreAria: (title: string) => `Discuter de ${title}`,
    items: [
      {
        title: 'Interface et produit',
        description:
          'Créer des interfaces accessibles et adaptatives avec React et TypeScript, en reliant les interactions aux besoins réels du produit.',
      },
      {
        title: 'API applicatives',
        description:
          'Développer des routes serveur et intégrations avec validation explicite, erreurs utiles et limites maintenables.',
      },
      {
        title: 'Données et persistance',
        description:
          'Modéliser les données et les relier au produit avec Prisma, des bases relationnelles et des adaptateurs adaptés à l’environnement.',
      },
      {
        title: 'Livraison et exploitation',
        description:
          'Assembler les éléments avec des builds de production, une configuration de déploiement et des instructions de développement claires.',
      },
    ],
  },
  skills: {
    label: 'Technologies de ce projet',
    title: 'Un ensemble d’outils full-stack',
    intro: 'Ces technologies sont utilisées dans le dépôt de ce portfolio.',
    groups: [
      { title: 'Application', items: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS'] },
      { title: 'Données et API', items: ['Prisma', 'SQLite', 'Cloudflare D1'] },
      { title: 'Livraison', items: ['Cloudflare Workers', 'OpenNext', 'Git'] },
    ],
  },
  projects: {
    label: 'Réalisation choisie',
    title: 'Un projet full-stack à examiner',
    viewAll: 'Discuter du projet',
    loadingAria: 'Chargement des projets',
    error: 'Les projets arrivent — actualisez dans un instant.',
    retry: 'Réessayer',
    empty: 'Le projet présenté est en préparation. Revenez bientôt.',
    caseStudy: 'Lire le cas pratique',
    demoAria: (title: string) => `Ouvrir la démo de ${title}`,
    previewAlt: (title: string) => `Aperçu du projet web ${title} — réalisé par Atong Glory`,
    categories: {
      'Data Visualization': 'Visualisation de données',
      'E-Commerce': 'E-Commerce',
      Productivity: 'Productivité',
      'Full-stack Application': 'Application full-stack',
    } as Record<string, string>,
  },
  testimonials: {
    label: 'Témoignages',
    title: 'Ce que disent les clients',
    ratedAria: (rating: number) => `Noté ${rating} sur 5 étoiles`,
    goToAria: (i: number) => `Aller au témoignage ${i}`,
  },
  contact: {
    label: 'Contact',
    title: (
      <>
        Parlons
        <br className="hidden sm:block" /> d’ingénierie
      </>
    ),
    form: {
      yourName: 'Votre nom',
      yourNamePlaceholder: 'Votre nom',
      yourEmail: 'Votre e-mail',
      yourEmailPlaceholder: 'vous@exemple.com',
      projectType: 'Sujet de discussion',
      projectTypePlaceholder: 'Choisissez un sujet',
      message: 'Votre message',
      messagePlaceholder: 'Présentez le poste, l’équipe ou le problème technique dont vous souhaitez discuter.',
      required: 'obligatoire',
      optional: 'facultatif',
      requiredFieldsNote: 'Les champs indiqués comme obligatoires doivent être remplis.',
      messageCount: (current: number, max: number) => `${current} / ${max} caractères`,
      send: 'Envoyer le message',
      sending: 'Envoi en cours...',
      privacyNotice:
        'Votre nom, votre e-mail, le sujet et le message sont conservés pendant 12 mois, puis supprimés lors d’un nettoyage quotidien. Votre adresse IP est utilisée pour limiter les envois ; les entrées de limitation expirées sont également supprimées chaque jour. Cloudflare Turnstile peut traiter des données de vérification, et Resend peut envoyer une notification par e-mail si le service est configuré. Les copies par e-mail ne sont pas supprimées par ce nettoyage. Pour demander une suppression anticipée, contactez :',
    },
    validation: {
      nameRequired: 'Veuillez saisir votre nom.',
      nameLength: 'Votre nom doit comporter entre 2 et 120 caractères.',
      emailRequired: 'Veuillez saisir votre adresse e-mail.',
      email: 'Veuillez saisir une adresse e-mail valide.',
      projectTypeLength: 'Le sujet de discussion ne doit pas dépasser 120 caractères.',
      messageRequired: 'Veuillez saisir un message.',
      messageLength: 'Votre message doit comporter entre 10 et 5 000 caractères.',
      form: 'Veuillez vérifier les champs signalés, puis réessayer.',
    },
    toast: {
      sentTitle: 'Message envoyé !',
      sentDescription: 'Merci pour votre message. Je vous répondrai par e-mail.',
      errorTitle: 'Impossible d’envoyer le message',
      fallbackDescription: 'Veuillez vérifier le formulaire et réessayer.',
      networkTitle: 'Erreur réseau',
      networkDescription: 'Veuillez vérifier votre connexion et réessayer.',
    },
    projectTypes: ['Poste d’ingénieur logiciel', 'Discussion avec une équipe', 'Collaboration sur un projet', 'Autre'],
    info: {
      email: 'E-mail',
      location: 'Localisation',
    },
    conversationCard: {
      strong: 'Discussions de recrutement et d’équipe',
      rest: 'Je serais heureux d’échanger sur le poste, le produit et les défis techniques de votre équipe.',
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
      'Ingénieur logiciel full-stack qui développe des applications web avec TypeScript, React, Next.js, Prisma et Cloudflare.',
    quickLinks: 'Liens rapides',
    services: 'Services',
    followMe: 'Suivez-moi',
    rights: (year: number) => `© ${year} Atong Glory. Tous droits réservés.`,
    builtWith: 'Construit avec ',
    builtWithMiddle: ', Next.js et beaucoup de ',
  },
}

export const dictionaries: Record<Lang, Dictionary> = { en, fr }
