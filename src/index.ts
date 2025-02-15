import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/connectionDb";

const app = express();
const port = 3000;

dotenv.config();

connectDb();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
