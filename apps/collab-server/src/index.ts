import { Hocuspocus } from "@hocuspocus/server";
import { SQLite } from "@hocuspocus/extension-sqlite";
import { Logger } from "@hocuspocus/extension-logger";

const PORT = process.env.PORT ? Number(process.env.PORT) : 1234;

// Configure the server …
const server = new Hocuspocus({
  port: PORT,
  extensions: [new SQLite(), new Logger()],
});

// … and run it!
server.listen();
