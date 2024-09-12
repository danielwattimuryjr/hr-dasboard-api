import { z } from "zod";

export const CreateRoleSchema = z.object({
  display_name: z.string({ message: 'The Display Name field is required' })
})

export const UpdateRoleSchema = z.object({
  id: z.number({ message: 'The ID field is required' }),
  display_name: z.string({ message: 'The Display Name field is required' })
})