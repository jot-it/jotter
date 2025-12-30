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
  NODE_ENV: z
    .union([z.literal("development"), z.literal("production")])
    .default("development"),
  PORT: z.optional(z.string()),
});

export const env = envSchema.parse(process.env);
