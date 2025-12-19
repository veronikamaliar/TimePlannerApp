import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Category } from '@/types/category'
import api from '@/services/api'

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>([])
  const currentCategory = ref<Category | null>(null)

  const searchQuery = ref('')
  const loading = ref(false)
  const error = ref<string | null>(null)

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  const filteredCategories = computed(() => {
    if (!searchQuery.value) return categories.value
    return categories.value.filter(cat =>
      cat.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })

  const fetchCategories = async () => {
    loading.value = true
    error.value = null

    try {
      const res = await api.get('/categories')
      console.log('CATEGORIES RESPONSE:', res.data)

      if (Array.isArray(res.data.data)) {
        categories.value = res.data.data
      } else {
        categories.value = []
        console.warn('Невідома структура відповіді', res.data)
      }
    } catch (err) {
      error.value = 'Помилка завантаження категорій'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const fetchCategoryById = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const res = await api.get(`/categories/${id}`)
      currentCategory.value = res.data
    } catch (err) {
      error.value = 'Помилка завантаження категорії'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const createCategory = async (payload: { name: string }) => {
    loading.value = true
    error.value = null

    try {
      const res = await api.post('/categories', payload)

      if (res.data?.category) {
        categories.value.push(res.data.category)
      } else {
  
        await fetchCategories()
      }
    } catch (err) {
      error.value = 'Помилка створення категорії'
      console.error(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateCategory = async (
    id: number,
    payload: { name: string }
  ) => {
    loading.value = true
    error.value = null

    try {
      const res = await api.put(`/categories/${id}`, payload)

      const updated = res.data?.category ?? res.data

      const index = categories.value.findIndex(c => c.id === id)
      if (index !== -1) {
        categories.value[index] = updated
      }
    } catch (err) {
      error.value = 'Помилка оновлення категорії'
      console.error(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteCategory = async (id: number) => {
    try {
      await api.delete(`/categories/${id}`)
      categories.value = categories.value.filter(c => c.id !== id)
    } catch (err: any) {
      if (err.response?.status === 400) {
        alert('Ця категорія містить задачі і не може бути видалена!')
      } else {
        console.error('Помилка видалення категорії', err)
        alert('Помилка видалення категорії')
      }
      throw err
    }
  }

  const clearCurrentCategory = () => {
    currentCategory.value = null
  }

  return {
    
    categories,
    currentCategory,
    searchQuery,
    loading,
    error,
    filteredCategories,
    setSearchQuery,
    fetchCategories,
    fetchCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    clearCurrentCategory,
  }
})
