import React from 'react'

/**
 * Hand-crafted, dependency-free brand icons for the tech stack grid.
 * Simplified but recognizable silhouettes with authentic brand colors.
 */

type IconProps = { className?: string }

export function ReactIcon({ className = 'h-7 w-7' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="2.1" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1.1" fill="none">
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </g>
    </svg>
  )
}

export function NextIcon({ className = 'h-7 w-7' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#0a0e17" stroke="#ffffff" strokeOpacity="0.25" />
      <path d="M8.5 7.5h2.4l5 7.4V7.5H18v9h-2.4l-5-7.4v7.4H8.5z" fill="#ffffff" />
      <path d="M16.6 17.5L9 6.9" stroke="#ffffff" strokeWidth="1.2" opacity="0.85" />
    </svg>
  )
}

export function NodeIcon({ className = 'h-7 w-7' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 1.8l8.8 5.1v10.2L12 22.2l-8.8-5.1V6.9z" fill="#83CD29" fillOpacity="0.18" stroke="#83CD29" strokeWidth="1.4" />
      <text x="12" y="15.6" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#83CD29" fontFamily="Arial, sans-serif">JS</text>
    </svg>
  )
}

export function TypeScriptIcon({ className = 'h-7 w-7' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1.5" y="1.5" width="21" height="21" rx="3.5" fill="#3178C6" />
      <text x="12" y="16.2" textAnchor="middle" fontSize="9" fontWeight="700" fill="#ffffff" fontFamily="Arial, sans-serif">TS</text>
    </svg>
  )
}

export function JavaScriptIcon({ className = 'h-7 w-7' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1.5" y="1.5" width="21" height="21" rx="3.5" fill="#F7DF1E" />
      <text x="12" y="16.2" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0a0e17" fontFamily="Arial, sans-serif">JS</text>
    </svg>
  )
}

export function TailwindIcon({ className = 'h-7 w-7' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#06B6D4" aria-hidden="true">
      <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.75 1.91 1.35C13.39 10.85 14.56 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.75-1.91-1.35C15.61 7.15 14.44 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.75 1.91 1.35C8.39 16.85 9.56 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.75-1.91-1.35C10.61 13.15 9.44 12 7 12z" />
    </svg>
  )
}

export function MongoDBIcon({ className = 'h-7 w-7' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 1.8c-1.1 3.4-4.4 6-4.4 10 0 2.9 1.8 5 4 5.8l.3 4.4c0 .2.1.4.1.4s.1-.2.1-.4l.3-4.4c2.2-.8 4-2.9 4-5.8 0-4-3.3-6.6-4.4-10z" fill="#47A248" />
      <path d="M12 3.5c-.7 2.6-2.9 4.7-2.9 7.9 0 2.3 1.3 4 2.9 4.7V3.5z" fill="#326639" opacity="0.65" />
    </svg>
  )
}

export function PostgreSQLIcon({ className = 'h-7 w-7' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2.2c5 0 9 3.4 9 8.4 0 4-2.6 7.3-6.2 8.9l-.5 2.3h-4.6l-.5-2.3C5.6 17.9 3 14.6 3 10.6c0-5 4-8.4 9-8.4z" fill="#336791" />
      <path d="M9.5 16.5c.4 1 .9 1.7 1.6 2.2M14.5 16.5c-.4 1-.9 1.7-1.6 2.2" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="1" strokeLinecap="round" />
      <circle cx="9" cy="9.5" r="1.1" fill="#ffffff" />
      <circle cx="15" cy="9.5" r="1.1" fill="#ffffff" />
      <path d="M8 13c1.2 1 2.6 1.5 4 1.5s2.8-.5 4-1.5" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export function GitIcon({ className = 'h-7 w-7' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4.2" y="4.2" width="15.6" height="15.6" rx="2" transform="rotate(45 12 12)" fill="#F05033" />
      <g stroke="#ffffff" strokeWidth="1.3" fill="none">
        <path d="M9 15V9.8a2 2 0 100-.1M9 12.5h4.4a1.6 1.6 0 001.6-1.6v-1" />
      </g>
      <circle cx="9" cy="15.4" r="1.5" fill="#ffffff" />
      <circle cx="15.4" cy="8.9" r="1.5" fill="#ffffff" />
    </svg>
  )
}

export function DockerIcon({ className = 'h-7 w-7' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g fill="#2496ED">
        <rect x="4" y="9" width="3" height="3" rx="0.4" />
        <rect x="8" y="9" width="3" height="3" rx="0.4" />
        <rect x="12" y="9" width="3" height="3" rx="0.4" />
        <rect x="8" y="5" width="3" height="3" rx="0.4" />
        <rect x="12" y="5" width="3" height="3" rx="0.4" />
        <rect x="16" y="9" width="3" height="3" rx="0.4" />
      </g>
      <path d="M2.5 13.5h17.8c.9 0 1.7.7 1.6 1.6-.4 3.2-3.6 5.4-8.4 5.4-5.4 0-9.4-2.7-11-7z" fill="#2496ED" />
    </svg>
  )
}

export function AwsIcon({ className = 'h-7 w-7' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="21" height="21" rx="3.5" fill="#232F3E" />
      <text x="12" y="13.6" textAnchor="middle" fontSize="8" fontWeight="700" fill="#ffffff" fontFamily="Arial, sans-serif">aws</text>
      <path d="M5 16.2c4.4 2.6 9.6 2.6 14 0" stroke="#FF9900" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M17.8 15.4l1.7.6-.8 1.6" stroke="#FF9900" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

export function FirebaseIcon({ className = 'h-7 w-7' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5.8 19.5L8.6 5.2c.1-.6.9-.7 1.2-.2l2.4 4.5-1 2.2z" fill="#FFA000" />
      <path d="M5.8 19.5l10.9-13.1c.4-.5 1.2-.2 1.2.4L19.6 19l-6.6 3.9c-.6.4-1.4.4-2.1 0z" fill="#F57C00" />
      <path d="M12.2 9.5l2.4-4.5c.3-.5 1-.4 1.2.2l3.8 13.8z" fill="#FFCA28" />
    </svg>
  )
}

export function GraphQLIcon({ className = 'h-7 w-7' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2.2l8.5 4.9v9.8L12 21.8l-8.5-4.9V7.1z" stroke="#E10098" strokeWidth="1.3" fill="none" />
      <g fill="#E10098">
        <circle cx="12" cy="2.2" r="1.9" />
        <circle cx="20.5" cy="7.1" r="1.9" />
        <circle cx="20.5" cy="16.9" r="1.9" />
        <circle cx="12" cy="21.8" r="1.9" />
        <circle cx="3.5" cy="16.9" r="1.9" />
        <circle cx="3.5" cy="7.1" r="1.9" />
      </g>
    </svg>
  )
}

export function ReduxIcon({ className = 'h-7 w-7' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10.4 6.2c-3.1.4-5.6 2-5.9 4.8-.2 2 1 3.7 2.4 4.8" stroke="#764ABC" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M13.6 17.8c3.1-.4 5.6-2 5.9-4.8.2-2-1-3.7-2.4-4.8" stroke="#764ABC" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <circle cx="9.2" cy="4.9" r="1.9" fill="#764ABC" />
      <circle cx="14.8" cy="19.1" r="1.9" fill="#764ABC" />
      <circle cx="12" cy="12" r="2.1" fill="#764ABC" />
    </svg>
  )
}

export function JestIcon({ className = 'h-7 w-7' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.5 4.5v6M12 3.5v7M17.5 4.5v6" stroke="#C21325" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="6.5" cy="4.5" r="1.6" fill="#C21325" />
      <circle cx="12" cy="3.5" r="1.6" fill="#C21325" />
      <circle cx="17.5" cy="4.5" r="1.6" fill="#C21325" />
      <path d="M6.5 10.5c0 2.5 2.5 4 5.5 4s5.5-1.5 5.5-4" stroke="#C21325" strokeWidth="1.5" fill="none" />
      <path d="M4 13.5c0 4 3.6 7 8 7s8-3 8-7c0-.9-.2-1.7-.5-2.4C18.4 12.7 15.4 14 12 14s-6.4-1.3-7.5-2.9c-.3.7-.5 1.5-.5 2.4z" fill="#C21325" />
      <circle cx="9.8" cy="17" r="1.1" fill="#ffffff" />
      <circle cx="14.2" cy="17" r="1.1" fill="#ffffff" />
    </svg>
  )
}

export function FigmaIcon({ className = 'h-7 w-7' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3H8.75a3.25 3.25 0 000 6.5H12z" fill="#F24E1E" />
      <path d="M12 3h3.25a3.25 3.25 0 010 6.5H12z" fill="#FF7262" />
      <path d="M12 9.5H8.75a3.25 3.25 0 000 6.5H12z" fill="#A259FF" />
      <circle cx="15.25" cy="12.75" r="3.25" fill="#1ABCFE" />
      <path d="M12 16H8.75a3.25 3.25 0 103.25 3.25z" fill="#0ACF83" />
    </svg>
  )
}

export function SupabaseIcon({ className = 'h-7 w-7' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13.6 2.2L4.8 13.1c-.4.5-.05 1.2.58 1.2h5.02l-1.1 7.2c-.1.7.75 1.1 1.2.55l8.8-10.9c.4-.5.05-1.2-.58-1.2h-5.02l1.1-7.2c.1-.7-.75-1.1-1.2-.55z" fill="#3ECF8E" />
      <path d="M10.4 14.3H5.38l8.22-10.17-1.1 7.2h5.02l-8.22 10.17z" fill="#2BA573" opacity="0.55" />
    </svg>
  )
}

export function PhotoshopIcon({ className = 'h-7 w-7' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1.5" y="1.5" width="21" height="21" rx="3.5" fill="#001E36" stroke="#31A8FF" strokeWidth="1.3" />
      <text x="12" y="16.2" textAnchor="middle" fontSize="9" fontWeight="700" fill="#31A8FF" fontFamily="Arial, sans-serif">Ps</text>
    </svg>
  )
}

export function IllustratorIcon({ className = 'h-7 w-7' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1.5" y="1.5" width="21" height="21" rx="3.5" fill="#330000" stroke="#FF9A00" strokeWidth="1.3" />
      <text x="12" y="16.2" textAnchor="middle" fontSize="9" fontWeight="700" fill="#FF9A00" fontFamily="Arial, sans-serif">Ai</text>
    </svg>
  )
}

export function LightroomIcon({ className = 'h-7 w-7' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1.5" y="1.5" width="21" height="21" rx="3.5" fill="#001E36" stroke="#31A8FF" strokeWidth="1.3" />
      <text x="12" y="16.2" textAnchor="middle" fontSize="9" fontWeight="700" fill="#31A8FF" fontFamily="Arial, sans-serif">Lr</text>
    </svg>
  )
}

export function MathIcon({ className = 'h-7 w-7' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1.5" y="1.5" width="21" height="21" rx="3.5" fill="#1A1205" stroke="#F97316" strokeWidth="1.3" />
      <text x="12" y="16.6" textAnchor="middle" fontSize="11" fontWeight="700" fill="#FB923C" fontFamily="Georgia, 'Times New Roman', serif">&#8721;</text>
    </svg>
  )
}

export function MoreIcon({ className = 'h-7 w-7' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="5" cy="12" r="2.2" fill="#94A3B8" />
      <circle cx="12" cy="12" r="2.2" fill="#94A3B8" />
      <circle cx="19" cy="12" r="2.2" fill="#94A3B8" />
    </svg>
  )
}

// Map used across the site (skills grid, hero badges, footer)
export const TECH_ICONS: Record<string, (props: IconProps) => React.JSX.Element> = {
  React: ReactIcon,
  'Next.js': NextIcon,
  'Node.js': NodeIcon,
  TypeScript: TypeScriptIcon,
  JavaScript: JavaScriptIcon,
  'Tailwind CSS': TailwindIcon,
  MongoDB: MongoDBIcon,
  PostgreSQL: PostgreSQLIcon,
  Git: GitIcon,
  Docker: DockerIcon,
  AWS: AwsIcon,
  Firebase: FirebaseIcon,
  GraphQL: GraphQLIcon,
  Redux: ReduxIcon,
  Jest: JestIcon,
  Figma: FigmaIcon,
  Supabase: SupabaseIcon,
  Photoshop: PhotoshopIcon,
  Illustrator: IllustratorIcon,
  Lightroom: LightroomIcon,
  Math: MathIcon,
  More: MoreIcon,
}
