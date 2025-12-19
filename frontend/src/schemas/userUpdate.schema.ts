import { z } from 'zod'

export const userUpdateSchema = z.object({
  name: z.string().min(2, "Ім'я має містити мінімум 2 символи"),
  email: z.string().email('Невірний формат email'),
  birthDate: z.string().optional(),
})

export type UserUpdateFormData = z.infer<typeof userUpdateSchema>
