import api from './api'
import type { Category } from '../types/api.types'

type CategoriesResponse = {
  data: Category[]
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export const categoriesService = {
  getAll: async (): Promise<Category[]> => {
    const res = await api.get<CategoriesResponse>('/categories')
    return res.data.data
  },

  getById: async (id: number): Promise<Category> => {
    const res = await api.get<{ data: Category }>(`/categories/${id}`)
    return res.data.data
  },

  create: async (payload: Omit<Category, 'id'>): Promise<Category> => {
  const res = await api.post<{ message: string; category: Category }>('/categories', payload)
  return res.data.category
},

  update: async (
    id: number,
    payload: Partial<Omit<Category, 'id'>>
  ): Promise<Category> => {
    const res = await api.put<{ data: Category }>(
      `/categories/${id}`,
      payload
    )
    return res.data.data
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/categories/${id}`)
  },
}
