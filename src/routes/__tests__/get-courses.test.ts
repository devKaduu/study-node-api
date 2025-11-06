import { randomUUID } from "node:crypto";
import request from "supertest";
import { expect, test } from "vitest";
import { server } from "../../app.ts";
import { makeCourse } from "../../test/factories/make-course.ts";
import { makeEnrollment } from "../../test/factories/make-enrollments.ts";
import { makeUser } from "../../test/factories/make-user.ts";

test("Get Courses Search", async () => {
  await server.ready();

  const titleId = randomUUID();

  const course = await makeCourse(titleId);

  const response = await request(server.server).get(`/courses?search=${titleId}`);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    total: 1,
    courses: [
      {
        id: expect.any(String),
        title: course.title,
        description: null,
        enrollments: 0,
      },
    ],
  });
});

test("Get Courses Verify enrollment", async () => {
  await server.ready();

  const titleId = randomUUID();

  const course = await makeCourse(titleId);
  const { user } = await makeUser();

  await makeEnrollment(course.id, user.id);

  const response = await request(server.server).get(`/courses?search=${titleId}`);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    total: 1,
    courses: [
      {
        id: expect.any(String),
        title: course.title,
        description: null,
        enrollments: 1,
      },
    ],
  });
});
