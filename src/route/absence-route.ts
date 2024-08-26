import express from "express"
import { createNewAbsence, getAbsenceData } from "../controller/absence-controller";
import { validateData } from "../middleware/validation-middleware";
import { absenceSchema } from "../schema/absence-schema";
const route = express.Router();

route.get("/", getAbsenceData)
route.post("/", validateData(absenceSchema), createNewAbsence)

export default route;
