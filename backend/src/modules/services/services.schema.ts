import { z } from "zod";
export const updateServiceSchema = z
  .object({
    name: z.string().min(1),
    durationMin: z.number().int().positive(),
    isActive: z.boolean(),
  })
  .partial();
export const createServiceSchema = z
  .object({
    name: z.string().min(1),
    durationMin: z.number().int().positive(),
    openMin: z.number().int().min(0).max(1439).default(540),
    closeMin: z.number().int().min(1).max(1440).default(1020),
  })
  .refine((v) => v.openMin < v.closeMin, "openMin must be before closeMin");
export const hoursSchema = z
  .object({
    weekday: z.number().int().min(0).max(6),
    openMin: z.number().int().min(0).max(1439),
    closeMin: z.number().int().min(1).max(1440),
  })
  .refine((v) => v.openMin < v.closeMin, "openMin must be before closeMin");
