import 'dotenv/config'
require('dotenv').config()

import express from "express";

import cors from "cors"
import helmet from "helmet";
import db from "./libs/pg"
import { notFoundHandler } from "./error/not-found";
import { errorHandler } from "./error/error";
import { verifyToken } from './middleware/token-middleware';
import cookieParser from 'cookie-parser';
import {
  absenceRoute,
  authRouter,
  chartRouter,
  employeeRouter,
  profileRoute,
  projectRoute,
  roleRoute,
  taskRouter,
  teamRoute
} from './route';
import { verifyRole } from './middleware/level-middleware';

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
  app.use('/api/employees/', verifyToken, verifyRole(['hr']), employeeRouter)
  app.use('/api/tasks/', verifyToken, taskRouter)
  app.use('/api/profiles/', verifyToken, profileRoute)
  app.use('/api/absences/', verifyToken, absenceRoute)
  app.use('/api/projects/', projectRoute)
  app.use('/api/teams/', teamRoute)
  app.use('/api/roles/', roleRoute)

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () =>
    console.log(`Server is running on http://localhost/${PORT}`)
  );

}

void asyncHandler()
