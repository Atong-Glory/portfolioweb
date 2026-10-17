import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import { getGithubLogin, isAllowedAdminLogin } from '@/lib/admin-identity'

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ profile }) {
      return isAllowedAdminLogin(
        getGithubLogin(profile),
        process.env.ADMIN_GITHUB_USERNAME
      )
    },
    async jwt({ token, profile }) {
      if (profile) {
        const login = getGithubLogin(profile)
        if (isAllowedAdminLogin(login, process.env.ADMIN_GITHUB_USERNAME) && login) {
          token.githubLogin = login
        } else {
          delete token.githubLogin
        }
      }
      return token
    },
  },
  pages: {
    signIn: '/admin/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}
