import { Request, Response } from "express";
import { query } from "../libs/pg";
import { ErrorResponse, SuccessResponse, Task } from "../types";
import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../helper/async-helper";
import TaskService from "../services/task-service";

type TaskRequest = Request<{}, SuccessResponse<Task[]>, {
  data: Task[]
}>

// @desc  Save a new task
// @route POST /api/tasks/
export const saveTask = asyncHandler(async (req: TaskRequest, res: Response) => {
  const tasks = req.body.data;
  const user_id = req.user?.id;

  if (!user_id) {
    return res.status(400).json({
      status: 400,
      message: `User id is not specified`
    } as ErrorResponse)
  }

  const result = await TaskService.STORE(user_id, tasks)

  const successResponse: SuccessResponse<Task[]> = {
    status: StatusCodes.CREATED,
    success: true,
    message: `Report created succesfully for user ${user_id}`,
    data: result
  }

  res.status(StatusCodes.OK).json(successResponse)
})

// @desc  Get all tasks for a certain user
// @route GET /api/tasks/
export const getTaskByUserId = asyncHandler(async (req: TaskRequest, res: Response) => {
  const employee_id = req.user?.id;

  if (!employee_id) {
    return res.status(400).json({
      status: 400,
      message: `User id is not specified`
    } as ErrorResponse)
  }
  // const user_id = 126

  const result = await TaskService.GET_BY_EMPLOYEE_ID(employee_id);

  const successResponse: SuccessResponse<any> = {
    status: StatusCodes.OK,
    success: true,
    data: result
  };

  res.status(StatusCodes.OK).json(successResponse);
});

// @desc  Delete a task
// @route DELETE /api/tasks/:task_id
export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const task_id = Number(req.params.task_id);

  await TaskService.DELETE(task_id)

  const successResponse: SuccessResponse<any> = {
    status: StatusCodes.OK,
    success: true,
    message: `Task with id ${task_id} has been deleted`
  }

  res.status(StatusCodes.OK).json(successResponse)
})

