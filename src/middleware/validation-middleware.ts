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

const absenceValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id, date, type } = req.body
  const today = new Date()
  const requestDate = new Date(date)

  const checkQueryResult = await query<{ count: number }>(
    `
    SELECT 
      count(*)
    FROM absences 
    WHERE user_id=$1
    AND date >= date_trunc('day', $2::timestamp) 
    AND date < date_trunc('day', $2::timestamp) + interval '1 day' 
    AND type=$3`,
    [user_id, date, type]
  )

  if (checkQueryResult?.rows.at(0)?.count > 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      message: `Duplicated entry! User with ID ${user_id} already have ${type} at ${date}.`
    })
  }

  const checkLeavesResult = await query<{ count: number }>(
    `
      SELECT 
        count(*)
      FROM absences
      WHERE user_id=$1
      AND date >= date_trunc('year', current_timestamp)
      AND date < date_trunc('year', current_timestamp) + interval '1 year'
      AND type='AL'
      OR type='SL'
    `,
    [user_id]
  )

  if (checkLeavesResult?.rows.at(0)?.count >= 12) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      message: `The user with ID ${user_id} AL and SL have reach the limit (12)`
    })
  }

  if (requestDate < today) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      message: `The date is in the past.`
    })
  }

  const dayOfWeek = requestDate.getDay();
  if ((dayOfWeek === 6) || (dayOfWeek === 0)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      message: `You cannot take leaves at weekend`
    })
  }

  next();
}

export {
  validateData,
  absenceValidation
}