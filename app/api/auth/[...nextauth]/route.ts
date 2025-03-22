import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"

// Mock user database - in a real app, this would be in a database
const users = [
  {
    id: "1",
    name: "Demo User",
    email: "admin@gmail.com",
    password: "123", // In a real app, this would be hashed
    subscriptionPlan: "free",
    subscriptionEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  },
]

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Find user in the mock database
        const user = users.find((user) => user.email === credentials.email)

        // Check if user exists and password matches
        if (user && user.password === credentials.password) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            subscriptionPlan: user.subscriptionPlan,
            subscriptionEndDate: user.subscriptionEndDate,
          }
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add subscription info to the token when user signs in
      if (user) {
        token.subscriptionPlan = (user as any).subscriptionPlan || "free"
        token.subscriptionEndDate = (user as any).subscriptionEndDate || null
      }
      return token
    },
    async session({ session, token }) {
      // Add subscription info to the session
      if (session.user) {
        session.user.subscriptionPlan = token.subscriptionPlan as string
        session.user.subscriptionEndDate = token.subscriptionEndDate as Date
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

