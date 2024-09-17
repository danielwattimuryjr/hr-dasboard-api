import { z } from "zod";

const CreateTeamSchema = z.object({
  name: z.string({ message: "The Name field is required" })
})

const UpdateTeamSchema = z.object({
  id: z.number({ message: "The ID field is required" }),
  name: z.string({ message: "The Name field is required" })
})

export { CreateTeamSchema, UpdateTeamSchema }