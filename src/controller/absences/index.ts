import { Request, Response } from "express";
import { Absence, ErrorResponse, SuccessResponse } from "../../types";
import { asyncHandler } from "../../helper/async-helper";
import AbsenceValidation from "./validation";
import AbsenceService from "../../services/absence-service";

type AbsenceRequest = Request<{
  absence_id?: number;
}, any, Absence>
type AbsenceResponse<TData> = Response<SuccessResponse<TData> | ErrorResponse>

class AbsenceController {
  static GET = asyncHandler(async (req: AbsenceRequest, res: AbsenceResponse<{
    user_id: number;
    absences: Absence[]
  }[]>) => {
    const result = await AbsenceService.GET<{
      user_id: number;
      absences: Absence[]
    }>({
      fields: [
        'user_id',
        `ARRAY_AGG(
          JSON_BUILD_OBJECT(
            'id', id,
            'date', date,
            'type', type,
            'isApproved', is_approved,
            'reason', reason
          )
        ) AS absences`
      ],
      groupBy: ['user_id', 'date']
    });

    return res.status(200).json({
      status: 200,
      success: true,
      data: result?.rows
    })
  })

  static SHOW = asyncHandler(async (req: AbsenceRequest, res: AbsenceResponse<Absence[]>) => {
    const userId = Number(req.user?.id)

    const data = await AbsenceValidation.isDataExist<Absence>({
      conditions: {
        'user_id = $1': userId
      }
    })

    if (!data) {
      return res.status(200).json({
        status: 200,
        success: true,
        data: []
      })
    }

    return res.status(200).json({
      status: 200,
      success: true,
      data: data
    })
  })

  static POST = asyncHandler(async (req: AbsenceRequest, res: AbsenceResponse<Absence>) => {
    const { user_id, date, type } = req.body

    const validationError = await AbsenceValidation.validateAbsenceRequest(Number(user_id), date, type)

    if (validationError) {
      return res.status(400).json({
        status: 400,
        message: validationError
      } as ErrorResponse)
    }

    const result = await AbsenceService.STORE(req.body)

    res.status(201).json({
      status: 201,
      success: true,
      message: "Absence data has been created successfully",
      data: result
    })
  })

  static UPDATE = asyncHandler(async (req: AbsenceRequest, res: AbsenceResponse<any>) => {
    const absence = {
      is_approved: Boolean(req.body.is_approved),
      reason: req.body.reason
    }

    const absence_id = Number(req.body.id)

    const data = await AbsenceValidation.isDataExist<Absence>({
      conditions: {
        'id=$1': absence_id
      }
    })

    if (!data) {
      return res.status(404).json({
        status: 404,
        message: `Absence Data not found`
      } as ErrorResponse)
    }

    const result = await AbsenceService.UPDATE_STATUS(absence_id, absence)

    res.status(200).json({
      status: 200,
      success: true,
      message: `Absence data has been updated successfully`,
      data: result
    })
  })

  static DELETE = asyncHandler(async (req: AbsenceRequest, res: AbsenceResponse<undefined>) => {
    const absenceId = Number(req.params.absence_id)

    const isExist = await AbsenceValidation.isDataExist({
      fields: ['id'],
      conditions: {
        'id = $1': absenceId
      }
    })

    if (!isExist) {
      return res.status(404).json({
        status: 404,
        message: `Absence Data not found`
      } as ErrorResponse)
    }

    await AbsenceService.DELETE(absenceId)

    res.status(200).json({
      status: 200,
      success: true,
      message: `Absence has been deleted successfully`
    })
  })
}

export default AbsenceController