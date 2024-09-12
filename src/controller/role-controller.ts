import { Request, Response } from "express";
import { asyncHandler } from "../helper/async-helper";
import { ErrorResponse, Role, SuccessResponse } from "../types";
import { StatusCodes } from "http-status-codes";
import RoleService from "../services/role-service";
import { isEmptyObject, transformText } from "../helper/function-helpter";
import slugify from "slugify";
// import RoleService from "../services/role-service";

type RoleResponse<TData> = Response<SuccessResponse<TData> | ErrorResponse>
type RoleRequest = Request<{ role_id?: number }, any, {
  id?: number;
  display_name: string;
}>

class RoleController {
  static GET = asyncHandler(async (req: RoleRequest, res: RoleResponse<Role[]>) => {
    const result = await RoleService.GET_ALL()

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      data: result
    })
  })

  static SHOW = asyncHandler(async (req: RoleRequest, res: RoleResponse<Role>) => {
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

  static POST = asyncHandler(async (req: RoleRequest, res: RoleResponse<any>) => {
    const display_name = req.body.display_name
    const newRole = {
      display_name: display_name,
      role_name: transformText(display_name)
    }

    const isValid = await Validation.isValid(newRole)
    if (!isValid.valid) {
      return res.status(403).json({
        status: 403,
        message: isValid.message
      } as ErrorResponse)
    }

    const result = await RoleService.STORE(newRole)

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      success: true,
      message: `New role successfully created`,
      data: result
    })
  })

  static UPDATE = asyncHandler(async (req: RoleRequest, res: RoleResponse<any>) => {
    const role_id = Number(req.body.id);
    const display_name = req.body.display_name

    const role: Role = {
      id: role_id,
      display_name: display_name,
      role_name: transformText(display_name)
    }

    const isValid = await Validation.isValid(role, true);
    if (!isValid.valid) {
      return res.status(403).json({
        status: 403,
        message: isValid.message
      } as ErrorResponse);
    }

    const result = await RoleService.UPDATE(role)

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      message: `Role with ID ${role_id} has been updated`,
      data: result
    })
  })

  static DELETE = asyncHandler(async (req: RoleRequest, res: RoleResponse<null>) => {
    const role_id = Number(req.params.role_id);

    const isExist = await Validation.isExist(role_id)
    if (!isExist.valid) {
      return res.status(404).json({
        status: 404,
        message: isExist.message
      } as ErrorResponse)
    }

    await RoleService.DELETE(role_id)

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      success: true,
      message: `Role with ID ${role_id} has been deleted`,
    })
  })
}

class Validation {
  static async isValid(role: Role, isUpdate: boolean = false): Promise<{
    valid: boolean,
    message?: string
  }> {
    const isDuplicatedEntry = await RoleService.CHECK_DUPLICATE_ENTRY(
      role,
      isUpdate ? role.id : undefined
    );

    if (isDuplicatedEntry) {
      return {
        valid: false,
        message: `A role with the name ${role.display_name} already exists`
      };
    }

    return {
      valid: true,
    };
  }

  static async isExist(role_id: number): Promise<{
    valid: boolean,
    message?: string
  }> {
    const result = await RoleService.GET_BY_ID(role_id)

    if (!result) {
      return {
        valid: false,
        message: `Role not found`
      };
    }

    return {
      valid: true,
    };
  }
}

export default RoleController
