import 'dotenv/config'
require('dotenv').config()

import express from "express";
import employeeRouter from "./route/employee-route";
import taskRouter from "./route/task-route";
import chartRouter from "./route/chart-route";
import authRouter from "./route/auth-route";
import absenceRoute from "./route/absence-route";
import projectRoute from "./route/project-route";
import roleRoute from "./route/role-route";
import cors from "cors"
import helmet from "helmet";
import db from "./libs/pg"
import { notFoundHandler } from "./error/not-found";
import { errorHandler } from "./error/error";
import { verifyToken } from './middleware/token-middleware';
import cookieParser from 'cookie-parser';

const asyncHandler = async () => {
  await db.connect()
  const app = express();
  const PORT = process.env.PORT || 8080;

  app.use(cookieParser())
  app.use(helmet());
  app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }))

  app.use(express.static('public'));

  app.use('/api/auth/', authRouter)
  app.use('/api/employees/', employeeRouter)
  app.use('/api/tasks/', taskRouter)
  // app.use('/api/charts/', verifyToken, chartRouter)
  app.use('/api/charts/', chartRouter)
  app.use('/api/absences/', absenceRoute)
  app.use('/api/projects/', projectRoute)
  app.use('/api/roles/', roleRoute)

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () =>
    console.log(`Server is running on http://localhost/${PORT}`)
  );

}

void asyncHandler()
