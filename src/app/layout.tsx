import type { Metadata, Viewport } from "next";
import { Inter, Poppins, Great_Vibes } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { StructuredData } from "@/components/portfolio/structured-data";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  // Resolves every relative SEO URL below (canonical, OG, sitemap, JSON-LD…).
  // Override the default with NEXT_PUBLIC_SITE_URL when deploying to a domain.
  metadataBase: new URL(SITE_URL),
  // NOTE: <title> is rendered (and localized EN/FR) by <LanguageProvider> via a
  // React-19-hoisted <title> element — see src/components/portfolio/language-provider.tsx
  // and src/lib/site.ts (SITE_TITLE is the EN fallback used in OG/Twitter/JSON-LD).
  description: SITE_DESCRIPTION,
  keywords: [
    // EN — identity + core
    "Atong Glory",
    "Atong Glory Portfolio",
    "Frontend Developer",
    "Frontend Developer Portfolio",
    "UI/UX Designer",
    "UI/UX Design",
    "Graphics Designer",
    "Graphic Design",
    // EN — tech + long-tail
    "React Developer",
    "React.js",
    "Next.js Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "Tailwind CSS",
    "Web Developer",
    "Web Development",
    "Web Design",
    "Responsive Web Design",
    "Landing Page Design",
    "Figma to Code",
    "Freelance Web Developer",
    "Hire Frontend Developer",
    "Portfolio Website",
    // FR — miroir bilingue
    "Développeur Frontend",
    "Développeur Web",
    "Développeur React",
    "Designer UI/UX",
    "Designer Graphique",
    "Développement Web",
    "Création de Site Web",
    "Design Responsive",
    "Développeur Freelance",
    "Embaucher Développeur Frontend",
    "Portfolio Développeur",
  ],
  authors: [{ name: "Atong Glory", url: SITE_URL }],
  creator: "Atong Glory",
  publisher: "Atong Glory",
  category: "technology",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  alternates: {
    canonical: "/",
    // Language switching is client-side (one URL, two locales), so both
    // hreflang entries resolve to the canonical URL.
    languages: {
      en: "/",
      fr: "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    alternateLocale: ["fr_FR"],
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Atong Glory — Frontend Developer, UI/UX & Graphics Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: ["/favicon.svg"],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#05070c" },
    { media: "(prefers-color-scheme: light)", color: "#f7f5f1" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} ${greatVibes.variable} antialiased bg-background text-foreground`}
      >
        <StructuredData />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
