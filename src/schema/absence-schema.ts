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
  is_approved: z.boolean({ message: "Type not match!! The only accepted value are 'approved' and 'declined'" }),
  reason: z.string().optional(),
}).refine(data => {
  if (!data.is_approved && (!data.reason || data.reason.trim() === '')) {
    return false;
  }
  return true;
}, {
  message: "Reason is required when is_approved is 'declined'",
  path: ["reason"],
});


export { absenceSchema, absenceApprovalSchema };