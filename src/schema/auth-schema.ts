import { z, ZodType } from "zod";

export const userRegistrationSchema = z.object({
  email: z.string()
    .min(1, { message: "Email is required" })
    .max(100, { message: "Email must not exceed 100 characters" })
    .email({ message: "Invalid email format" }),
  password: z.string()
    .min(1, { message: "Password is required" })
    .max(100, { message: "Password must not exceed 100 characters" }),
  full_name: z.string()
    .min(1, { message: "Full name is required" })
    .max(100, { message: "Full name must not exceed 100 characters" }),
  username: z.string()
    .min(1, { message: "Username is required" })
    .max(100, { message: "Username must not exceed 100 characters" }),
})

export const loginSchema = z.object({
  email: z.string()
    .min(1, { message: "Email is required" })
    .max(100, { message: "Email must not exceed 100 characters" })
    .email({ message: "Invalid email format" }),
  password: z.string()
    .min(1, { message: "Password is required" })
    .max(100, { message: "Password must not exceed 100 characters" }),
})