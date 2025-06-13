import { z } from "zod";

export const UserRegisterFormValidation = z.object({
  firstname: z
    .string()
    .min(2, "Firstname must be at least 2 characters.")
    .max(50, "Firstname must be at most 50 characters"),
  lastname: z
    .string()
    .min(2, "Lastname must be at least 2 characters.")
    .max(50, "Lastname must be at most 50 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const UserLoginFormValidation = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
