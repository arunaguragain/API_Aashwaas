import z from "zod";

const passwordSchema = z
  .string()
  .min(8, {message :"Password must be at least 8 characters"})
  .regex(/[A-Z]/, {message: "Must include at least one uppercase letter"})
  .regex(/[a-z]/, {message:"Must include at least one lowercase letter"})
  .regex(/[0-9]/, {message:"Must include at least one number"});

export const loginSchema = z.object({
    email:z.email({ message: "Enter a valid email" }),
    password: passwordSchema
});
export type LoginData = z.infer<typeof loginSchema>;


export const registerSchema = z.object({
    name: z.string().min(2, { message: "Enter your full name" }),
    email: z.email({ message: "Enter a valid email" }),
    password: passwordSchema,
    confirmPassword: z.string(),
}).refine((v) => v.password === v.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
});

export type RegisterData = z.infer<typeof registerSchema>;