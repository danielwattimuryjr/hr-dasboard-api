import { Request, Response } from "express";
import { asyncHandler } from "../helper/async-helper";
import { SuccessResponse } from "../types";
import { query } from "../libs/pg";
import { StatusCodes } from "http-status-codes";

type AbsenceItem = {
  user_id?: number;
  name?: string;
  absences: {
    date: Date;
    status: 'WFH' | 'AL' | 'SL';
  }[]
}

type AbsenceResponse<T> = Response<SuccessResponse<T>>

// @desc  Get all absence for all user
// @route GET /api/absences
export const getAbsenceData = asyncHandler(async (req: Request, res: AbsenceResponse<AbsenceItem[]>) => {
  const fetchAbsenceResult = await query<AbsenceItem>(
    `SELECT
        u.id AS user_id,
        u.full_name AS name,
        ARRAY_AGG(
            JSON_BUILD_OBJECT(
                'date', a.date,
                'type', a.type
            )
        ) AS absences
    FROM absences a
    JOIN users u ON a.user_id = u.id
    GROUP BY u.id, u.full_name
    ORDER BY u.id;
    `
  );

  res.json({
    status: StatusCodes.OK,
    success: true,
    data: fetchAbsenceResult?.rows || []
  })
});

// @desc  Add new absence data
// @route POST /api/absences
export const createNewAbsence = asyncHandler(async (req: Request, res: AbsenceResponse<AbsenceItem>) => {
  const { user_id, date, type } = req.body

  const saveAbsenceResult = await query(
    `INSERT INTO absences (user_id, date, type) VALUES ($1, $2, $3) RETURNING *`,
    [Number(user_id), date, type]
  );

  res.json({
    status: StatusCodes.CREATED,
    success: true,
    message: "Absence data has been created successfully",
    data: saveAbsenceResult?.rows.at(0)
  })
})