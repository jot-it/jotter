import * as schema from "@/schema";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

export const connection = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const db = drizzle(connection, { schema });

export default db;
