import express from "express"
import RoleController from "../controller/role-controller";
const route = express.Router();

route.get('/', RoleController.GET)
route.get('/:role_id', RoleController.SHOW)
route.post('/', RoleController.POST)
route.put('/:role_id', RoleController.UPDATE)
route.delete('/:role_id', RoleController.DELETE)

export default route;