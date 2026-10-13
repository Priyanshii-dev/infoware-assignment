import { h } from "../../common/utils/asyncHandler";
import { send } from "../../common/utils/response";
import { credentialsSchema, loginCredentialsSchema } from "./auth.schema";
import * as service from "./auth.service";
export const register = h(async (q, r) => {
  const b = credentialsSchema.parse(q.body);
  send(r, 201, "Account created sucessfully", await service.register(b.email, b.password));
});
export const login = h(async (q, r) => {
  const b = loginCredentialsSchema.parse(q.body);
  send(r, 200, "Logged in sucessfully", await service.login(b.email, b.password));
});
