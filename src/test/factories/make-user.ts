import { faker } from "@faker-js/faker";
import { hash } from "argon2";
import { randomUUID } from "crypto";
import { db } from "../../database/client.ts";
import { users } from "../../database/schema.ts";

export const makeUser = async () => {
  const passwordBeforeHash = randomUUID();

  const result = await db
    .insert(users)
    .values({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: await hash(passwordBeforeHash),
      role: "student",
    })
    .returning();

  return {
    user: result[0],
    password: passwordBeforeHash,
  };
};
