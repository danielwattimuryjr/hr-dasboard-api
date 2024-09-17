import { Request, Response } from "express";
import { asyncHandler } from "../helper/async-helper";
import { Employee, ErrorResponse, SuccessResponse } from "../types";
import EmployeeService from "../services/employee-service";

type ProfileRequest = Request<any, Employee, Employee>
type ProfileResponse<TData> = Response<SuccessResponse<TData> | ErrorResponse>

class ProfileController {
  static GET = asyncHandler(async (req: ProfileRequest, res: ProfileResponse<Employee>) => {
    const user_id = req.user?.id
    if (!user_id) {
      return res.status(400).json({
        status: 400,
        message: `User id is not specified`
      } as ErrorResponse)
    }

    const result = await EmployeeService.GET({
      'id': user_id
    })

    res.status(200).json({
      status: 200,
      success: true,
      data: result?.rows.at(0)
    })
  })

  static UPDATE = asyncHandler(async (req: ProfileRequest, res: ProfileResponse<Employee>) => {
    const user_id = req.user?.id
    if (!user_id) {
      return res.status(400).json({
        status: 400,
        message: `User id is not specified`
      } as ErrorResponse)
    }

    const result = await EmployeeService.UPDATE(req.body)

    res.status(200).json({
      status: 200,
      success: true,
      message: `Profile has been succefully updated`,
      data: result
    })
  })
}

export default ProfileController