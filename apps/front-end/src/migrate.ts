import "dotenv/config";
import { migrate } from "drizzle-orm/libsql/migrator";
import db, { connection } from "@/lib/db";

(async () => {
  // This will run migrations on the database, skipping the ones already applied
  await migrate(db, { migrationsFolder: "./drizzle" });

  await connection.close();
})();
