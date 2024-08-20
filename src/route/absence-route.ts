import express from "express"
import { createNewAbsence, getAbsenceData } from "../controller/absence-controller";
const route = express.Router();

route.get("/", getAbsenceData)
route.post("/", createNewAbsence)

export default route;
