import express from "express"
import ProjectController from "../controller/projects";
import { validateData } from "../middleware/validation-middleware";
import { CreateProjectSchema, UpdateProjectSchema } from "../schema/project-schema";
const route = express.Router();

route.get('/:project_id', ProjectController.SHOW)
route.get('/', ProjectController.GET)
route.post('/', validateData(CreateProjectSchema), ProjectController.STORE)
route.put('/', validateData(UpdateProjectSchema), ProjectController.UPDATE)
route.delete('/:project_id', ProjectController.DELETE)

export default route;