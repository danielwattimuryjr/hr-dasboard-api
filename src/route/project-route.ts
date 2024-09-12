import express from "express"
import { createNewProject, deleteProject, getAllProject, getProjectById, updateProject } from "../controller/project-controller";
const route = express.Router();

route.get('/:project_id', getProjectById)
route.get('/', getAllProject)
route.post('/', createNewProject)
route.put('/:project_id', updateProject)
route.delete('/:project_id', deleteProject)

export default route;