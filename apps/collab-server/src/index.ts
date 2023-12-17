import { Logger } from "@hocuspocus/extension-logger";
import { Hocuspocus } from "@hocuspocus/server";
import MySQL from "./extensions/MySQL.js";
// import "./loadEnv.js";

const PORT = process.env.PORT ? Number(process.env.PORT) : 1234;
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL must be defined to persist document changes");
}

// Configure the server …
const server = new Hocuspocus({
  port: PORT,
  extensions: [new Logger(), new MySQL(DATABASE_URL)],
});

// // … and run it!
server.listen();
