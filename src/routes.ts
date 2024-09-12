import { Router } from 'express'
import { verifyRole } from './middleware/level-middleware';
import {
  absenceRoute,
  chartRouter,
  employeeRouter,
  profileRoute,
  projectRoute,
  roleRoute,
  taskRouter,
  teamRoute
} from './route';

export const routesWithAuth = Router();

routesWithAuth.use('/employees/', verifyRole(['hr']), employeeRouter)
routesWithAuth.use('/tasks/', taskRouter)
routesWithAuth.use('/profiles/', profileRoute)
routesWithAuth.use('/absences/', absenceRoute)
routesWithAuth.use('/projects/', projectRoute)

export const routesWithoutAuth = Router()
routesWithoutAuth.use('/teams', teamRoute)
routesWithoutAuth.use('/roles', roleRoute)