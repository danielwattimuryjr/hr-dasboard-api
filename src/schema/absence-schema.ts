import { z } from "zod";

const absenceSchema = z.object({
  user_id: z.number({ message: "the User ID field is required" })
    .min(1, { message: "The User ID cannot less then 1" }),
  date: z.string({ message: "the Date field is required" }),
  type: z.enum([
    'WFH', 'AL', 'SL'
  ], { message: "Type not match!! The only accepted value are 'WFH', 'AL', 'SL'" })
})

const absenceApprovalSchema = z.object({
  id: z.number({ message: "The ID field is required" }),
  is_approved: z.boolean({ message: "The approval field is required" }),
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