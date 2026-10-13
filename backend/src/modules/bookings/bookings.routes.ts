import { Router } from "express";
import { requireAdmin, requireAuth } from "../../common/middleware/auth";
import * as c from "./bookings.controller";
export const bookingsRoutes = Router();
bookingsRoutes.get("/admin/all", requireAdmin, c.listAll);
bookingsRoutes.get("/", requireAuth, c.listMine);
bookingsRoutes.post("/", requireAuth, c.create);
bookingsRoutes.post("/:id/cancel", requireAuth, c.cancel);
