import { z } from "zod";
export const createBookingSchema = z.object({
  serviceId: z.number().int().positive(),
  startsAt: z.string().datetime(),
});
