import { Request, Response } from "express";
import { ErrorResponse, Role, SuccessResponse } from "../../types";
import { asyncHandler } from "../../helper/async-helper";
import RoleService from "../../services/role-service";
import RoleValidation from "./validation";
import { transformText } from "../../helper/function-helpter";

type RoleResponse<TData> = Response<SuccessResponse<TData> | ErrorResponse>
type RoleRequest = Request<{ role_id?: number }, any, {
  id?: number;
  display_name: string;
}>

class RoleController {
  static GET = asyncHandler(async (req: RoleRequest, res: RoleResponse<Role[]>) => {
    const result = await RoleService.GET()

    res.status(200).json({
      status: 200,
      success: true,
      data: result?.rows
    })
  })

  static SHOW = asyncHandler(async (req: RoleRequest, res: RoleResponse<Role>) => {
    const roleId = Number(req.params.role_id);
    const data = await RoleValidation.isDataExist({
      id: roleId
    })

    if (!data) {
      return res.status(404).json({
        status: 404,
        message: `Role not found`
      } as ErrorResponse)
    }

    res.status(200).json({
      status: 200,
      success: true,
      data: data
    })
  })

  static STORE = asyncHandler(async (req: RoleRequest, res: RoleResponse<Role>) => {
    const { display_name } = req.body;
    const transformedName = transformText(display_name);

    const existingRole = await RoleValidation.isDataExist({
      display_name,
      role_name: transformedName
    });

    if (existingRole) {
      return res.status(403).json({
        status: 403,
        message: `Role Name not available`
      } as ErrorResponse);
    }

    const result = await RoleService.STORE({
      display_name,
      role_name: transformedName
    });

    res.status(201).json({
      status: 201,
      success: true,
      message: `Role has been created successfully`,
      data: result
    });
  })

  static UPDATE = asyncHandler(async (req: RoleRequest, res: RoleResponse<Role>) => {
    const roleId = Number(req.body.id)
    const { display_name } = req.body;
    const transformedName = transformText(display_name);

    const isExist = await RoleValidation.isDataExist({
      id: roleId
    });

    if (!isExist) {
      return res.status(404).json({
        status: 404,
        message: `Role not found`
      } as ErrorResponse);
    }

    const result = await RoleService.UPDATE({
      id: roleId,
      display_name,
      role_name: transformedName
    });

    res.status(201).json({
      status: 201,
      success: true,
      message: `Role has been updated successfully`,
      data: result
    });
  })

  static DELETE = asyncHandler(async (req: RoleRequest, res: RoleResponse<undefined>) => {
    const roleId = Number(req.params.role_id)

    const isExist = await RoleValidation.isDataExist({
      id: roleId
    });

    if (!isExist) {
      return res.status(404).json({
        status: 404,
        message: `Role not found`
      } as ErrorResponse);
    }

    await RoleService.DELETE(roleId)

    res.status(201).json({
      status: 201,
      success: true,
      message: `Role has been deleted successfully`,
    });
  })
}

export default RoleController