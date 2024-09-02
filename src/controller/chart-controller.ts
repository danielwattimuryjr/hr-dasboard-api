import { Request, Response } from "express";
import { asyncHandler } from "../helper/async-helper";
import { ErrorResponse, SuccessResponse, Task } from "../types";
import { StatusCodes } from "http-status-codes";
import ChartService from "../services/chart-service";

type PieChartResponse = {
  weeklyHours: number;
  monthlyHours: number;
}

type BarChartResponse = {
  series: number[],
  option: string[]
}

// @desc  Get required data for the bar chart
// @route GET /api/charts/:model
export const getChartData = asyncHandler(async (req: Request, res: Response) => {
  const user_id = req.user?.id;
  const model: string = req.params.model;

  if (!user_id) {
    return res.status(400).json({
      status: 400,
      message: `User id is not specified`
    } as ErrorResponse)
  }

  let responseData;

  switch (model) {
    case "bar":
      responseData = await ChartService.GET_DATA(user_id, 'bar');
      break;
    case "pie":
      responseData = await ChartService.GET_DATA(user_id, 'pie');
      break;
    default:
      const errorResponse: ErrorResponse = {
        status: StatusCodes.BAD_REQUEST,
        message: "Invalid chart model"
      }

      res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
      return;
  }

  const successResponse: SuccessResponse<BarChartResponse | PieChartResponse> = {
    status: StatusCodes.OK,
    success: true,
    data: responseData
  }

  res.status(StatusCodes.OK).json(successResponse);
})

export const getDailyWorkingHours = (tasks: Task[]) => {
  const dailyHours: { [key: string]: number } = {};

  tasks.forEach((task) => {
    const date = task.start.toLocaleDateString(undefined, {
      day: "numeric",
      month: "numeric",
      year: "numeric"
    }).split('/').join('-');

    if (!dailyHours[date]) {
      dailyHours[date] = 0;
    }
    dailyHours[date] += calculateWorkingHours(task.start, task.end);
  });

  const option = Object.keys(dailyHours).sort();
  const series = option.map(date => dailyHours[date]);

  return { option, series }
}

const calculateWorkingHours = (start: Date, end: Date): number => {
  // if (start >= end) {
  //   throw new Error('End time must be after start time');
  // }

  const differenceInMilliseconds = end.getTime() - start.getTime();

  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

  return differenceInHours;
};