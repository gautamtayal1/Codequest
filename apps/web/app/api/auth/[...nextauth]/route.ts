import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { CredentialsProvider } from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import prisma from "@repo/db/config"

const authOption: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async signIn({account, profile}) {
      if(!profile?.email) {
        throw new Error('no profile')
      }

      await prisma.user.upsert({
        where: {
          email: profile.email
        },
        create: {
          email: profile.email,
          name: profile.name
        },
        update: {
          name: profile.name
        }
      })

      return true
    }
  }
}

const handler = NextAuth(authOption)
export { handler as GET, handler as POST }