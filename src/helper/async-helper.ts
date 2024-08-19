import { NextFunction, Request, Response } from "express";

type AsyncHandlerFunction = (req: Request, res: Response) => Promise<any>;

export const asyncHandler = (asyncFnc: AsyncHandlerFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(asyncFnc(req, res)).catch(next);
  };
};
