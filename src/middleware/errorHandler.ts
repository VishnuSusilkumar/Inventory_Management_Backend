import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../utils/error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof ValidationError) {
    return res.status(400).json({ success: false, error: err.message });
  }

  return res
    .status(500)
    .json({ success: false, error: "Internal server error" });
};
