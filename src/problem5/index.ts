import express, { type Express, type Request, type Response } from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

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

// POST endpoint to create a new user
app.post("/user", express.json(), async (req: Request, res: Response) => {
  const { email, password, full_name, role } = req.body;
  try {
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);
    const id = uuidv4();
    const created_at = new Date();

    const result = await pool.query(
      `INSERT INTO users (id, email, password_hash, full_name, role, created_at)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
      [id, email, password_hash, full_name, role, created_at]
    );

    res.json({
      message: "User created successfully!",
      user: result.rows[0],
    });
  } catch (err) {
    console.error("Error creating user", err);
    res.status(500).send("Error creating user");
  }
});

// GET endpoint to retrieve user details by ID
app.get("/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT id, email, full_name, role, created_at FROM users WHERE id = $1`,
      [id]
    );
    if (result.rowCount === 0) {
      res.status(404).send("User not found");
      return;
    }
    res.json({
      message: "User retrieved successfully!",
      user: result.rows[0],
    });
  } catch (err) {
    console.error("Error retrieving user", err);
    res.status(500).send("Error retrieving user");
  }
});

// GET endpoint to retrieve all users
app.get("/users", async (req: Request, res: Response) => {
  const { role } = req.query;
  try {
    const query = role
      ? `SELECT id, email, full_name, role, created_at FROM users WHERE role = $1`
      : `SELECT id, email, full_name, role, created_at FROM users`;
    const values = role ? [role] : [];
    const result = await pool.query(query, values);
    res.json({
      message: role
        ? `Users with role ${role} retrieved successfully!`
        : "Users retrieved successfully!",
      users: result.rows,
    });
  } catch (err) {
    console.error("Error retrieving users", err);
    res.status(500).send("Error retrieving users");
  }
});

// PATCH endpoint to update specified fields only
app.patch("/user/:id", express.json(), async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users SET email = $1 WHERE id = $2 RETURNING *`,
      [email, id]
    );
    if (result.rowCount === 0) {
      res.status(404).send("User not found");
      return;
    }
    res.json({
      message: "User updated successfully!",
      user: result.rows[0],
    });
  } catch (err) {
    console.error("Error updating user", err);
    res.status(500).send("Error updating user");
  }
});

// PUT endpoint to replace the entire user record
app.put("/user/:id", express.json(), async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, password, full_name, role } = req.body;
  try {
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);
    const result = await pool.query(
      `UPDATE users SET email = $1, password_hash = $2, full_name = $3, role = $4 WHERE id = $5 RETURNING *`,
      [email, password_hash, full_name, role, id]
    );
    if (result.rowCount === 0) {
      res.status(404).send("User not found");
      return;
    }
    res.json({
      message: "User replaced successfully!",
      user: result.rows[0],
    });
  } catch (err) {
    console.error("Error replacing user", err);
    res.status(500).send("Error replacing user");
  }
});

app.delete("/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM users WHERE id = $1 RETURNING *`,
      [id]
    );
    if (result.rowCount === 0) {
      res.status(404).send("User not found");
      return;
    }
    res.json({
      message: "User deleted successfully!",
      user: result.rows[0],
    });
  } catch (err) {
    console.error("Error deleting user", err);
    res.status(500).send("Error deleting user");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
