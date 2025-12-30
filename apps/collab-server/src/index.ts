import { Logger } from "@hocuspocus/extension-logger";
import { Hocuspocus } from "@hocuspocus/server";
import { env } from "./env.js";

const PORT = env.PORT ? Number(env.PORT) : 1234;

// Configure the server with local-first collaboration
// No authentication or database persistence required
const server = new Hocuspocus({
  port: PORT,
  extensions: [new Logger()],
});

// Run the server
server.listen();
