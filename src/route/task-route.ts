import express from "express"
import { validateData } from "../middleware/validation-middleware";
import { taskDataSchema } from "../schema/task-schema";
import TaskController from "../controller/task";
const route = express.Router();

route.post('/', validateData(taskDataSchema), TaskController.POST)

export default route