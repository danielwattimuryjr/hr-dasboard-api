import { z } from "zod";

const absenceSchema = z.object({
  user_id: z.number().min(1, { message: "User ID is required" }),
  date: z.string()
    .min(1, { message: "Start time is required" }),
  type: z.enum([
    'WFH', 'AL', 'SL'
  ], { message: "Type not match!! The only accepted value are 'WFH', 'AL', 'SL'" })
})

const absenceApprovalSchema = z.object({
  isApproved: z.boolean({
    required_error: "The isApproved is required",
    message: "isApproved Only accept boolean value"
  })
})

export { absenceSchema, absenceApprovalSchema };