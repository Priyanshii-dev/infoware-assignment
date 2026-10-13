import { z } from "zod";
import { h } from "../../common/utils/asyncHandler";
import { send } from "../../common/utils/response";
import { createServiceSchema, hoursSchema, updateServiceSchema } from "./services.schema";
import * as service from "./services.service";
const serviceIdSchema = z.coerce.number().int().positive();
export const listActive = h(async (_q, r) => {
  send(r, 200, "Services loaded", await service.listActive());
});
export const listAll = h(async (_q, r) => {
  send(r, 200, "Services loaded", await service.listAll());
});
export const create = h(async (q, r) => {
  send(r, 201, "Service created", await service.create(createServiceSchema.parse(q.body)));
});
export const update = h(async (q, r) => {
  send(
    r,
    200,
    "Service updated",
    await service.update(serviceIdSchema.parse(q.params.id), updateServiceSchema.parse(q.body)),
  );
});
export const saveHours = h(async (q, r) => {
  send(
    r,
    200,
    "Business hours saved",
    await service.saveHours(serviceIdSchema.parse(q.params.id), hoursSchema.parse(q.body)),
  );
});
