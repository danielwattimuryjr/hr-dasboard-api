import express from "express"
import { getChartData } from "../controller/chart-controller"
const route = express.Router()

route.get('/:model', getChartData)

export default route