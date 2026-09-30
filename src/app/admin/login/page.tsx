'use client'

import { signIn } from 'next-auth/react'
import { Github } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0e17] px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <h1 className="text-2xl font-bold text-white">DevFusion Admin</h1>
        <p className="mt-2 text-sm text-slate-400">Sign in with GitHub to manage inbox and content.</p>
        <Button
          className="mt-8 w-full bg-gradient-to-r from-amber-500 to-orange-600"
          onClick={() => signIn('github', { callbackUrl: '/admin' })}
        >
          <Github className="mr-2 h-4 w-4" />
          Continue with GitHub
        </Button>
      </div>
    </div>
  )
}
