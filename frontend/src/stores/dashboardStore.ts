import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useDashboardStore = defineStore('dashboard', () => {
  const usersCount = ref(0)
  const tasksCount = ref(0)
  const categoriesCount = ref(0)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchStats = async () => {
    loading.value = true
    error.value = null

    try {
      const [usersRes, tasksRes, categoriesRes] = await Promise.all([
        api.get('/users'),
        api.get('/tasks'),
        api.get('/categories'),
      ])

      usersCount.value = usersRes.data.data.length
      tasksCount.value = tasksRes.data.data.length
      categoriesCount.value = categoriesRes.data.data.length

    } catch (e) {
      error.value = 'Помилка завантаження статистики'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  return {
    usersCount,
    tasksCount,
    categoriesCount,
    fetchStats,
    loading,
    error,
  }
})
