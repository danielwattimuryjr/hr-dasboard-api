import { Client, Pool, QueryResult, QueryResultRow } from 'pg';

let client: Pool | null = null;



const connect = async (): Promise<void> => {
  console.log("Connecting to DB");

  client = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
  });

  try {
    await client.query("SELECT 1+1");
    // await client.connect();
    console.log("Connected to DB");
  } catch (error) {
    console.error("Failed to connect to DB", error);
    throw error;
  }
};

export const query = async <TResult = any>(sql: string, params?: any[], log = process.env.LOG): Promise<QueryResult<TResult> | undefined> => {
  if (client) {
    try {
      if (log) {
        console.log(sql, JSON.stringify(params));
      }
      return await client.query<TResult>(sql, params);
    } catch (error) {
      console.error("Query failed", error);
      throw new Error("Database Error");
    }
  }
  console.log("Not connected to DB");
  return undefined;
};

const disconnect = async (): Promise<void> => {
  if (client) {
    console.log("Disconnecting from DB");
    try {
      await client.end();
      console.log("Disconnected from DB");
    } catch (error) {
      console.error("Failed to disconnect from DB", error);
      throw error;
    }
  } else {
    console.log("Not connected to DB");
  }
};

export default { connect, disconnect };