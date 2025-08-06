import { LoginFB } from "@/lib/mailer";
import prisma from "@/utils/prisma";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import assert from "node:assert";

const { GOOGLE_ID, GOOGLE_SECRET, AUTH_SECRET } = process.env;
if (!GOOGLE_ID || !GOOGLE_SECRET || !AUTH_SECRET) {
  throw new Error("Env variables missing");
}
const handler = NextAuth({
  secret: AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Combine user and token properties
      if (user) {
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (session.user) {
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
    async signIn({ account, profile }) {
      assert(profile);
      try {
        if (account?.provider === "google") {
          const existingUser = await prisma.user.findUnique({
            where: { email: profile?.email as string },
          });
          if (!existingUser) {
            await prisma.user.create({
              data: {
                email: profile?.email as string,
                name: profile?.name as string,
                image: profile?.image as string, // Google uses 'picture' not 'image'
              },
            });
          }
          // send email
          await LoginFB({ userEmail: profile?.email as string });
        }
        return true;
      } catch (error) {
        console.error("SignIn error:", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
