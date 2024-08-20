import express from "express"
import { getAbsenceData } from "../controller/absence-controller";
const route = express.Router();

route.get("/", getAbsenceData)

export default route;
