import { Request, Response } from "express"
import { ErrorResponse, SuccessResponse, Task } from "../../types"
import TaskService from "../../services/task-service"
import { asyncHandler } from "../../helper/async-helper"

type TaskRequest<TReq> = Request<{}, any, TReq>
type TaskResponse<TRes> = Response<SuccessResponse<TRes> | ErrorResponse>

class TaskController {
  static POST = asyncHandler(async (req: TaskRequest<{
    data: Task[]
  }>, res: TaskResponse<Task[]>) => {
    const tasks = req.body.data
    const userId = req.user?.id

    if (!userId) {
      return res.status(400).json({
        status: 400,
        message: `User id is not specified`
      } as ErrorResponse)
    }

    const result = await TaskService.STORE(userId, tasks)

    res.status(201).json({
      status: 201,
      success: true,
      message: `Your work has been saved`,
      data: result
    })
  })
}

export default TaskController