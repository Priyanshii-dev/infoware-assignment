import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError, send } from "../utils/response";
export const notFound = (_q: Request, res: Response): void => {
  send(res, 404, "Route not found");
};
export const errorHandler = (err: unknown, _q: Request, res: Response, _n: NextFunction): void => {
  if (err instanceof AppError) {
    send(res, err.code, err.message, err.data);
    return;
  }
  if (err instanceof ZodError) {
    send(
      res,
      422,
      "Validation failed",
      err.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
    );
    return;
  }
  console.error(err);
  send(res, 500, "Something went wrong on our side");
};
