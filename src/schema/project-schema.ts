import { z } from "zod";

export const CreateProjectSchema = z.object({
  project_name: z.string({ message: 'The Project Name field is required' })
})

export const UpdateProjectSchema = z.object({
  id: z.number({ message: 'The ID field is required' })
    .min(1, { message: 'The value cannot be less than 1' }),
  project_name: z.string({ message: 'The Project Name field is required' })
})