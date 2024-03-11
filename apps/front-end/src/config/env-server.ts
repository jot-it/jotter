import { z } from "zod";

const envSchema = z.object({
  GITHUB_SECRET: z.string().min(1),
  GITHUB_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_SECRET: z.string().min(1),
  DISCORD_SECRET: z.string().min(1),
  DISCORD_CLIENT_ID: z.string().min(1),
  NEXTAUTH_SECRET: z.string().min(1),
  TURSO_DATABASE_URL: z.string().min(1),
  TURSO_AUTH_TOKEN: z
    .string()
    .min(1)
    .optional()
    .refine((token) => {
      if (process.env.NODE_ENV === "production") {
        return Boolean(token);
      }
      return true;
    }, "A token is required to access production database."),
  NEXTAUTH_URL: z.string().min(1),
});

const env = envSchema.parse(process.env);

export default env;
