import { fastifySwagger } from "@fastify/swagger";
import fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

import scalarAPIReference from "@scalar/fastify-api-reference";
import { createCourseRoute } from "./routes/create-course.ts";
import { getCourseByIdRoute } from "./routes/get-courses-by-id.ts";
import { getCoursesRoute } from "./routes/get-courses.ts";

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
        colorize: true,
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>();

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Desafio Node Js",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

server.register(scalarAPIReference, {
  routePrefix: "/docs",
  configuration: {
    theme: "fastify",
  },
});

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(getCoursesRoute);
server.register(getCourseByIdRoute);
server.register(createCourseRoute);

// Run the server!
server.listen({ port: 3000 }).then(() => {
  console.log("Server is running at http://localhost:3000");
});
