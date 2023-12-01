import { Hocuspocus } from "@hocuspocus/server";

const PORT = process.env.PORT ? Number(process.env.PORT) : 1234;

// Configure the server …
const server = new Hocuspocus({
  port: PORT,
});

// … and run it!
server.listen();
