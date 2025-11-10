import type { FastifyRequest } from "fastify";

export function getAuthenticatedUserFromRequest(request: FastifyRequest) {
  if (!request.user) {
    throw new Error("Invalid authenticated ");
  }

  return request.user;
}
