import { Request, Response } from "express";
import { asyncHandler } from "../helper/async-helper";
import { ErrorResponse, SuccessResponse } from "../types";
import { query } from "../libs/pg";
import { StatusCodes } from "http-status-codes";

type Role = {
  id?: number;
  role_name: string;
  display_name: string;
  total_users?: number;
}

type RoleResponse<TData> = Response<SuccessResponse<TData> | ErrorResponse>
type RoleRequest = Request<{ role_id?: number }, any, {
  display_name: string;
  role_name: string;
}>

const getAllRole = asyncHandler(async (req: RoleRequest, res: RoleResponse<Role[]>) => {
  const fetchRoleResult = await query<Role>(
    `
      SELECT
          r.id,
          r.role_name,
          r.display_name,
          COUNT(u.id) AS total_users
      FROM
          roles r
      LEFT JOIN
          users u
      ON
          r.id = u.role_id
      GROUP BY
          r.id, r.role_name, r.display_name
    `
  )

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    data: fetchRoleResult?.rows || []
  })
})

const getRoleById = asyncHandler(async (req: RoleRequest, res: RoleResponse<Role>) => {
  const role_id = Number(req.params.role_id);

  if (!role_id) {
    const response: ErrorResponse = {
      status: StatusCodes.BAD_REQUEST,
      message: "Role ID not specified"
    }

    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  const checkRoleExistenceResult = await query<Role>(
    `SELECT * FROM roles WHERE id=$1`,
    [role_id]
  )
  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    data: checkRoleExistenceResult?.rows.at(0)
  })
})

const createNewRole = asyncHandler(async (req: RoleRequest, res: RoleResponse<Role>) => {
  const { display_name, role_name } = req.body

  const storeNewRoleResult = await query<Role>(
    `INSERT INTO roles (display_name, role_name) VALUES ($1, $2) RETURNING *`,
    [display_name, role_name]
  )

  res.status(StatusCodes.CREATED).json({
    status: StatusCodes.CREATED,
    success: true,
    message: `New role successfully created`,
    data: storeNewRoleResult?.rows.at(0)
  })
})

const updateRole = asyncHandler(async (req: RoleRequest, res: RoleResponse<Role>) => {
  const role_id = Number(req.params.role_id);
  const { display_name, role_name } = req.body

  const updateRoleResult = await query<Role>(
    `UPDATE roles SET display_name=$1, role_name=$2 WHERE id=$3 RETURNING *`,
    [display_name, role_name, role_id]
  )

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    message: `Role with ID ${role_id} has been updated`,
    data: updateRoleResult?.rows.at(0)
  })
})

const deleteRole = asyncHandler(async (req: RoleRequest, res: RoleResponse<null>) => {
  const role_id = Number(req.params.role_id);

  await query(
    `DELETE FROM projects WHERE id=$1`,
    [role_id]
  )

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    message: `Role with ID ${role_id} has been deleted`,
  })
})


export {
  getAllRole,
  getRoleById,
  createNewRole,
  updateRole,
  deleteRole
}