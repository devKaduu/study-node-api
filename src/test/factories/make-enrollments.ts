import { db } from "../../database/client.ts";
import { enrollments } from "../../database/schema.ts";

export const makeEnrollment = async (courseId: string, userId: string) => {
  const result = await db
    .insert(enrollments)
    .values({
      courseId: courseId,
      userId: userId,
    })
    .returning();

  return result[0];
};
