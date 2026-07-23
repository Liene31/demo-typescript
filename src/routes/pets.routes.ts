import express from "express";
import type { Router } from "express";

import { getPetById, getPets } from "../controllers/pets.controllers";
import { pleaseAuth, validateNumericId } from "../middleware/pets.middleware";

export const petRouter: Router = express.Router();

petRouter.get("/pets", getPets);

petRouter.get("/pets/:id", pleaseAuth, validateNumericId, getPetById);
