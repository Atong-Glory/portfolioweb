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
        jobTitle: "Full-Stack Software Engineer",
        description: SITE_DESCRIPTION,
        email: `mailto:${SITE_EMAIL}`,
        url: SITE_URL,
        image: `${SITE_URL}/images/hero-portrait.jpg`,
        sameAs: [...SOCIAL_LINKS],
        knowsLanguage: ["English", "French"],
        keywords:
          "Full-Stack Software Engineer, React, Next.js, TypeScript, Prisma, Cloudflare Workers, Ingénieur logiciel full-stack",
        knowsAbout: [
          "Full-Stack Development",
          "React",
          "Next.js",
          "TypeScript",
          "JavaScript",
          "Tailwind CSS",
          "Application APIs",
          "Relational Databases",
          "Cloudflare Workers",
        ],
        knows: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: "Atong Glory Portfolio",
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
