import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .email("Enter a valid email address.")
  .max(254, "Email address is too long.");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(128, "Password must be 128 characters or fewer.");

export const roleSchema = z.enum(["CUSTOMER", "ADMIN"]);

export const numericIdSchema = z.coerce.number().int().positive("Choose a valid item.");

export const serviceNameSchema = z
  .string()
  .trim()
  .min(2, "Service name must be at least 2 characters.")
  .max(100, "Service name must be 100 characters or fewer.");

export const serviceDurationSchema = z.coerce
  .number({ invalid_type_error: "Enter a duration in minutes." })
  .int("Duration must be a whole number.")
  .min(1, "Duration must be at least 1 minute.")
  .max(1440, "Duration cannot exceed 24 hours.");

export const calendarDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a valid date.")
  .refine((value) => {
    const date = new Date(`${value}T00:00:00.000Z`);
    return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
  }, "Choose a valid date.");

export const isoDateTimeSchema = z.string().datetime({ offset: true });
