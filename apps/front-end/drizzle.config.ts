import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schema.ts",
  driver: "mysql2",
  out: "./drizzle",
  dbCredentials: {
    uri: process.env.DATABASE_URL!,
  },
});
