import { Request, Response } from "express";
import { ErrorResponse } from "../types";
import { StatusCodes } from "http-status-codes";

export const notFoundHandler = (req: Request, res: Response) => {
  const response: ErrorResponse = {
    status: StatusCodes.NOT_FOUND,
    message: `Not found: ${req.originalUrl}`
  }

  res.status(404).json(response);
};
