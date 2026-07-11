import express, { request, response } from "express";

const PORT = 8000;

const app = express();

app.get("/", (req, res) => {
  res.status(200).send({});
});

app.listen(PORT, (): void => {
  console.log(`Server listens of port ${PORT}`);
});
