import { Request, Response } from "express";
import { asyncHandler } from "../helper/async-helper";
import { StatusCodes } from "http-status-codes";
import { Employee, ErrorResponse, SuccessResponse } from "../types";
import EmployeeService from "../services/employee-service";


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
  const result = await EmployeeService.GET_BY_ID(req.params.user_id)

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    data: result
  });
});

// @desc  Delete a user
// @route DELETE /api/employees:user_id
export const deleteEmployee = asyncHandler(async (req: Request, res: EmployeeResponse<null>) => {
  await EmployeeService.DELETE(
    Number(req.params.user_id)
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
  const result = await EmployeeService.STORE(req.body)

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
  const user_id = Number(req.params.user_id);

  const result = await EmployeeService.UPDATE(user_id, req.body)

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    message: `User updated successfully`,
    data: result
  });
})