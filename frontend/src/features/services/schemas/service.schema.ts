import { z } from "zod";
import {
  serviceDurationSchema,
  serviceNameSchema,
  numericIdSchema,
} from "@/lib/validation/common.schema";

export const serviceFormSchema = z.object({
  name: serviceNameSchema,
  durationMin: serviceDurationSchema,
});

export type ServiceFormInput = z.infer<typeof serviceFormSchema>;
export type ServiceFormValues = z.input<typeof serviceFormSchema>;

export const setServiceActiveSchema = z.object({
  id: numericIdSchema,
  isActive: z.boolean(),
});
