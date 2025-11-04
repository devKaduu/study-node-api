import request from "supertest";
import { expect, test } from "vitest";
import { server } from "../../app.ts";

import { faker } from "@faker-js/faker";

test("Create Course Success", async () => {
  await server.ready();

  const response = await request(server.server).post("/courses").set("Content-Type", "application/json").send({
    title: faker.vehicle.vehicle(),
    description: faker.vehicle.type(),
  });

  expect(response.status).toEqual(201);
  expect(response.body).toEqual({
    courseId: expect.any(String),
  });
});
