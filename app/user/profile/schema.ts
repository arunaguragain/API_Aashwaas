import z from "zod";

// Password schema - optional but must meet requirements if provided
const optionalPasswordSchema = z
  .string()
  .optional()
  .refine(
    (val) => {
      // If empty or undefined, it's valid (optional)
      if (!val || val === "") return true;
      // If provided, must be at least 8 characters
      return val.length >= 8;
    },
    { message: "Password must be at least 8 characters" }
  )
  .refine(
    (val) => {
      if (!val || val === "") return true;
      return /[A-Z]/.test(val);
    },
    { message: "Must include at least one uppercase letter" }
  )
  .refine(
    (val) => {
      if (!val || val === "") return true;
      return /[a-z]/.test(val);
    },
    { message: "Must include at least one lowercase letter" }
  )
  .refine(
    (val) => {
      if (!val || val === "") return true;
      return /[0-9]/.test(val);
    },
    { message: "Must include at least one number" }
  );

export const updateProfileSchema = z
  .object({
    name: z.string().min(2, { message: "Enter your full name" }),
    email: z.string().email({ message: "Enter a valid email" }),
    phone: z.string().min(10, { message: "Enter a valid phone number" }),
    password: optionalPasswordSchema,
    confirmPassword: z.string().optional(),
    image: z.instanceof(File).optional(),
  })
  .refine(
    (data) => {
      // Only validate password match if password is provided
      if (data.password && data.password !== "") {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }
  );

export type UpdateProfileData = z.infer<typeof updateProfileSchema>;
