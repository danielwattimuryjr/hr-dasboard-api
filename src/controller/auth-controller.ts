import { Request, Response } from "express";
import { asyncHandler } from "../helper/async-helper";
import { query } from "../libs/pg";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse, Login, SuccessResponse } from "../types";
import jwt from "jsonwebtoken"
import AuthService from "../services/auth-service";

type LoginRequest = Request<{}, any, Login>
type LoginResponse<TData> = Response<SuccessResponse<TData> | ErrorResponse>


export const login = asyncHandler(async (req: LoginRequest, res: LoginResponse<any>) => {
  const result = await AuthService.LOGIN(req.body)

  if (result?.rowCount < 1) {
    const errorResponse: ErrorResponse = {
      status: StatusCodes.NOT_FOUND,
      message: "User with email or password specified, are not found"
    }
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse)
  }

  const user = result?.rows.at(0);

  const token = jwt.sign({ user }, 'test', { expiresIn: '1h' })

  res
    // .cookie("access_token", `${token}`, {
    //   httpOnly: true,
    //   secure: false
    // })
    .status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      message: "Login Successfull",
      data: { ...user, token },
    });
})

export const logout = (req: LoginRequest, res: LoginResponse<undefined>) => {
  return res
    .clearCookie("access_token")
    .status(StatusCodes.OK)
    .json({
      status: StatusCodes.OK,
      success: true,
      message: "Logout Successfull",
    });
};