import { createNotebook } from "@/actions/document";
import prisma from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions, DefaultUser, getServerSession } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";
import env from "./env-server";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
  }
}

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist the user id to the token right after signin
      if (user) {
        token.userId = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      // Expose user id on client side
      session.user.id = token.userId;
      return session;
    },
  },
  events: {
    async signIn(e) {
      if (e.isNewUser) {
        await createNotebook();
      }
    },
  },
};

export async function getSession() {
  return getServerSession(authOptions);
}

export default authOptions;
