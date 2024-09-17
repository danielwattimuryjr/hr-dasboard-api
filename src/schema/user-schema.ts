import { z } from "zod"

export const CreateUserSchema = z.object({
  email: z.string({ message: "The email field is required" })
    .email({ message: "Please provide a valid email address" })
    .min(1, { message: "The email field cannot be empty" })
    .max(100, { message: "The email address cannot exceed 100 characters" }),

  password: z.string({ message: "The password field is required" })
    .min(1, { message: "The password field cannot be empty" })
    .max(100, { message: "The password cannot exceed 100 characters" }),

  name: z.string({ message: "The full name field is required" })
    .min(1, { message: "The full name field cannot be empty" })
    .max(100, { message: "The full name cannot exceed 100 characters" }),

  role_id: z.number({ message: "The role ID field is required" })
    .min(1, { message: "Role ID must be at least 1" }),

  phone: z.string({ message: "The phone field is required" }),

  level: z.enum(['hr', 'employee', 'lead'], { message: "The value you provide is not acceptable" }),

  team_id: z.number({ message: 'The team ID field is required' })
    .min(1, { message: "Team ID must be at least 1" })
});

export const UpdateUserSchema = z.object({
  id: z.number({ message: "The ID is required" }),
  email: z.string({ message: "The email field is required" })
    .email({ message: "Please provide a valid email address" })
    .min(1, { message: "The email field cannot be empty" })
    .max(100, { message: "The email address cannot exceed 100 characters" }),
  name: z.string({ message: "The full name field is required" })
    .min(1, { message: "The full name field cannot be empty" })
    .max(100, { message: "The full name cannot exceed 100 characters" }),
  phone: z.string({ message: "The phone field is required" })
    .min(1, { message: "The username field cannot be empty" })
    .max(100, { message: "The username cannot exceed 100 characters" }),
  level: z.enum(['hr', 'employee', 'lead'], {
    message: "Only accept hr/employee/lead!"
  }),
  role_id: z.number({ message: "The role ID field is required" })
    .min(1, { message: "Role ID must be at least 1" }),
  team_id: z.number({ message: 'The team ID field is required' })
    .min(1, { message: "Team ID must be at least 1" })
});