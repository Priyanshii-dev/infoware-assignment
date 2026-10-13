import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { AppError } from "../utils/response";
const authClaimsSchema = z.object({
  id: z.number().int().positive(),
  role: z.enum(["CUSTOMER", "ADMIN"]),
});
export interface AuthUser {
  id: number;
  role: "CUSTOMER" | "ADMIN";
}
export type AuthedRequest = Request & { user: AuthUser };
const secret = (): string => {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error("JWT_SECRET missing");
  return s;
};
export const signToken = (u: AuthUser): string => jwt.sign(u, secret(), { expiresIn: "7d" });
export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.replace(/^Bearer /, "");
  if (!token) {
    next(new AppError(401, "Authentication required"));
    return;
  }
  try {
    const claims = authClaimsSchema.safeParse(jwt.verify(token, secret()));
    if (!claims.success) {
      next(new AppError(401, "Invalid or expired session"));
      return;
    }
    (req as AuthedRequest).user = claims.data;
    next();
  } catch {
    next(new AppError(401, "Invalid or expired session"));
  }
};
export const requireAdmin = (req: Request, res: Response, next: NextFunction): void =>
  requireAuth(req, res, (err?: unknown) => {
    if (err) {
      next(err);
      return;
    }
    if ((req as AuthedRequest).user.role !== "ADMIN") {
      next(new AppError(403, "Administrator access required"));
      return;
    }
    next();
  });
