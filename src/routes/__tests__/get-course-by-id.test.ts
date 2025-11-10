import request from "supertest";
import { expect, test } from "vitest";
import { server } from "../../app.ts";
import { makeCourse } from "../../test/factories/make-course.ts";
import { makeAuthenticatedUser } from "../../test/factories/make-user.ts";

test("Get a course by Id", async () => {
  await server.ready();

  const { token } = await makeAuthenticatedUser("student");
  const course = await makeCourse();

  const response = await request(server.server)
    .get(`/courses/${course.id}`)
    .set("Authorization", token);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    course: {
      id: expect.any(String),
      title: expect.any(String),
      description: null,
    },
  });
});

test("Return 404 for non existing course", async () => {
  await server.ready();

  const { token } = await makeAuthenticatedUser("student");

  const response = await request(server.server)
    .get(`/courses/33d2a97d-0e8f-4005-9f4c-40d40669d195`)
    .set("Authorization", token);

  expect(response.status).toEqual(404);
});
