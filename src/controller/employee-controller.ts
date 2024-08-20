import { Request, Response } from "express";
import { asyncHandler } from "../helper/async-helper";
import { query } from "../libs/pg";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse, SuccessResponse } from "../types";

type Employee = {
  id?: number;
  email: string;
  full_name: string;
  username: string;
  role_name: string;
  display_name: string;
}

type EmployeeRequest = Request<{
  user_id: number;
}, SuccessResponse<Employee[]>, {
  email: string,
  full_name: string,
  username: string,
  password: string,
  role_id: number,
}, {
  search: string;
  limit: string;
  page: string;
}>

// @desc  Get all users
// @route GET /api/employees
export const getAllEmployees = asyncHandler(async (req: EmployeeRequest, res: Response): Promise<void> => {
  const whereClauses: any[] = []
  const queryParams: any[] = []
  let limitQuery: string = '';
  let offsetQuery: string = '';
  let searchStr: string | undefined = req.query.search;

  if (searchStr) {
    whereClauses.push(`u::text ILIKE $${queryParams.length + 1} OR r::text ILIKE $${queryParams.length + 1}`)
    queryParams.push(`%${searchStr}%`)
  }
  const limit = parseInt(req.query.limit as string, 10) || 10;
  const page = parseInt(req.query.page as string, 10) || 1;

  limitQuery = `LIMIT $${queryParams.length + 1}`;
  queryParams.push(limit);

  offsetQuery = `OFFSET $${queryParams.length + 1}`;
  queryParams.push((page - 1) * limit);

  const whereClause = whereClauses.length > 0 ? ' WHERE ' + whereClauses.join(' AND ') : '';

  const queryString = `
    SELECT u.id, u.email, u.full_name AS name, u.phone, r.display_name AS role
    FROM users u 
    LEFT JOIN roles r ON u.role_id = r.id 
    ${whereClause}
    ORDER BY u.id ASC
    ${limitQuery}
    ${offsetQuery}
  `;

  const countQueryString = `
    SELECT COUNT(*) AS total 
    FROM users u 
    LEFT JOIN roles r ON u.role_id = r.id 
    ${whereClause}
    
  `;

  const result = await query<Employee>(queryString, queryParams)

  const countResult = await query<{ total: number }>(countQueryString, searchStr ? [queryParams[0]] : []);

  const totalRecords = Number(countResult?.rows[0]?.total || 0);
  const totalPages = Math.ceil(totalRecords / limit);
  const currentPage = page;

  const successResponse: SuccessResponse<{
    totalItems: number;
    employees: Employee[] | undefined;
    totalPages: number;
    currentPage: number;
    limit?: number;
    search?: string | null;
    rowPerPages: number[];
  }> = {
    status: StatusCodes.OK,
    success: true,
    data: {
      totalItems: totalRecords,
      totalPages: totalPages,
      currentPage: currentPage,
      limit,
      search: searchStr || null,
      rowPerPages: [5, 10, 15],
      employees: result?.rows,
    }
  };

  res.status(StatusCodes.OK).json(successResponse);
});

// @desc  Get user by id
// @route GET /api/employees:user_id
export const getEmployeeById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user_id = Number(req.params.user_id);

  const result = await query<Employee>(
    `
    SELECT u.*, r.display_name AS role FROM users u
    LEFT JOIN roles r ON u.role_id = r.id 
    WHERE u.id=$1
    ORDER BY id ASC
    `,
    [user_id]
  )

  const successResponse: SuccessResponse<Employee | []> = {
    status: StatusCodes.OK,
    success: true,
    data: result ? (result.rows.at(0)) : [],
  };

  res.status(StatusCodes.OK).json(successResponse);
});

// @desc  Delete a user
// @route DELETE /api/employees:user_id
export const deleteEmployee = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const user_id: number = parseInt(req.params.user_id)

  await query(
    `DELETE FROM users WHERE id=$1`,
    [user_id]
  )

  const successResponse: SuccessResponse<Employee[]> = {
    status: StatusCodes.OK,
    success: true,
    message: `User with id ${user_id} has been deleted`,
  };

  res.status(StatusCodes.OK).json(successResponse);
})

// @desc Create a user
// @route POST /api/employees
export const createEmployee = asyncHandler(async (req: EmployeeRequest, res: Response) => {
  const { email, full_name, username, password, role_id } = req.body

  const result = await query(
    `INSERT INTO public."users" (email, full_name, username, password, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [email, full_name, username, password, role_id]
  )

  const successResponse: SuccessResponse<Employee> = {
    status: StatusCodes.CREATED,
    success: true,
    message: `User is created successfully`,
    data: result?.rows.at(0)
  };

  res.status(StatusCodes.OK).json(successResponse);
})

// @desc Update Current User Profile
// @route PUT /api/employees
export const updateProfile = asyncHandler(async (req: EmployeeRequest, res: Response) => {
  let user_id: number = 0;

  if (req.params.user_id) {
    user_id = Number(req.params.user_id);
  } else {
    // const user_id = req.user.id;
    user_id = 1;
  }

  const { email, full_name, username, password } = req.body;

  const result = await query<Employee>(
    `UPDATE public."users" SET email=$1, full_name=$2, username=$3, password=$4 WHERE id=$5 RETURNING *`,
    [email, full_name, username, password, user_id]
  )

  const successResponse: SuccessResponse<Employee> = {
    status: StatusCodes.OK,
    success: true,
    message: `User updated successfully`,
    data: result?.rows.at(0)
  };

  res.status(StatusCodes.OK).json(successResponse);
})