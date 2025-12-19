import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Task } from '@/types/task'
import api from '@/services/api'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const searchQuery = ref('')

  const fetchTasks = async () => {
    loading.value = true
    error.value = null

    try {
      const res = await api.get('/tasks')
      tasks.value = res.data.data ?? []
    } catch (err: any) {
      console.error('Fetch tasks error:', err)
      error.value = 'Помилка завантаження задач'
    } finally {
      loading.value = false
    }
  }

  const fetchTaskById = async (id: number) => {
  try {
    const res = await api.get(`/tasks/${id}`)
    return res.data
  } catch (err) {
    console.error('Fetch task by id error:', err)
    return null
  }
}

  const createTask = async (task: Omit<Task, 'id'>) => {
    try {
      console.log('Відправляємо на сервер:', task)

      const res = await api.post('/tasks', task)

      tasks.value.unshift(res.data.task)

      return res.data.task
    } catch (err: any) {
      console.error('Create task error:', err)
      error.value = err.response?.data?.error || 'Помилка створення задачі'
      throw err
    }
  }

  const updateTask = async (id: number, payload: Partial<Task>) => {
    try {
      const res = await api.put(`/tasks/${id}`, payload)
      const index = tasks.value.findIndex(t => t.id === id)
      if (index !== -1) tasks.value[index] = res.data
      return res.data
    } catch (err: any) {
      console.error('Update task error:', err)
      throw err
    }
  }

  const deleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`)
      tasks.value = tasks.value.filter(t => t.id !== id)
    } catch (err: any) {
      console.error('Delete task error:', err)
      throw err
    }
  }

  const filteredTasks = computed(() => {
    if (!searchQuery.value) return tasks.value

    return tasks.value.filter(t =>
      t.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      t.description?.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })

  return {
    tasks,
    filteredTasks,
    loading,
    error,
    searchQuery,
    fetchTasks,
    fetchTaskById,
    createTask,
    updateTask,
    deleteTask,
  }
})
