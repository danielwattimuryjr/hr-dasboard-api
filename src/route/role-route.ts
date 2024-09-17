import express from "express"
import { validateData } from "../middleware/validation-middleware";
import { CreateRoleSchema, UpdateRoleSchema } from "../schema/role-schema";
import RoleController from "../controller/roles";
const route = express.Router();

route.get('/:role_id', RoleController.SHOW)
route.get('/', RoleController.GET)
route.post('/', validateData(CreateRoleSchema), RoleController.STORE)
route.put('/', validateData(UpdateRoleSchema), RoleController.UPDATE)
route.delete('/:role_id', RoleController.DELETE)


export default route;