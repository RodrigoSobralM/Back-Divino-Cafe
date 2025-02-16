import express, { Request, Response } from "express";
import { UserRouter } from "./routes/User.routes";

const app = express();
const port = 3000;

app.use(express.json())

app.use('/api', UserRouter)

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
