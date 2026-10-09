// JSON-LD structured data for search engines (schema.org).
// Rendered once from the root layout as a single @graph containing:
//   - ProfilePage  : the portfolio home page as a personal profile
//   - Person       : Atong Glory (mainEntity of the profile)
//   - WebSite      : the site itself, published by the person
// Validate at https://search.google.com/test/rich-results after deploy.

import { SITE_DESCRIPTION, SITE_EMAIL, SITE_NAME, SITE_TITLE, SITE_URL, SOCIAL_LINKS } from "@/lib/site";

export function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        inLanguage: ["en", "fr"],
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Atong Glory",
        givenName: "Atong",
        familyName: "Glory",
        jobTitle: "Frontend Developer & UI/UX Designer",
        description: SITE_DESCRIPTION,
        email: `mailto:${SITE_EMAIL}`,
        url: SITE_URL,
        image: `${SITE_URL}/images/hero-portrait.jpg`,
        sameAs: [...SOCIAL_LINKS],
        knowsLanguage: ["English", "French"],
        keywords:
          "Frontend Developer, UI/UX Designer, Graphics Designer, React, Next.js, TypeScript, Tailwind CSS, Responsive Web Design, Landing Page Design, Figma to Code, Freelance Web Developer, Développeur Frontend, Développeur Web, Designer Graphique",
        knowsAbout: [
          "Frontend Development",
          "React",
          "Next.js",
          "TypeScript",
          "JavaScript",
          "Tailwind CSS",
          "UI/UX Design",
          "Graphic Design",
          "Responsive Web Design",
          "Figma to Code",
        ],
        knows: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: "RHIZORA TECH Portfolio",
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
