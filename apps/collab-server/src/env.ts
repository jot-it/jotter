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
  DATABASE_USER: z.string(),
  DATABASE_PASS: z.string(),
  DATABASE_HOST: z.string(),
  DATABASE_NAME: z.string(),
});

export const env = envSchema.parse(process.env);
