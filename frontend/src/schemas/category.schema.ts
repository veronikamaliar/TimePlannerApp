import { z } from 'zod'

export const categorySchema = z.object({
  name: z.string().min(2, 'Мінімум 2 символи'),
})
export type CategoryFormData = z.infer<typeof categorySchema>