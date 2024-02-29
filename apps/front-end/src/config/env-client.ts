import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_COLLAB_SERVER_URL: z.string().min(1),
});

// Nextjs strips `process.env`on client side. We need to explicitly list all
// client-side environment variables here
const env = envSchema.parse({
  NEXT_PUBLIC_COLLAB_SERVER_URL: process.env.NEXT_PUBLIC_COLLAB_SERVER_URL,
});

export default env;
