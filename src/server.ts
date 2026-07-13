import express from "express";
import type { Express, Request, Response, NextFunction } from "express";
import type { Pet } from "./data/pets";
import cors from "cors";

import { pets } from "./data/pets";

const PORT = 8000;

const app: Express = express();

app.use(cors());

app.get("/", (req: Request, res: Response<Pet[]>): void => {
  res.status(200).json(pets);
});

app.get("/:id", (req: Request<{ id: string }>, res: Response): void => {
  const id = req.params.id;

  const pet = pets.find((pet) => pet.id.toString() === id);

  res.status(200).json(pet);
});

app.use(
  (
    req: Request,
    res: Response<{ message: string }>,
    next: NextFunction,
  ): void => {
    res.status(404).json({ message: "Sorry, can't find that!" });
  },
);

app.listen(PORT, (): void => {
  console.log(`Server listens of port ${PORT}`);
});
