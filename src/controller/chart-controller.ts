import { Request, Response } from "express";
import { asyncHandler } from "../helper/async-helper";
import { ErrorResponse, SuccessResponse } from "../types";
import { StatusCodes } from "http-status-codes";
import { fetchTasksByUserId, getDailyWorkingHours } from "../helper/functions";

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
  const user_id = 126;
  const model: string = req.params.model;

  let responseData;

  switch (model) {
    case "bar":
      responseData = await getBarChart(user_id);
      break;
    case "pie":
      responseData = await getPieChart(user_id);
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

const getPieChart = async (user_id: number) => {
  const [monthlyTasks, weeklyTasks] = await Promise.all([
    fetchTasksByUserId(user_id, "monthly"),
    fetchTasksByUserId(user_id, "weekly")
  ]);

  const { series: monthlySeries } = getDailyWorkingHours(monthlyTasks);
  const { series: weeklySeries } = getDailyWorkingHours(weeklyTasks);


  const weeklyHours = weeklySeries.reduce((series, val) => {
    return series + val
  }, 0)

  const monthlyHours = monthlySeries.reduce((series, val) => {
    return series + val
  }, 0)

  return { weeklyHours, monthlyHours }
}

const getBarChart = async (user_id: number) => {
  const tasks = await fetchTasksByUserId(user_id, "weekly")

  const { series, option } = getDailyWorkingHours(tasks);

  return {
    option,
    series
  }
}