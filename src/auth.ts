import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // MVP simplified admin login logic
        if (credentials?.email === "admin@thecrown360.com" && credentials?.password === "admin123") {
          return { id: "1", name: "Admin", email: "admin@thecrown360.com", role: "ADMIN" }
        }
        return null
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // @ts-ignore
        token.role = user.role
      }
      return token
    },
    session({ session, token }) {
      if (session.user && token.role) {
        // @ts-ignore
        session.user.role = token.role as string
      }
      return session
    }
  },
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/admin/login",
  }
})
