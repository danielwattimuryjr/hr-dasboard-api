import { Request, Response } from "express";
import { Employee, ErrorResponse, SuccessResponse } from "../../types";
import { asyncHandler } from "../../helper/async-helper";
import EmployeeService from "../../services/employee-service";
import EmployeeValidation from "./validation";

type EmployeeResponse<TData> = Response<SuccessResponse<TData> | ErrorResponse>
type EmployeeRequest = Request<{ user_id?: number }, any, Employee, {
  search?: string;
  limit?: string;
  page?: string;
}>

class EmployeeController {
  static GET = asyncHandler(async (req: EmployeeRequest, res: EmployeeResponse<any>) => {
    const defaultLimit = 10;
    const defaultPage = 1;

    const limit: number = req.query.limit ? parseInt(req.query.limit, 10) : defaultLimit;
    const currentPage: number = req.query.page ? parseInt(req.query.page, 10) : defaultPage;
    const searchStr: string | undefined = req.query.search;

    const result = await EmployeeService.GET_ALL(
      limit,
      currentPage,
      searchStr
    )

    res.status(200).json({
      status: 200,
      success: true,
      data: result
    });
  })

  static SHOW = asyncHandler(async (req: EmployeeRequest, res: EmployeeResponse<Employee>) => {
    const userId = Number(req.params.user_id)

    const result = await EmployeeValidation.isDataExist({
      id: userId
    })

    if (!result) {
      return res.status(404).json({
        status: 404,
        message: `Employee does not exist`
      } as ErrorResponse)
    }

    res.status(200).json({
      status: 200,
      success: true,
      data: result
    });
  })

  static STORE = asyncHandler(async (req: EmployeeRequest, res: EmployeeResponse<Employee>) => {
    const userExist = await EmployeeValidation.isDataExist({
      email: req.body.email
    })

    if (userExist) {
      return res.status(403).json({
        status: 403,
        message: `Email is not available`
      } as ErrorResponse)
    }

    const result = await EmployeeService.STORE(req.body)

    res.status(201).json({
      status: 201,
      success: true,
      message: `Employee has been created successfully`,
      data: result
    });
  })

  static UPDATE = asyncHandler(async (req: EmployeeRequest, res: EmployeeResponse<Employee>) => {
    const userId = Number(req.body.id)
    const isDataExist = await EmployeeValidation.isDataExist({
      id: userId
    })

    if (!isDataExist) {
      return res.status(404).json({
        status: 404,
        message: `Employee does not exist`
      } as ErrorResponse)
    }

    const result = await EmployeeService.UPDATE(req.body)

    res.status(200).json({
      status: 200,
      success: true,
      message: `Employee has been updated successfully`,
      data: result
    })
  })

  static DELETE = asyncHandler(async (req: EmployeeRequest, res: EmployeeResponse<undefined>) => {
    const userId = Number(req.params.user_id)
    const isExist = await EmployeeValidation.isDataExist({
      id: userId
    })

    if (!isExist) {
      return res.status(404).json({
        status: 404,
        message: `Employee not found`
      } as ErrorResponse)
    }

    await EmployeeService.DELETE(userId)

    res.status(200).json({
      status: 200,
      success: true,
      message: `User has been deleted successfully`
    })
  })
}

export default EmployeeController