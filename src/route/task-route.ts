import express from "express"
import TaskController from "../controller/task-controller";
import { validateData } from "../middleware/validation-middleware";
import { taskDataSchema } from "../schema/task-schema";
const route = express.Router();

route.post('/', validateData(taskDataSchema), TaskController.SAVE)
route.get('/', TaskController.GET_BY_ID)
route.delete('/:task_id', TaskController.DELETE)

export default route