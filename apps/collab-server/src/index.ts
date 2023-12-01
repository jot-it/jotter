import { Hocuspocus } from "@hocuspocus/server";
import { SQLite } from "@hocuspocus/extension-sqlite";

const PORT = process.env.PORT ? Number(process.env.PORT) : 1234;

// Configure the server …
const server = new Hocuspocus({
  port: PORT,
  extensions: [new SQLite()],
});

// … and run it!
server.listen();
