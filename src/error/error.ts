import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../types";
import { StatusCodes } from "http-status-codes";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction): any => {
  const response: ErrorResponse = {
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message
  }

  console.log(error);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
};
