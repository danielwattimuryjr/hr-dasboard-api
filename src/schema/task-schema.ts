import { z } from "zod";

const taskItemSchema = z.object({
  project_id: z.number()
    .min(1, { message: "Project name is required" }),
  task: z.string()
    .min(1, { message: "Description is required" }),
  start: z.string()
    .min(1, { message: "Start time is required" }),
  end: z.string()
    .min(1, { message: "End time is required" }),
});

export const taskDataSchema = z.object({
  data: z.array(taskItemSchema)
    .min(1, { message: "At least one task item is required" }),
});