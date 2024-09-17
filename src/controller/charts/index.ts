import { Request, Response } from "express"
import { ErrorResponse, SuccessResponse } from "../../types"
import { asyncHandler } from "../../helper/async-helper"
import ChartService from "../../services/chart-service"

type ChartRequest = Request<{ model?: 'bar' | 'pie' }>
type ChartResponse<TData> = Response<SuccessResponse<TData> | ErrorResponse>
type PieChartResponse = {
  weeklyHours: number;
  monthlyHours: number;
}
type BarChartResponse = {
  series: number[],
  option: string[]
}

class ChartController {
  static GET = asyncHandler(async (req: ChartRequest, res: ChartResponse<PieChartResponse | BarChartResponse>) => {
    const user_id = req.user?.id;
    const model = req.params.model;

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
        res.status(400).json({
          status: 400,
          message: 'Invalid chart model specified'
        } as ErrorResponse);
        return;
    }

    res.status(200).json({
      status: 200,
      success: true,
      data: responseData
    })
  })
}

export default ChartController