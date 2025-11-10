import request from "supertest";
import { expect, test } from "vitest";
import { server } from "../../app.ts";

import { faker } from "@faker-js/faker";
import { makeAuthenticatedUser } from "../../test/factories/make-user.ts";

test("Create Course Success", async () => {
  await server.ready();

  const { token } = await makeAuthenticatedUser("manager");

  const response = await request(server.server)
    .post("/courses")
    .set("Content-Type", "application/json")
    .set("Authorization", token)
    .send({
      title: faker.vehicle.vehicle(),
      description: faker.vehicle.type(),
    });

  expect(response.status).toEqual(201);
  expect(response.body).toEqual({
    courseId: expect.any(String),
  });
});
