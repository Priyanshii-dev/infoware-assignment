import { z } from "zod";
import { h } from "../../common/utils/asyncHandler";
import { send } from "../../common/utils/response";
import { getSlots } from "./availability.service";
const query = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  serviceId: z.coerce.number().int().positive(),
});
export const slots = h(async (q, r) => {
  const params = query.parse({ ...q.query, serviceId: q.params.id });
  send(r, 200, "Availability loaded", await getSlots(params.serviceId, params.date));
});
