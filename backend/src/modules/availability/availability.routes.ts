import { Router } from "express";
import { slots } from "./availability.controller";
export const availabilityRoutes = Router();
availabilityRoutes.get("/:id/slots", slots);
