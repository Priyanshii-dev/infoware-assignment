import type { NextFunction, Request, RequestHandler, Response } from "express";
export const h =
  (fn: (q: Request, r: Response) => Promise<unknown>): RequestHandler =>
  (q, r, n: NextFunction) => {
    fn(q, r).catch(n);
  };
