import express from "express"
import { createNewRole, deleteRole, getAllRole, getRoleById, updateRole } from "../controller/role-controller";
const route = express.Router();

route.get('/', getAllRole)
route.get('/:role_id', getRoleById)
route.post('/', createNewRole)
route.put('/:role_id', updateRole)
route.delete('/:role_id', deleteRole)

export default route;