import express from "express"
import { login, logout } from "../controller/auth-controller"
import { validateData } from "../middleware/validation-middleware";
import { loginSchema } from "../schema/auth-schema";
const route = express.Router()

route.post('/', validateData(loginSchema), login);
route.post('/logout', logout);

export default route