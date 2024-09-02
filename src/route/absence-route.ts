import express from "express"
import { approveAbsenceData, createNewAbsence, deleteAbsence, getAbsenceData, getAbsenceDataTest } from "../controller/absence-controller";
import { validateData } from "../middleware/validation-middleware";
import { absenceApprovalSchema, absenceSchema } from "../schema/absence-schema";
const route = express.Router();

route.get("/", getAbsenceData)
route.get("/history", getAbsenceDataTest)
route.post("/", validateData(absenceSchema), createNewAbsence)
route.put('/:absence_id', validateData(absenceApprovalSchema), approveAbsenceData)
route.delete('/:absence_id', deleteAbsence)

export default route;
