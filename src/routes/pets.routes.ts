import express from "express";
import type { Router, Request, Response } from "express";

import type { Pet } from "../data/pets";

import { pets } from "../data/pets";

export const petRouter: Router = express.Router();

type PetQueryParams = {
  species?: string;
  adopted?: "true" | "false";
  minAge?: string;
  maxAge?: string;
};

petRouter.get(
  "/",
  (
    req: Request<{}, unknown, {}, PetQueryParams>,
    res: Response<Pet[]>,
  ): void => {
    const { species, adopted, minAge, maxAge } = req.query;

    let filteredPets: Pet[] = pets;

    //filter always return array even when empty (not undefined like find)
    if (species) {
      filteredPets = filteredPets.filter((pet: Pet): Boolean => {
        return pet.species.toLowerCase() === species.toLowerCase();
      });
    }

    if (adopted) {
      filteredPets = filteredPets.filter((pet: Pet): Boolean => {
        return pet.adopted === JSON.parse(adopted);
      });
    }

    if (minAge) {
      filteredPets = filteredPets.filter((pet: Pet): Boolean => {
        return pet.age >= Number(minAge);
      });
    }

    if (maxAge) {
      filteredPets = filteredPets.filter((pet: Pet): Boolean => {
        return pet.age <= Number(maxAge);
      });
    }

    res.status(200).json(filteredPets);
  },
);

petRouter.get(
  "/pets/:id",
  (
    req: Request<{ id: string }>,
    res: Response<Pet | { statusCode: number; message: string }>,
  ): void => {
    const id = req.params.id;

    //find returns undefined when empty
    const pet: Pet | undefined = pets.find(
      (pet: Pet): boolean => pet.id.toString() === id,
    );
    if (!pet) {
      res.status(404).json({ statusCode: 404, message: "Pet not found" });
    }

    res.status(200).json(pet);
  },
);
