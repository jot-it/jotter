import { z } from "zod";
import "dotenv/config";

type EnvironmentVariables = z.infer<typeof envSchema>;

// Make environment variables types available through process.env
declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentVariables {}
  }
}

const envSchema = z.object({
  NODE_ENV: z.union([z.literal("development"), z.literal("production")]),
  PORT: z.optional(z.string()),
  AUTH_SECRET: z.string().min(1),
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
});

export const env = envSchema.parse(process.env);
