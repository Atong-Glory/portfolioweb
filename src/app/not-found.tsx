import Link from "next/link";

// Branded 404 — bilingual (EN/FR) to match the site's audience.
// Server component on purpose: it must render even when JS is unavailable.
export default function NotFound() {
  return (
    <div className="rt-root flex min-h-screen flex-col items-center justify-center bg-base px-6 text-center font-sans text-body">
      <p
        aria-hidden="true"
        className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text font-display text-7xl font-extrabold tracking-tight text-transparent sm:text-8xl"
      >
        404
      </p>
      <h1 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">
        Page not found — Page introuvable
      </h1>
      <p className="mt-3 max-w-md leading-relaxed text-soft">
        The page you are looking for doesn&apos;t exist or has been moved.
        <br className="hidden sm:block" />
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_8px_28px_rgba(249,115,22,0.45)] transition-transform duration-300 hover:scale-105"
      >
        ← Back home / Retour à l&apos;accueil
      </Link>
    </div>
  );
}
