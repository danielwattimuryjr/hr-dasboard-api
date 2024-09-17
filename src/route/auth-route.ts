import express from "express"
import { validateData } from "../middleware/validation-middleware";
import { loginSchema } from "../schema/auth-schema";
import AuthController from "../controller/auth";
const route = express.Router()

route.post('/', validateData(loginSchema), AuthController.POST);

export default route