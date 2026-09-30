import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'

export async function isAdminAuthorized(req?: NextRequest): Promise<boolean> {
  const headerSecret = req?.headers.get('x-admin-secret')
  const envSecret = process.env.ADMIN_API_SECRET
  if (headerSecret && envSecret && headerSecret === envSecret) {
    return true
  }
  const session = await getServerSession(authOptions)
  return !!session?.user
}

export async function requireAdmin(req?: NextRequest): Promise<NextResponse | null> {
  if (await isAdminAuthorized(req)) return null
  return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
}
