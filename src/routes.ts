import { Router } from 'express'
import { verifyRole } from './middleware/level-middleware';
import {
  absenceRoute,
  chartRoute,
  employeeRoute,
  profileRoute,
  projectRoute,
  roleRoute,
  taskRoute,
  teamRoute
} from './route';

export const routesWithAuth = Router();

routesWithAuth.use('/employees/', employeeRoute)
routesWithAuth.use('/tasks/', taskRoute)
routesWithAuth.use('/profiles/', profileRoute)
routesWithAuth.use('/absences/', absenceRoute)
routesWithAuth.use('/projects/', projectRoute)
routesWithAuth.use('/charts', chartRoute)

export const routesWithoutAuth = Router()
routesWithAuth.use('/teams', teamRoute)
routesWithAuth.use('/roles', roleRoute)