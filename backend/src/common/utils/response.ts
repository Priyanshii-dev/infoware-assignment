import type { Response } from "express";
export interface ApiBody<T> {
  code: number;
  message: string;
  success: boolean;
  data: T | null;
}
export const send = <T>(
  res: Response,
  code: number,
  message: string,
  data: T | null = null,
): Response<ApiBody<T>> => res.status(code).json({ code, message, success: code < 400, data });
export class AppError extends Error {
  constructor(
    public code: number,
    message: string,
    public data: unknown = null,
  ) {
    super(message);
  }
}
