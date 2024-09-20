import express from "express";
import { validateData } from "../middleware/validation-middleware";
import { CreateUserSchema, UpdateUserSchema } from "../schema/user-schema";
import EmployeeController from "../controller/employees";
import { verifyRole } from "../middleware/level-middleware";
const route = express.Router();

route.get('/:user_id', EmployeeController.SHOW)
route.get('/', EmployeeController.GET)
route.post('/', validateData(CreateUserSchema), verifyRole(['hr']), EmployeeController.STORE)
route.put('/', validateData(UpdateUserSchema), verifyRole(['hr']), EmployeeController.UPDATE)
route.delete('/:user_id', verifyRole(['hr']), EmployeeController.DELETE)

export default route;