import api from './api'
import type { Task } from '../types/api.types'

export const tasksService = {
  getAll: async () => (await api.get<Task[]>('/tasks')).data,
  getById: async (id: number) => (await api.get<Task>(`/tasks/${id}`)).data,
  create: async (task: Omit<Task, 'id'>) => (await api.post<Task>('/tasks', task)).data,
  update: async (id: number, task: Partial<Task>) => (await api.put<Task>(`/tasks/${id}`, task)).data,
  delete: async (id: number) => await api.delete(`/tasks/${id}`),
}
