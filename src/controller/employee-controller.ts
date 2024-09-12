import { Request, Response } from "express";
import { asyncHandler } from "../helper/async-helper";
import { StatusCodes } from "http-status-codes";
import { Employee, ErrorResponse, SuccessResponse } from "../types";
import EmployeeService from "../services/employee-service";
import TeamUserService from "../services/team-user-service";


type EmployeeResponse<TData> = Response<SuccessResponse<TData> | ErrorResponse>
type EmployeeRequest = Request<{ user_id: number }, any, Employee, {
  search: string;
  limit: string;
  page: string;
}>

export const getAllEmployessClient = asyncHandler(async (req: EmployeeRequest, res: EmployeeResponse<Employee[]>) => {
  const test = await EmployeeService.GET_ALL();

  res.json(test)
})

// @desc  Get all users
// @route GET /api/employees
export const getAllEmployees = asyncHandler(async (req: EmployeeRequest, res: EmployeeResponse<any>) => {
  const defaultLimit = 10;
  const defaultPage = 1;

  const limit: number = parseInt(req.query.limit, 10) || defaultLimit;
  const currentPage: number = parseInt(req.query.page, 10) || defaultPage;
  const searchStr: string | undefined = req.query.search;

  const result = await EmployeeService.GET_ALL(
    limit,
    currentPage,
    searchStr
  )

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    data: result
  });
});

// @desc  Get user by id
// @route GET /api/employees:user_id
export const getEmployeeById = asyncHandler(async (req: EmployeeRequest, res: EmployeeResponse<Employee>) => {
  const employeeId = Number(req.params.user_id)
  const result = await EmployeeService.GET_BY_ID(employeeId)

  const resultCount = result?.rowCount ?? 0

  if (!(resultCount > 0)) {
    return res.status(404).json({
      status: 404,
      message: `Employee not found`
    } as ErrorResponse)
  }

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    data: result?.rows.at(0)
  });
});

// @desc  Delete a user
// @route DELETE /api/employees:user_id
export const deleteEmployee = asyncHandler(async (req: Request, res: EmployeeResponse<null>) => {
  const user_id = Number(req.params.user_id)
  await EmployeeService.DELETE(
    user_id
  )

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    message: `Employee has been successfully deleted`,
  });
})

// @desc Create a user
// @route POST /api/employees
export const createEmployee = asyncHandler(async (req: EmployeeRequest, res: EmployeeResponse<Employee>) => {
  const team_id = Number(req.body.team_id)
  const result = await EmployeeService.STORE(req.body)
  await TeamUserService.ADD_MEMBER(result?.id, team_id)

  res.status(StatusCodes.OK).json({
    status: StatusCodes.CREATED,
    success: true,
    message: `User is created successfully`,
    data: result
  });
})

// @desc Update Current User Profile
// @route PUT /api/employees
export const updateEmployee = asyncHandler(async (req: EmployeeRequest, res: EmployeeResponse<Employee>) => {
  const result = await EmployeeService.UPDATE(req.body)

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    message: `User updated successfully`,
    data: result
  });
})