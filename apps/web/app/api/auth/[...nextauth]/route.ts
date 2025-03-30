import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import prisma from "@repo/db/config"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
    })
  ],
  session: {
    strategy: "jwt"
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        //@ts-ignore
        session.user.id = token.id;
      }
      return session;
    },  

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

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }