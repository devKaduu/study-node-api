import { db } from "./client.ts";
import { courses, enrollments, users } from "./schema.ts";

async function seed() {
  const usersInsert = await db
    .insert(users)
    .values([
      {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
      },
      {
        name: "Bob Smith",
        email: "bob.smith@example.com",
      },
      {
        name: "Charlie Brown",
        email: "charlie.brown@example.com",
      },
    ])
    .returning();

  const coursesInsert = await db
    .insert(courses)
    .values([
      {
        title: "Introdução ao TypeScript",
        description: "Aprenda os conceitos básicos do TypeScript.",
      },
      {
        title: "JavaScript Avançado",
        description: "Aprofunde seus conhecimentos em JavaScript.",
      },
    ])
    .returning();

  await db.insert(enrollments).values([
    {
      courseId: coursesInsert[0].id,
      userId: usersInsert[0].id,
    },
    {
      courseId: coursesInsert[0].id,
      userId: usersInsert[1].id,
    },
    {
      courseId: coursesInsert[1].id,
      userId: usersInsert[2].id,
    },
  ]);
}

seed();
