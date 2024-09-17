import express from "express"
import { validateData } from "../middleware/validation-middleware";
import { CreateTeamSchema, UpdateTeamSchema } from "../schema/team-schema";
import TeamController from "../controller/teams";
const route = express.Router()

route.post('/assign-project', TeamController.ASSIGN_PROJECT);
route.delete('/remove-project', TeamController.REMOVE_PROJECT_FROM_TEAM);

route.get('/', TeamController.GET);
route.post('/', validateData(CreateTeamSchema), TeamController.STORE)
route.put('/', validateData(UpdateTeamSchema), TeamController.UPDATE)
route.delete('/:team_id', TeamController.DELETE)
route.get('/:team_id', TeamController.SHOW)

export default route