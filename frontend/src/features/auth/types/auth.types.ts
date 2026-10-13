import { z } from "zod";
import { roleSchema } from "@/lib/validation/common.schema";
import { sessionSchema } from "../schemas/auth.schema";

export type Role = z.infer<typeof roleSchema>;
export type Session = z.infer<typeof sessionSchema>;
