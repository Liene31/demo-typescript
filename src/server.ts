import express from "express";
import { petRouter } from "./routes/pets.routes";
import type { Express, Request, Response, NextFunction } from "express";
import cors from "cors";

const PORT = 8000;

const app: Express = express();

app.use(cors());

app.use("/api", petRouter);

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
