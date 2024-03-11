import { DatabaseConfiguration } from "@hocuspocus/extension-database";
import { createClient } from "@libsql/client";
import { env } from "./env.js";

const client = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
});

const tursoConfiguration: DatabaseConfiguration = {
  async fetch({ documentName }) {
    const res = await client.execute({
      sql: `SELECT name, data 
            FROM document
            WHERE name = ?
        `,
      args: [documentName],
    });

    const data = res.rows[0]?.data;
    if (data instanceof ArrayBuffer) {
      return new Uint8Array(data);
    }

    return null;
  },

  async store({ documentName, state: documentData }) {
    const now = new Date().getTime();
    await client.execute({
      sql: `UPDATE document
            SET data = ?,
                modifiedOn = ?
            WHERE name = ? 
        `,
      args: [documentName, now, documentData],
    });
  },
};

export default tursoConfiguration;
