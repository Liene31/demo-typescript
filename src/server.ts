import express from "express";
import type { Express, Request, Response, NextFunction } from "express";
import type { Pet } from "./data/pets";
import cors from "cors";

import { pets } from "./data/pets";

const PORT = 8000;

const app: Express = express();

app.use(cors());

app.get("/", (req: Request, res: Response<Pet[]>): void => {
  const query = req.query;

  console.log(query.species);

  // const filteredPets = pets.filter((pet) => {
  //   return pet.species.toLowerCase() === query.species.toLowerCase();
  // });

  res.status(200).json(pets);
});

app.get(
  "/pets/:id",
  (
    req: Request<{ id: string }>,
    res: Response<Pet | { statusCode: number; message: string }>,
  ): void => {
    const id = req.params.id;

    const pet: Pet | undefined = pets.find(
      (pet: Pet): boolean => pet.id.toString() === id,
    );
    if (!pet) {
      res.status(404).json({ statusCode: 404, message: "Pet not found" });
    }

    res.status(200).json(pet);
  },
);

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
