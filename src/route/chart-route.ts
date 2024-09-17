import express from "express"
import ChartController from "../controller/charts"
const route = express.Router()

route.get('/:model', ChartController.GET)

export default route