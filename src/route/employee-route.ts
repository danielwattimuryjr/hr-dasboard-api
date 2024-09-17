import express from "express";
import { validateData } from "../middleware/validation-middleware";
import { CreateUserSchema, UpdateUserSchema } from "../schema/user-schema";
import EmployeeController from "../controller/employees";
const route = express.Router();

route.get('/:user_id', EmployeeController.SHOW)
route.get('/', EmployeeController.GET)
route.post('/', validateData(CreateUserSchema), EmployeeController.STORE)
route.put('/', validateData(UpdateUserSchema), EmployeeController.UPDATE)
route.delete('/:user_id', EmployeeController.DELETE)

export default route;