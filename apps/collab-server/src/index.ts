import { Database } from "@hocuspocus/extension-database";
import { Logger } from "@hocuspocus/extension-logger";
import { Hocuspocus } from "@hocuspocus/server";
import { jwtVerify } from "jose";
import { env } from "./env.js";
import tursoConfiguration from "./turso-config.js";

const PORT = env.PORT ? Number(env.PORT) : 1234;

// Configure the server …
const server = new Hocuspocus({
  port: PORT,

  async onAuthenticate(data) {
    const key = new TextEncoder().encode(env.AUTH_SECRET);
    await jwtVerify(data.token, key);
  },

  extensions: [new Logger(), new Database(tursoConfiguration)],
});

// // … and run it!
server.listen();
