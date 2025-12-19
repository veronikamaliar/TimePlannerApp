import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .email('Некоректний email'),
  password: z
    .string()
    .min(6, 'Мінімум 6 символів'),
})

export type LoginFormData = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Ім'я обовʼязкове"),
  email: z
    .string()
    .email('Некоректний email'),
  password: z
    .string()
    .min(6, 'Мінімум 6 символів'),
  confirmPassword: z
    .string()
    .min(6),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Паролі не співпадають',
    path: ['confirmPassword'],
  }
)

export type RegisterFormData = z.infer<typeof registerSchema>
