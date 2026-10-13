import { api } from "@/lib/api-client";
import {
  credentialsSchema,
  loginCredentialsSchema,
  sessionSchema,
  type CredentialsInput,
} from "../schemas/auth.schema";

async function submitCredentials(path: "/auth/login" | "/auth/register", input: CredentialsInput) {
  const credentials =
    path === "/auth/login" ? loginCredentialsSchema.parse(input) : credentialsSchema.parse(input);
  const response = await api<unknown>(path, { method: "POST", body: credentials });
  return { ...response, data: sessionSchema.parse(response.data) };
}

export const authApi = {
  login: (input: CredentialsInput) => submitCredentials("/auth/login", input),
  register: (input: CredentialsInput) => submitCredentials("/auth/register", input),
};
