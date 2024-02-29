import mysql from "mysql2/promise";
import env from "@/config/env-server";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "@/schema";

const connection = await mysql.createConnection(env.DATABASE_URL);

const db = drizzle(connection, { mode: "planetscale", schema });

export default db;
