import express from "express";
import { petRouter } from "./routes/pets.routes";
import type { Express, Request, Response } from "express";
import cors from "cors";

export const app: Express = express();

app.use(cors());

app.use("/api", petRouter);

app.use((req: Request, res: Response<{ message: string }>): void => {
  res.status(404).json({ message: "Sorry, can't find that!" });
});
