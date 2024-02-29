import db from "@/lib/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { AuthOptions, DefaultUser, getServerSession } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { Adapter } from "next-auth/adapters";
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
  adapter: DrizzleAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
    newUser: "/",
  },
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_SECRET,
    }),
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_SECRET,
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
};

export async function getSession() {
  return getServerSession(authOptions);
}

export default authOptions;
