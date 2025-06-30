import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("💥 Uncaught error:", err);

  res.status(500).json({
    error: "Something went wrong on the server.",
    details: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};
