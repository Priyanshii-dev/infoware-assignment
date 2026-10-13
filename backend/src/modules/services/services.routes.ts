import { Router } from "express";
import { requireAdmin } from "../../common/middleware/auth";
import * as c from "./services.controller";
export const servicesRoutes = Router();
servicesRoutes.get("/", c.listActive);
servicesRoutes.get("/all", requireAdmin, c.listAll);
servicesRoutes.post("/", requireAdmin, c.create);
servicesRoutes.patch("/:id", requireAdmin, c.update);
servicesRoutes.put("/:id/hours", requireAdmin, c.saveHours);
