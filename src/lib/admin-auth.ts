import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { isAllowedAdminLogin, isValidAdminApiSecret } from '@/lib/admin-identity'

export async function isAdminAuthorized(req: NextRequest): Promise<boolean> {
  const headerSecret = req.headers.get('x-admin-secret')
  const envSecret = process.env.ADMIN_API_SECRET
  if (isValidAdminApiSecret(headerSecret, envSecret)) {
    return true
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const login = typeof token?.githubLogin === 'string' ? token.githubLogin : null
  return isAllowedAdminLogin(login, process.env.ADMIN_GITHUB_USERNAME)
}

export async function requireAdmin(req: NextRequest): Promise<NextResponse | null> {
  if (await isAdminAuthorized(req)) return null
  return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
}
