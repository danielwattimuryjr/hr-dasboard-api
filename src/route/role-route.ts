import express from "express"
import RoleController from "../controller/role-controller";
import { validateData } from "../middleware/validation-middleware";
import { CreateRoleSchema, UpdateRoleSchema } from "../schema/role-schema";
const route = express.Router();

route.get('/', RoleController.GET)
route.get('/:role_id', RoleController.SHOW)
route.post('/', validateData(CreateRoleSchema), RoleController.POST)
route.put('/', validateData(UpdateRoleSchema), RoleController.UPDATE)
route.delete('/:role_id', RoleController.DELETE)

export default route;