import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../app";
import { Pet, pets } from "../data/pets";

describe("GET /api/pets", () => {
  it("returns 200 and an array of pets", async () => {
    const response = await request(app).get("/api/pets");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("returns all 15 pets when no filters are applied", async () => {
    const response = await request(app).get("/api/pets");

    expect(response.body.length).toBe(15);
  });

  it("returns only dogs when filtering by ?species=Dog", async () => {
    const response = await request(app).get("/api/pets?species=Dog");

    expect(response.body.every((pet: Pet) => pet.species === "Dog")).toBe(true);
  });

  it("check if source data has the same count of dogs as received in response", async () => {
    const response = await request(app).get("/api/pets?species=Dog");

    //from data source ../data/pets
    const expectedDogCount = pets.filter((pet) => pet.species === "Dog").length;

    //response body returns only Dogs since that's what's in quarry "/api/pets?species=Dog"
    expect(response.body.length).toBe(expectedDogCount);
  });
});
