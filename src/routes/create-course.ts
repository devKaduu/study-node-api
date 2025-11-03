import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/courses",
    {
      schema: {
        tags: ["courses"],
        summary: "Create a course",
        body: z.object({
          title: z.string().min(5, "Titulo precisa ter 5 caracteres"),
          description: z.string().min(5, "Titulo precisa ter 5 caracteres").optional().nullable(),
        }),
        response: {
          201: z.object({ courseId: z.uuid() }).describe("Sucess create"),
        },
      },
    },
    async (request, response) => {
      const body = request.body;
      const courseTitle = body.title;
      const courseDescription = body.description;

      const result = await db
        .insert(courses)
        .values({
          title: courseTitle,
          description: courseDescription,
        })
        .returning();

      return response.status(201).send({ courseId: result[0].id });
    }
  );
};
