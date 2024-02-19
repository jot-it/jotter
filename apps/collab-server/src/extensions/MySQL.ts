import { Database } from "@hocuspocus/extension-database";
import { Extension, fetchPayload, storePayload } from "@hocuspocus/server";
import mysql, { ConnectionOptions } from "mysql2/promise";

const UPDATE_DOCUMENT_QUERY = `UPDATE document
    SET data = ?,
      modifiedOn = CURRENT_TIMESTAMP()
    WHERE name = ? 
`;

const SELECT_DOCUMENT_BY_NAME_QUERY = `SELECT name, data 
    FROM document
    WHERE name = ?
`;

class MySQL extends Database implements Extension {
  connectionConfig: ConnectionOptions;

  constructor(config: ConnectionOptions) {
    super({});
    this.connectionConfig = config;

    this.configuration.fetch = this.fetch.bind(this);
    this.configuration.store = this.store.bind(this);
  }

  async connect(): Promise<mysql.Connection> {
    return mysql.createConnection(this.connectionConfig);
  }

  async fetch({ documentName }: fetchPayload): Promise<Uint8Array | null> {
    const conn = await this.connect();
    try {
      const [rows] = await conn.execute<mysql.RowDataPacket[]>(
        SELECT_DOCUMENT_BY_NAME_QUERY,
        [documentName]
      );
      const res = rows[0];
      return res?.data ?? null;
    } finally {
      conn.end();
    }
  }

  async store({ documentName, state: documentData }: storePayload) {
    const conn = await this.connect();
    try {
      await conn.execute(UPDATE_DOCUMENT_QUERY, [documentData, documentName]);
    } catch (error) {
      console.error(error);
    } finally {
      conn.end();
    }
  }
}

export default MySQL;
