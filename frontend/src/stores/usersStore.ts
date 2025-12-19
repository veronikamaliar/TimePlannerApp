import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'
import type { User } from '@/types/user'

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const searchQuery = ref('')
  const loading = ref(false)
  const error = ref<string | null>(null)

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  
  const filteredUsers = computed(() => {
    if (!searchQuery.value) return users.value

    return users.value.filter(user =>
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })

  const fetchUsers = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/users')
      users.value = response.data.data ?? response.data.users ?? response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Помилка завантаження користувачів'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const getUserById = (id: number) => {
  return users.value.find(u => u.id === id) || null
}

  const createUser = async (newUser: Omit<User, 'id'>) => {
    loading.value = true
    error.value = null
    try {
      const res = await api.post('/users', newUser)
      users.value.push(res.data)
      return res.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Помилка створення користувача'
      console.error('Create user error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateUser = async (id: number, updatedUser: Partial<Omit<User, 'id'>>) => {
    loading.value = true
    error.value = null
    try {
      const res = await api.put(`/users/${id}`, updatedUser)
      const index = users.value.findIndex(u => u.id === id)
      if (index !== -1) users.value[index] = res.data
      return res.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Помилка оновлення користувача'
      console.error('Update user error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteUser = async (id: number) => {
    if (!id) {
      console.error('deleteUser отримав undefined id')
      return
    }

    loading.value = true
    error.value = null
    try {
      await api.delete(`/users/${id}`)
      users.value = users.value.filter(u => u.id !== id)
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Помилка видалення користувача'
      console.error('Delete user error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    searchQuery,
    filteredUsers,
    loading,
    error,
    setSearchQuery,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById 
  }
})
