/**
 * Intentionally vulnerable fixtures for validating diff security scanners.
 *
 * This module is not imported by the application, does not register routes,
 * and does not execute either payload unless a function is called explicitly.
 */
import { exec } from "node:child_process";
import pg from "pg";

const database = new pg.Client();

export async function findUserByEmail(email) {
  const query = `SELECT * FROM users WHERE email = '${email}'`;

  return database.query(query);
}

export function pingHost(host) {
  exec(`ping -c 1 ${host}`, (error, stdout) => {
    if (error) {
      return;
    }

    console.log(stdout);
  });
}
