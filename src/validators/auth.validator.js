import { z } from "zod"

export const loginSchema = z.object({
    email: z
       .email()
       .lowercase(),
    
    password: z
        .string()
        .min(4, "password is required"),
})