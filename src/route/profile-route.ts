import express from "express"
import { getProfile, updateProfile } from "../controller/profile-controller"
const route = express.Router()

route.get('/', getProfile)
route.put('/', updateProfile)

export default route