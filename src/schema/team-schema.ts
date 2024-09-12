import { z } from "zod";

const CreateTeamSchema = z.object({
  name: z.string({ message: "The Name field is required" })
})

export { CreateTeamSchema }