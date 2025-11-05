//$argon2id$v=19$m=65536,t=3,p=4$NeffYpM3uTMvLvJk+SXtrA$S8kzW+vrdKYDc0pAo9ITDpPiRnzMr9WPoeLEshv07x0
//alice.johnson@example.com
import { eq } from "drizzle-orm";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../database/client.ts";
import { users } from "../database/schema.ts";

import { verify } from "argon2";

export const loginRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/sessions",
    {
      schema: {
        tags: ["auth"],
        summary: "Login",
        body: z.object({
          email: z.email(),
          password: z.string(),
        }),
        // response: {
        //   201: z.object({ courseId: z.uuid() }).describe("Success Create"),
        // },
      },
    },
    async (request, response) => {
      const { email, password } = request.body;

      const result = await db.select().from(users).where(eq(users.email, email));

      if (result.length === 0) {
        return response.status(400).send({ message: "Credenciais inválidas" });
      }

      const user = result[0];

      const doesPasswordMatch = await verify(user.password, password);

      if (!doesPasswordMatch) {
        return response.status(400).send({ message: "Credenciais inválidas" });
      }

      return response.status(200).send({ message: "ok" });
    }
  );
};
