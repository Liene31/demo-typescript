import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../app";

describe("GET /api/pets", () => {
  it("returns 200 and an array of pets", async () => {
    const response = await request(app).get("/api/pets");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
