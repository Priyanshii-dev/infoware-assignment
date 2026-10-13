import { z } from "zod";
import {
  calendarDateSchema,
  isoDateTimeSchema,
  numericIdSchema,
} from "@/lib/validation/common.schema";

export const slotsQuerySchema = z.object({
  serviceId: numericIdSchema,
  date: calendarDateSchema,
});

export const createBookingSchema = z.object({
  serviceId: numericIdSchema,
  startsAt: isoDateTimeSchema,
});

export const bookingIdSchema = numericIdSchema;

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
