import { Request, Response } from "express";
import { asyncHandler } from "../helper/async-helper";
import { ErrorResponse, Role, SuccessResponse } from "../types";
import { StatusCodes } from "http-status-codes";
import RoleService from "../services/role-service";
// import RoleService from "../services/role-service";

type RoleResponse<TData> = Response<SuccessResponse<TData> | ErrorResponse>
type RoleRequest = Request<{ role_id?: number }, any, {
  display_name: string;
  role_name: string;
}>

const getAllRole = asyncHandler(async (req: RoleRequest, res: RoleResponse<Role[]>) => {
  const result = await RoleService.GET_ALL()

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    data: result
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

  const result = await RoleService.GET_BY_ID(role_id)

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    data: result
  })
})

const createNewRole = asyncHandler(async (req: RoleRequest, res: RoleResponse<any>) => {
  const result = RoleService.STORE(req.body)

  res.status(StatusCodes.CREATED).json({
    status: StatusCodes.CREATED,
    success: true,
    message: `New role successfully created`,
    data: result
  })
})

const updateRole = asyncHandler(async (req: RoleRequest, res: RoleResponse<any>) => {
  const role_id = Number(req.params.role_id);

  const result = RoleService.UPDATE(
    role_id,
    req.body
  )

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    message: `Role with ID ${role_id} has been updated`,
    data: result
  })
})

const deleteRole = asyncHandler(async (req: RoleRequest, res: RoleResponse<null>) => {
  const role_id = Number(req.params.role_id);

  RoleService.DELETE(role_id)

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