import { withAuth } from 'next-auth/middleware'
import { isAllowedAdminLogin } from '@/lib/admin-identity'

export default withAuth({
  pages: { signIn: '/admin/login' },
  callbacks: {
    authorized: ({ token, req }) => {
      if (req.nextUrl.pathname === '/admin/login') return true
      const login = typeof token?.githubLogin === 'string' ? token.githubLogin : null
      return isAllowedAdminLogin(login, process.env.ADMIN_GITHUB_USERNAME)
    },
  },
})

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
