import z from "zod";

export const createUserSchema = z.object({
    name: z
      .string()
      .trim()
      .min(3, "Name must contain at least 3 characters")
      .max(50, "Name cannot exceed 50 characters"),


    email: z
      .email("Email format is invalid")
      .toLowerCase(),
});


export const updateUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3)
    .max(50)
    .optional(),

  email: z
    .email()
    .toLowerCase()
    .optional(),
});