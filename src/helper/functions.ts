import { query } from "../libs/pg";
import { Period, Task } from "../types";

// @desc Calculate total working of hours of given time
const calculateWorkingHours = (start: Date, end: Date): number => {
  if (start >= end) {
    throw new Error('End time must be after start time');
  }

  const differenceInMilliseconds = end.getTime() - start.getTime();

  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

  return differenceInHours;
};

// @desc Extract full date from timestamp
const getFullDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export const getDailyWorkingHours = (tasks: Task[]) => {
  const dailyHours: { [key: string]: number } = {};

  tasks.forEach((task) => {
    const date = getFullDate(task.start);
    if (!dailyHours[date]) {
      dailyHours[date] = 0;
    }
    dailyHours[date] += calculateWorkingHours(task.start, task.end);
  });

  const option = Object.keys(dailyHours).sort();
  const series = option.map(date => dailyHours[date]);

  return { option, series }
}

export const fetchTasksByUserId = async (userId: number, period: Period = null) => {
  let filterByPeriodStr: string = ''

  switch (period) {
    case "weekly":
      filterByPeriodStr = `AND start >= date_trunc('week', current_timestamp) AND start < date_trunc('week', current_timestamp) + interval '1 week'`;
      break;
    case "monthly":
      filterByPeriodStr = `AND start >= date_trunc('month', current_timestamp) AND start < date_trunc('month', current_timestamp) + interval '1 month'`
      break;
    default:
      break;
  }

  const queryStr = `
    SELECT * FROM tasks 
    WHERE user_id=$1 
    ${filterByPeriodStr}
    ORDER BY start, "end" ASC`

  const taskResult = await query<Task>(queryStr, [userId]);

  return taskResult?.rows ?? [];
};