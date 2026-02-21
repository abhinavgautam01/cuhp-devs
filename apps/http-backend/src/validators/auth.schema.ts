import { z } from "zod";

export const signupSchema = z.object({
    fullName: z.string()
    .trim()
    .min(3, "Full name must be atleast 3 characters")
    .max(50, "Full name is too long")
    .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"),

    email: z.string()
    .trim()
    .email("Invalid email address"),

    // can update length according to need..!
    studentId: z.string()
    .trim()
    .length(11, "Student ID must be exactly 11 characters")
    .optional(),

    password: z.string()
    .trim()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password is too long"),
}).strict();

export const signinSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().trim().min(8, "Password must be at least 8 characters long"),
}).strict();