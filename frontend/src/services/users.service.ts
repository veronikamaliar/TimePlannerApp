import api from './api'
import type { User } from '../types/api.types'

export const usersService = {
  getAll: async () => {
    const response = await api.get<User[]>('/users')
    return response.data
  },

  getById: async (id: number) => {
    const response = await api.get<User>(`/users/${id}`)
    return response.data
  },

  create: async (data: Omit<User, 'id'>) => {
    const response = await api.post<User>('/users', data)
    return response.data
  },

  update: async (id: number, data: Partial<User>) => {
    const response = await api.put<User>(`/users/${id}`, data)
    return response.data
  },

  delete: async (id: number) => {
    await api.delete(`/users/${id}`)
  },
}
