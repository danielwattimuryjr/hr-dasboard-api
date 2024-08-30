import { getDailyWorkingHours } from "../controller/chart-controller";
import TaskService from "./task.service";

class ChartService {
  static GET_DATA = async (employee_id: number, chart_type: 'pie' | 'bar') => {
    switch (chart_type) {
      case 'pie':
        return this.PIE_CHART(employee_id)
      case 'bar':
        return this.BAR_CHART(employee_id)
    }
  }

  private static PIE_CHART = async (employee_id: number) => {
    const [monthlyTasks, weeklyTasks] = await Promise.all([
      TaskService.GET_BY_EMPLOYEE_ID(employee_id, "monthly"),
      TaskService.GET_BY_EMPLOYEE_ID(employee_id, "weekly")
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

  private static BAR_CHART = async (employee_id: number) => {
    const tasks = await TaskService.GET_BY_EMPLOYEE_ID(employee_id, "weekly")

    const { series, option } = getDailyWorkingHours(tasks);

    return {
      option,
      series
    }
  }
}

export default ChartService