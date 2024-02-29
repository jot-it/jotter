import { z } from "zod";

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
  DATABASE_USER: z.string().min(1),
  DATABASE_PASS: z.string().min(1),
  DATABASE_HOST: z.string().min(1),
  DATABASE_NAME: z.string().min(1),
  AUTH_SECRET: z.string().min(1),
});

export const env = envSchema.parse(process.env);
