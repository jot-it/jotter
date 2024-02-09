import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import env from "./env-server";

const authOptions: AuthOptions = {
  pages: {
    signIn: "/signin",
  },

  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
  ],
};

export default authOptions;
