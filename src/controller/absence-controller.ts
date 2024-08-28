import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../helper/async-helper";
import { ErrorResponse, SuccessResponse } from "../types";
import { query } from "../libs/pg";
import { StatusCodes } from "http-status-codes";
import { boolean } from "zod";

type AbsenceItem = {
  user_id?: number;
  name?: string;
  absences: {
    date: Date;
    type: 'WFH' | 'AL' | 'SL';
  }[]
}

type AbsenceRequest = Request<{}, any, {
  user_id: number;
  date: Date;
  type: 'WFH' | 'AL' | 'SL';
}>
type AbsenceResponse<TData> = Response<SuccessResponse<TData> | ErrorResponse>

// @desc  Get all absence for all user
// @route GET /api/absences
const getAbsenceData = asyncHandler(async (req: AbsenceRequest, res: AbsenceResponse<AbsenceItem[]>) => {
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

  res.status(200).json({
    status: StatusCodes.OK,
    success: true,
    data: fetchAbsenceResult?.rows || []
  })
});

// @desc  Add new absence data
// @route POST /api/absences
const createNewAbsence = asyncHandler(async (req: AbsenceRequest, res: AbsenceResponse<AbsenceItem>) => {
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

// @desc  Approve an absence data
// @route PUT /api/absences/:absence_id
const approveAbsenceData = asyncHandler(async (req: Request<{ absence_id: number }, any, { isApproved: boolean }>, res: AbsenceResponse<any>) => {
  const absence_id = Number(req.params.absence_id)
  const isApproved = req.body.isApproved

  const updateAbsenceResult = await query<{
    id: number;
    user_id: number;
    date: Date;
    type: 'WFH' | 'AL' | 'SL';
    isApproved: boolean
  }>(
    `
    UPDATE 
      absences 
    SET is_approved=$1 
    WHERE id=$2
    RETURNING *
    `,
    [isApproved, absence_id]
  )

  res.json({
    status: StatusCodes.OK,
    success: true,
    message: `Absence data has been ${isApproved ? 'approved' : 'disapproved'}`,
    data: updateAbsenceResult?.rows.at(0)
  })
})

const deleteAbsence = asyncHandler(async (req: Request, res: Response) => {
  const absence_id = Number(req.params.absence_id);

  await query(
    `DELETE FROM absences WHERE id=$1`,
    [absence_id]
  )

  res.json({
    status: StatusCodes.OK,
    success: true,
    message: `The absence has been deleted/canceled`,
  })
})

export {
  getAbsenceData,
  createNewAbsence,
  approveAbsenceData,
  deleteAbsence,
} 