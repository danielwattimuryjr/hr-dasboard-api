import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;

  if (!token) {
    throw new Error("No token provided")
  }

  try {
    const decoded = jwt.verify(token, 'test');
    req.user = decoded.user;
    next();
  } catch (error) {
    throw new Error("Invalid token")
  }
};