import { z } from "zod";

const registerFormSchema = z.object({
  firstname: z
    .string()
    .min(3, { message: "Firstname must be at least 3 characters" }),
  lastname: z
    .string()
    .min(3, { message: "Lastname must be at least 3 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export default registerFormSchema;
