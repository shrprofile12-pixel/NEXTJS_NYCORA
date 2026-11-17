import { z } from 'zod'

// 1. Sign In Schema (Purana authSchema hi hai, naam wahi rakha hai taaki Sign In page na toote)
export const authSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
    
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one symbol" }),
})

export type AuthFormValues = z.infer<typeof authSchema>

// 2. Sign Up Schema (Naya schema aapke Sign Up form ke liye)
export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
    
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
    
  email: z
    .string()
    .email({ message: "Please enter a valid email address" }),
    
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one symbol" }),
})

export type SignUpFormValues = z.infer<typeof signUpSchema>

// 3. Reusable Try-Catch Logic / Server Action (Sign In ke liye)
export async function handleCredentialsLogin(data: AuthFormValues) {
  try {
    const validatedData = authSchema.parse(data)
    console.log("Validated & Safe Data:", validatedData)
    return { success: true, message: "Successfully processed!" }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors }
    }
    return { success: false, message: "An unexpected error occurred." }
  }
}