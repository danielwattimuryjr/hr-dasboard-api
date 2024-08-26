import { z } from "zod";

const absenceSchema = z.object({
  user_id: z.number().min(1, { message: "User ID is required" }),
  date: z.string()
    .min(1, { message: "Start time is required" }),
  type: z.enum([
    'WFH', 'AL', 'SL'
  ], { message: "Type not match!! The only accepted value are 'WFH', 'AL', 'SL'" })
})

export { absenceSchema };