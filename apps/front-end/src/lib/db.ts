import env from "@/config/env-server";
import * as schema from "@/schema";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const connection = await createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
});

const db = drizzle(connection, { schema });

export default db;
