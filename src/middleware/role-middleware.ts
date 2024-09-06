import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../types";

export const verifyRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
      return res.json({
        status: 400,
        message: `No user logged in yet.`
      } as ErrorResponse)
    }

    if (!(user.role == role)) {
      return res.json({
        status: 403,
        message: `This route is protected`
      } as ErrorResponse)
    }

    next();
  }
}