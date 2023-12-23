import { Database } from "@hocuspocus/extension-database";
import { Extension, fetchPayload, storePayload } from "@hocuspocus/server";
import mysql, { ConnectionOptions } from "mysql2/promise";

const CREATE_TABLE_SCHEMA = `CREATE TABLE IF NOT EXISTS documents (
    name varchar(255) NOT NULL,
    data blob NOT NULL,
    created_on timestamp DEFAULT CURRENT_TIMESTAMP(),
    modified_on timestamp,
    PRIMARY KEY (name)
  )`;

const UPSERT_DOCUMENT_QUERY = `INSERT INTO documents (name, data, modified_on)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE 
    data = ?,
    modified_on = ?
`;

const SELECT_DOCUMENT_BY_NAME_QUERY = `SELECT name, data 
    FROM documents
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

  async onConfigure() {
    const conn = await this.connect();
    try {
      await conn.execute(CREATE_TABLE_SCHEMA);
    } finally {
      conn.end();
    }
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
    const now = new Date();
    try {
      await conn.execute(UPSERT_DOCUMENT_QUERY, [
        documentName,
        documentData,
        now,
        documentData,
        now,
      ]);
    } finally {
      conn.end();
    }
  }
}

export default MySQL;
