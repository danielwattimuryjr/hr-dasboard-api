import { Request, Response } from "express";
import { query } from "../libs/pg";
import { ErrorResponse, SuccessResponse } from "../types";
import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../helper/async-helper";
import { fetchTasksByUserId } from "../helper/functions";

type Task = {
  id?: number;
  user_id?: number;
  description: string;
  start: Date;
  end: Date;
  project: string;
}

type TaskRequest = Request<{}, SuccessResponse<Task[]>, {
  data: Task[]
}>

// @desc  Save a new task
// @route POST /api/tasks/
export const saveTask = asyncHandler(async (req: TaskRequest, res: Response) => {
  const tasks = req.body.data;
  // const user_id = req.user.id;
  const user_id = 126;

  try {
    await query("BEGIN")

    const q: string[] = [];
    const params: string[] = [];
    tasks?.forEach((task, index) => {
      const baseIndex = index * 5;
      q.push(`($${baseIndex + 1}, $${baseIndex + 2}, $${baseIndex + 3}, $${baseIndex + 4}, $${baseIndex + 5})`);

      params.push(`${task.project}`)
      params.push(`${task.description}`)
      params.push(`${task.start}`)
      params.push(`${task.end}`)
      params.push(`${user_id}`)
    })

    const queryStr = `INSERT INTO tasks (project, description, start, "end", user_id) VALUES ` + q.join(', ') + `RETURNING *`;

    const task_result = await query<Task>(queryStr, params)
    await query("COMMIT")

    const successResponse: SuccessResponse<Task[]> = {
      status: StatusCodes.CREATED,
      success: true,
      message: `Report created succesfully for user ${user_id}`,
      data: task_result?.rows
    }

    res.status(StatusCodes.OK).json(successResponse)
  } catch (error) {
    await query("ROLLBACK")

    const errorResponse: ErrorResponse = {
      status: StatusCodes.BAD_REQUEST,
      message: `Something's wrong`
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse)
  }
})

// @desc  Get all tasks for a certain user
// @route GET /api/tasks/
export const getTaskByUserId = asyncHandler(async (req: TaskRequest, res: Response) => {
  // const user_id = req.user.id;
  const user_id = 126

  const task_result = await fetchTasksByUserId(user_id);

  const successResponse: SuccessResponse<any> = {
    status: StatusCodes.OK,
    success: true,
    data: task_result
  };

  res.status(StatusCodes.OK).json(successResponse);
});

// @desc  Delete a task
// @route DELETE /api/tasks/:task_id
export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const task_id = Number(req.params.task_id);

  await query(
    `DELETE FROM tasks WHERE id=$1`,
    [task_id]
  )

  const successResponse: SuccessResponse<any> = {
    status: StatusCodes.OK,
    success: true,
    message: `Task with id ${task_id} has been deleted`
  }

  res.status(StatusCodes.OK).json(successResponse)
})

