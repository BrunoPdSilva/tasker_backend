import { Request, Response, NextFunction } from "express";

export function convertDates(req: Request, res: Response, next: NextFunction) {
  if (req.body.deadline) {
    req.body.deadline = new Date(req.body.deadline);
  }

  next();
}
