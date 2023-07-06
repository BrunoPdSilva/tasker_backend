import { Request, Response, NextFunction } from "express";

export function getTaskFilter(req: Request, res: Response, next: NextFunction) {
  const category = req.query.category?.toString();
  const status = req.query.status?.toString();

  console.log(category);

  if (category && status) {
    req.body.filter = {
      where: {
        categories: { has: category },
        status: { contains: status, mode: "insensitive" },
      },
    };
    next();
    return;
  }

  if (category) {
    req.body.filter = {
      where: { categories: { has: category } },
    };
  }

  if (status) {
    req.body.filter = {
      where: { status: { contains: status, mode: "insensitive" } },
    };
  }

  next();
  return;
}
