import { Router } from "express";
import * as c from "./auth.controller";
export const authRoutes = Router();
authRoutes.post("/register", c.register);
authRoutes.post("/login", c.login);
