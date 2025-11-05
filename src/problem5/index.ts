import express, { type Express, type Request, type Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3063;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
