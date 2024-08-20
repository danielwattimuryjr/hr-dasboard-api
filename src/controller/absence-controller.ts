import { Request, Response } from "express";
import { asyncHandler } from "../helper/async-helper";
import { SuccessResponse } from "../types";
import { query } from "../libs/pg";

type AbsenceItem = {
  user_id?: number;
  name?: string;
  date: Date;
  status: 'WFH' | 'AL' | 'SL';
}

type AbsenceResponse = Response<SuccessResponse<AbsenceItem[]>>

// @desc  Get all absence for all user
// @route GET /api/absences
export const getAbsenceData = asyncHandler(async (req: Request, res: AbsenceResponse) => {
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
    status: 200,
    success: true,
    data: fetchAbsenceResult?.rows || []
  })
});
