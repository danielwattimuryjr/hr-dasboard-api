import express from "express"
import { getBarChartData, getPieChartData } from "../controller/chart-controller"
const route = express.Router()

route.get('/bar', getBarChartData)
route.get('/pie', getPieChartData)

export default route