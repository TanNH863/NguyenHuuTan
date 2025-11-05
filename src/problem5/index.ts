import express, { type Express, type Request, type Response } from "express";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const poolConfig = connectionString
  ? { connectionString }
  : {
      user: process.env.POSTGRES_USER || "postgres",
      host: process.env.POSTGRES_HOST || "localhost" || "db",
      database: process.env.POSTGRES_DB || "code_challenge",
      password: process.env.POSTGRES_PASSWORD || "postgres",
      port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
    };

const pool = new Pool(poolConfig);

(async () => {
  try {
    const client = await pool.connect();
    console.log("Successfully connected to PostgreSQL database!");
    client.release();
  } catch (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
})();

const app: Express = express();
const port = process.env.PORT || 3063;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server!");
});

app.get("/db-test", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Database query successful!",
      time: result.rows[0].now,
    });
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).send("Error querying database");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
