import { Request, Response } from "express";
import { asyncHandler } from "../helper/async-helper";
import { query } from "../libs/pg";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse, SuccessResponse } from "../types";
import jwt from "jsonwebtoken"

type User = {
  id?: number;
  email: string;
  full_name: string;
  username: string;
  role_name: string;
  display_name: string;
}

type LoginRequest = Request<{}, any, {
  email?: string;
  password?: string;
}>
type LoginResponse<TData> = Response<SuccessResponse<TData> | ErrorResponse>


export const login = asyncHandler(async (req: LoginRequest, res: LoginResponse<string>) => {
  const { email, password } = req.body;

  const result = await query<User>(
    `SELECT u.id, u.email, u.full_name, u.username, r.role_name, r.display_name
   FROM public."users" u
   JOIN roles r ON u.role_id = r.id
   WHERE u.email=$1 AND u.password=$2`,
    [email, password]
  )

  if (result?.rowCount || 0 < 1) {
    const errorResponse: ErrorResponse = {
      status: StatusCodes.NOT_FOUND,
      message: "User with email or password specified, are not found"
    }
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse)
  }

  const user = result?.rows.at(0);

  const token = jwt.sign({ user }, 'test', { expiresIn: '1h' })

  res.cookie("access_token", `${token}`, {
    httpOnly: true,
    secure: false
  }).status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    message: "Login Successfull",
    data: token
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