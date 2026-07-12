import express from "express";
import type { Express, Request, Response } from "express";
import { pets } from "./data/pets";

const PORT = 8000;

const app: Express = express();

app.get("/", (req: Request, res: Response): void => {
  res.status(200).json(pets);
});

app.listen(PORT, (): void => {
  console.log(`Server listens of port ${PORT}`);
});
