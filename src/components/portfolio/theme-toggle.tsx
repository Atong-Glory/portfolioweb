'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Dark | Light pill toggle — sits next to the EN|FR switch in the navbar.
 *
 * The icon is swapped purely with the `dark:` CSS variant (html.dark),
 * so there is no mounted-state juggling and zero hydration mismatch:
 * - dark mode  -> shows Sun ("switch to light")
 * - light mode -> shows Moon ("switch to dark")
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle dark / light mode"
      title="Toggle dark / light mode"
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-full border border-edge-strong bg-wash text-orange-400 transition-all duration-300 hover:border-orange-500/50 hover:bg-wash-strong hover:text-amber-400',
        className
      )}
    >
      <Sun className="hidden h-4 w-4 dark:block" aria-hidden="true" />
      <Moon className="block h-4 w-4 dark:hidden" aria-hidden="true" />
    </button>
  )
}
