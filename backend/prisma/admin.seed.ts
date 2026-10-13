/// <reference types="node" />

import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { loginCredentialsSchema } from "../src/modules/auth/auth.schema";

const prisma = new PrismaClient();
const ADMIN_EMAIL = "p@gmail.com";

function askPassword(): Promise<string> {
  if (!process.stdin.isTTY || typeof process.stdin.setRawMode !== "function") {
    throw new Error(
      "Run this seed command in an interactive terminal to enter the admin password safely.",
    );
  }

  return new Promise((resolve, reject) => {
    const wasRaw = process.stdin.isRaw;
    let password = "";
    process.stdout.write("Admin password (input hidden): ");
    process.stdin.setRawMode(true);
    process.stdin.setEncoding("utf8");
    process.stdin.resume();

    const cleanup = () => {
      process.stdin.removeListener("data", onData);
      process.stdin.setRawMode(wasRaw ?? false);
      process.stdin.pause();
      process.stdout.write("\n");
    };
    const onData = (input: string) => {
      for (const character of input) {
        if (character === "\u0003") {
          cleanup();
          reject(new Error("Admin seed cancelled."));
          return;
        }
        if (character === "\r" || character === "\n") {
          cleanup();
          resolve(password);
          return;
        }
        if (character === "\u007f" || character === "\b") {
          if (password.length) {
            password = password.slice(0, -1);
            process.stdout.write("\b \b");
          }
          continue;
        }
        if (character >= " ") {
          password += character;
          process.stdout.write("*");
        }
      }
    };

    process.stdin.on("data", onData);
  });
}

async function seedAdmin() {
  const credentials = loginCredentialsSchema.parse({
    email: ADMIN_EMAIL,
    password: process.env.ADMIN_SEED_PASSWORD ?? (await askPassword()),
  });
  const passwordHash = await bcrypt.hash(credentials.password, 12);

  await prisma.user.upsert({
    where: { email: credentials.email },
    create: { email: credentials.email, passwordHash, role: "ADMIN" },
    update: { passwordHash, role: "ADMIN" },
  });

  console.log(`Admin account seeded for ${credentials.email}.`);
}

void seedAdmin()
  .catch((error: unknown) => {
    console.error("Failed to seed admin account:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
