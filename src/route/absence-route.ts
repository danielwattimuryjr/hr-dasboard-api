import express, { Request, Response } from "express"
import { validateData } from "../middleware/validation-middleware";
import { absenceApprovalSchema, absenceSchema } from "../schema/absence-schema";
import { asyncHandler } from "../helper/async-helper";
import { query } from "../libs/pg";
import { Absence, SuccessResponse } from "../types";
import AbsenceController from "../controller/absences";
const route = express.Router();

route.get("/", AbsenceController.GET)
route.get("/history", AbsenceController.SHOW)
route.post("/", validateData(absenceSchema), AbsenceController.POST)
route.put('/', validateData(absenceApprovalSchema), AbsenceController.UPDATE)
route.delete('/:absence_id', AbsenceController.DELETE)
route.get('/get-analytics', AbsenceController.TEST_DATA)
route.get('/get-pending', asyncHandler(async (req: Request, res: Response) => {
  const result = await query(`
  SELECT
    a.id,
    u.name,
    a.type,
    a.date
  FROM 
    absences a
  JOIN public."users" u ON a.user_id=u.id
  WHERE
    is_approved IS NULL
  
  `)

  res.status(200).json({
    status: 200,
    success: true,
    data: result?.rows
  } as SuccessResponse<Absence>)
}))

export default route;
