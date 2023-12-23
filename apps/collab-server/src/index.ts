import { Logger } from "@hocuspocus/extension-logger";
import { Hocuspocus } from "@hocuspocus/server";
import MySQL from "./extensions/MySQL.js";
import { env } from "./env.js";

const PORT = env.PORT ? Number(env.PORT) : 1234;
const IS_PRODUCTION = env.NODE_ENV === "production";

// Configure the server …
const server = new Hocuspocus({
  port: PORT,
  extensions: [
    new Logger(),

    new MySQL({
      user: env.DATABASE_USER,
      host: env.DATABASE_HOST,
      database: env.DATABASE_NAME,
      password: env.DATABASE_PASS,

      // Enable SSL on production. Production database will reject the connection
      // when this flag is not set.
      ssl: {
        rejectUnauthorized: IS_PRODUCTION,
      },
    }),
  ],
});

// // … and run it!
server.listen();
