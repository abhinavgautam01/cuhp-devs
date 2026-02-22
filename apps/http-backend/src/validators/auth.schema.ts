import { z } from "zod";

export const signupSchema = z.object({
    fullName: z.string()
    .min(3, "Full name must be atleast 3 characters")
    .max(50, "Full name is too long")
    .regex(/^[a-zA-Z][a-zA-Z\s.'-]*$/, "Full name contains invalid characters"),

    email: z.string()
    .email("Invalid email address"),

    studentId: z.preprocess(
      (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
      z.string()
        .trim()
        .min(4, "Student ID must be at least 4 characters")
        .max(30, "Student ID is too long")
        .optional()
    ),

    password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password is too long"),
});
