import { z } from "zod";

const envSchema = z.object({
  GITHUB_SECRET: z.string().min(1),
  GITHUB_CLIENT_ID: z.string().min(1),
  NEXTAUTH_SECRET: z.string().min(1),
});

const env = envSchema.parse(process.env);

export default env;
