import express from "express"
import { login, logout } from "../controller/auth-controller"
const route = express.Router()

route.post('/', login);
route.post('/logout', logout);

export default route