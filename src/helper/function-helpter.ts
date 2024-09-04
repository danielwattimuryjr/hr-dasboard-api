import { Task } from "../types";

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