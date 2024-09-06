import express from "express"
import TeamController from "../controller/team-controller"
const route = express.Router()

route.get('/', TeamController.INDEX);
route.post('/', TeamController.CREATE_TEAM);
route.get('/show', TeamController.SHOW);
route.post('/add-member', TeamController.ADD_MEMBER);
route.delete('/remove-member', TeamController.REMOVE_MEMBER);
route.delete('/delete', TeamController.DESTROY);

export default route