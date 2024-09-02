import express from "express";
import { createEmployee, deleteEmployee, getAllEmployees, getAllEmployessClient, getEmployeeById, updateEmployee } from "../controller/employee-controller";
import { validateData } from "../middleware/validation-middleware";
import { CreateUserSchema, UpdateUserProfileSchema } from "../schema/user-schema";
const route = express.Router();

route.get('/', getAllEmployees);
route.get('/client', getAllEmployessClient);
route.post('/', validateData(CreateUserSchema), createEmployee);
route.delete('/:user_id', deleteEmployee);
route.get('/:user_id', getEmployeeById);
route.put('/:user_id?', validateData(UpdateUserProfileSchema), updateEmployee);

export default route;