import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

import { StatusCodes } from 'http-status-codes';
import { ErrorResponse } from '../types';
import { query } from '../libs/pg';

const validateData = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.reduce((acc: any, issue: any) => {
          acc[issue.path.join('.')] = issue.message;
          return acc;
        }, {});

        const errorResponse: ErrorResponse = {
          status: StatusCodes.BAD_REQUEST,
          message: errorMessages
        }

        res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
      }
    }
  };
}

export {
  validateData,
}