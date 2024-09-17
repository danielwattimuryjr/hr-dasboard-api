import express from "express"
import ProfileController from "../profiles"
const route = express.Router()

route.get('/', ProfileController.GET)
route.put('/', ProfileController.UPDATE)

export default route