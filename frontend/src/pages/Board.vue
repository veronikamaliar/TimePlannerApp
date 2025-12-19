<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import axios from '@/services/api'
import StatCard from '@/components/common/StatCard.vue'

const loading = ref(false)
const error = ref('')

const stats = reactive({
  users: 0,
  tasks: 0,
  categories: 0,
  completedTasks: 0,
  pendingTasks: 0,
  overdueTasks: 0,
  todayTasks: 0,
})

const fetchDashboardStats = async () => {
  try {
    loading.value = true

    const token = localStorage.getItem('token')
    if (!token) {
      error.value = 'Ви не авторизовані'
      return
    }

    console.log('Token:', token)

    const { data } = await axios.get('/admin/dashboard', {
  headers: {
    Authorization: `Bearer ${token}`
  }
})

    console.log('Dashboard data:', data)
    Object.assign(stats, data)
  } catch (err) {
    error.value = 'Не вдалося завантажити статистику'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchDashboardStats)
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard title="Користувачі" :value="stats.users" />
      <StatCard title="Всі завдання" :value="stats.tasks" />
      <StatCard title="Категорії" :value="stats.categories" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard title="Виконані" :value="stats.completedTasks" />
      <StatCard title="Невиконані" :value="stats.pendingTasks" />
      <StatCard title="Прострочені" :value="stats.overdueTasks" />
      <StatCard title="На сьогодні" :value="stats.todayTasks" />
    </div>

    <div v-if="loading" class="text-gray-500">
      Завантаження даних...
    </div>

    <div v-if="error" class="text-red-500">
      {{ error }}
    </div>
  </div>
</template>
