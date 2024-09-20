import { NextFunction, Request, Response } from "express";
import { EmployeeLevel, ErrorResponse } from "../types";

export const verifyRole = (allowedLevels: EmployeeLevel[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user) {
      return res.status(400).json({
        status: 400,
        message: `No user logged in yet.`
      } as ErrorResponse)
    }

    // Check if the user's role is in the allowedLevels array
    const allowed = allowedLevels.includes(user.level);

    if (!allowed) {
      return res.status(403).json({
        status: 403,
        message: `This route is protected`
      } as ErrorResponse)
    }

    next();
  }
}