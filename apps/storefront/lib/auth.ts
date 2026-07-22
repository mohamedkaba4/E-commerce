import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prismaAuth } from './prisma-auth'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaAuth as any),
  debug: true,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  logger: {
    error(code, metadata) { console.error(code, metadata) },
    warn(code) { console.warn(code) },
    debug(code, metadata) { console.debug(code, metadata) }
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).id = token.id
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
