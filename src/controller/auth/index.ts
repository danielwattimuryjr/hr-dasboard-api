import { Request, Response } from "express"
import { Employee, ErrorResponse, Login, SuccessResponse } from "../../types"
import { asyncHandler } from "../../helper/async-helper"
import AuthService from "../../services/auth-service"
import jwt from "jsonwebtoken"

type LoginRequest = Request<{}, any, Login>
type LoginResponse<TData> = Response<SuccessResponse<TData> | ErrorResponse>

class AuthController {
  static POST = asyncHandler(async (req: LoginRequest, res: LoginResponse<Employee>) => {
    const result = await AuthService.LOGIN(req.body)

    if (result?.rowCount < 1) {
      return res.status(404).json({
        status: 404,
        message: 'User not found'
      } as ErrorResponse)
    }

    const user = result?.rows.at(0);

    const token = jwt.sign({ user }, 'test', { expiresIn: '1d' })

    res.status(200).json({
      status: 200,
      success: true,
      message: "Login Successfull",
      data: { ...user, token },
    });
  })
}

export default AuthController