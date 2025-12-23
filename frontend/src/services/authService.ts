import api from './api'
import type { User } from '@/stores/authStore'

export const authService = {
  login: async (email: string, password: string) => {
    const res = await api.post('/api/auth/login', { email, password })
    return res.data as { user: User; tokens: { accessToken: string } }
  },
}
