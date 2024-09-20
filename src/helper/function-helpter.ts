import slugify from "slugify"
import { Task } from "../types";

const transformText = (text: string): string => {
  return slugify(text, {
    lower: true,
    trim: true
  })
}

function isEmptyObject(obj: Record<string, any>): boolean {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
export const getDailyWorkingHours = (tasks: Task[], type: 'bar' | 'pie') => {
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
  let series
  switch (type) {
    case "bar":
      series = option.map(date => dailyHours[date] - 8);
      break;
    default:
      series = series = option.map(date => dailyHours[date]);
      break;
  }

  return { option, series }
}

const calculateWorkingHours = (start: Date, end: Date): number => {
  // if (start >= end) {
  //   throw new Error('End time must be after start time');
  // }

  const differenceInMilliseconds = end.getTime() - start.getTime();
  function isEmptyObject(obj: Record<string, any>): boolean {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

  return differenceInHours;
};


export { transformText, isEmptyObject }