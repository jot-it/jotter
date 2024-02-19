import mysql from "mysql2/promise";
import env from "@/config/env-server";
import { drizzle } from "drizzle-orm/mysql2";

const connection = await mysql.createConnection(env.DATABASE_URL);

const db = drizzle(connection);

export default db;
