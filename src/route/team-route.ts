import express from "express"
import TeamController from "../controller/team-controller"
import { validateData } from "../middleware/validation-middleware";
import { CreateTeamSchema } from "../schema/team-schema";
const route = express.Router()

route.get('/', TeamController.INDEX);
route.post('/', validateData(CreateTeamSchema), TeamController.CREATE_TEAM);
route.get('/:team_id', TeamController.SHOW);
route.post('/add-member', TeamController.ADD_MEMBER);
route.delete('/remove-member', TeamController.REMOVE_MEMBER);
route.delete('/:team_id', TeamController.DESTROY);

route.post('/assign-project', TeamController.ASSIGN_PROJECT);
route.delete('/remove-project', TeamController.REMOVE_PROJECT_FROM_TEAM);

export default route