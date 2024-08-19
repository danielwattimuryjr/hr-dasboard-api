import express from "express"
import { deleteTask, getTaskByUserId, saveTask } from "../controller/task-controller";
import { validateData } from "../middleware/validation-middleware";
import { taskDataSchema } from "../schema/task-schema";
const route = express.Router();

route.post('/', validateData(taskDataSchema), saveTask)
route.get('/', getTaskByUserId)
route.delete('/:task_id', deleteTask)

export default route