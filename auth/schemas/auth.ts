import { z } from 'zod'
import { genres } from '@/lib/genre'

const emailSchema = z.string().email({ message: 'Ingrese un email válido' })
const passwordSchema = z.string()
    .min(3, { message: 'Ingrese más de 3 caracteres' })
    .max(30, { message: 'Ingrese menos de 30 caracteres' })

export const signInFormSchema = z.object({
    email: emailSchema,
    password: passwordSchema
})

export const signUpFormSchema = z.object({
    name:         z.string().min(3),
    surname:      z.string().min(3),
    email:        emailSchema,
    password:     passwordSchema,
    dayOfBirth:   z.number().min(1, { message: 'Enter a valid day' }).max(31, { message: 'Enter a valid day' }),
    monthOfBirth: z.number().min(1).max(12),
    yearOfBirth:  z.number().min(1900, { message: 'Enter a valid year' }).max(new Date().getFullYear(), { message: 'Enter a valid year' }),
    genre:        genres,
})

export type SignInForm = z.infer<typeof signInFormSchema>
export type SignUpForm = z.infer<typeof signUpFormSchema>