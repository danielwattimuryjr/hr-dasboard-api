import { Request, Response } from "express";
import { asyncHandler } from "../helper/async-helper";
import { SuccessResponse } from "../types";
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
// @route GET /api/charts/pie
export const getBarChartData = asyncHandler(async (req: Request, res: Response) => {
  // const user_id = req.user.id;
  const user_id = 1;
  const tasks = await fetchTasksByUserId(user_id, "weekly")

  const { series, option } = getDailyWorkingHours(tasks);

  const successResponse: SuccessResponse<BarChartResponse> = {
    status: StatusCodes.OK,
    success: true,
    data: {
      option,
      series
    }
  }

  res.status(StatusCodes.OK).json(successResponse)
})

// @desc  Get required data for the pie chart
// @route GET /api/charts/pie
export const getPieChartData = asyncHandler(async (req: Request, res: Response) => {
  // const user_id = req.user.id;
  const user_id = 1

  const monthlyTasks = await fetchTasksByUserId(user_id, "monthly");
  const weeklyTasks = await fetchTasksByUserId(user_id, "weekly");

  const { series: monthlySeries } = getDailyWorkingHours(monthlyTasks);
  const { series: weeklySeries } = getDailyWorkingHours(weeklyTasks);


  const weeklyHours = weeklySeries.reduce((series, val) => {
    return series + val
  }, 0)

  const monthlyHours = monthlySeries.reduce((series, val) => {
    return series + val
  }, 0)

  const successResponse: SuccessResponse<PieChartResponse> = {
    status: StatusCodes.OK,
    success: true,
    data: {
      weeklyHours,
      monthlyHours
    }
  }

  res.status(StatusCodes.OK).json(successResponse)
})