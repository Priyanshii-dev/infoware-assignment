import { z } from "zod";
import { emailSchema, passwordSchema, roleSchema } from "@/lib/validation/common.schema";

export const credentialsSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const loginCredentialsSchema = z.object({
  email: emailSchema,
  password: z.string().min(1),
});

export type CredentialsInput = z.infer<typeof credentialsSchema>;

export const sessionSchema = z.object({
  token: z.string().min(1, "Session token is required."),
  role: roleSchema,
});
