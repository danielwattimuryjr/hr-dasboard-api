import { Request, Response } from "express";
import { asyncHandler } from "../helper/async-helper";
import ProfileService from "../services/profile-service";
import { Employee, ErrorResponse, SuccessResponse } from "../types";

type ProfileResponse<TData> = Response<SuccessResponse<TData> | ErrorResponse>
const getProfile = asyncHandler(async (req: Request, res: ProfileResponse<Employee>) => {
  const user_id = req.user?.id

  if (!user_id) {
    return res.status(400).json({
      status: 400,
      message: `User id is not specified`
    } as ErrorResponse)
  }

  const result = await ProfileService.GET_PROFILE(user_id)

  res.status(200).json({
    status: 200,
    success: true,
    data: result
  })
})

const updateProfile = asyncHandler(async (req: Request, res: ProfileResponse<Employee>) => {
  const user_id = req.user?.id

  if (!user_id) {
    return res.status(400).json({
      status: 400,
      message: `User id is not specified`
    } as ErrorResponse)
  }

  const result = await ProfileService.UPDATE_PROFILE(user_id, req.body)

  res.status(200).json({
    status: 200,
    success: true,
    message: `Profile has been succefully updated`,
    data: result
  })
})

export {
  getProfile,
  updateProfile
}