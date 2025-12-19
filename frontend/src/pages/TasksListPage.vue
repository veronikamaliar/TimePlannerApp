<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'
import Button from '@/components/common/Button.vue'
import Input from '@/components/common/Input.vue'
import { useRouter } from 'vue-router'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import socketService from '@/services/socket.service'

const tasksStore = useTasksStore()
const router = useRouter()

onMounted(() => {
  tasksStore.fetchTasks()
})

const displayedTasks = computed(() => tasksStore.filteredTasks)

const addTask = () => router.push('/dashboard/tasks/create')
const editTask = (id: number) =>
  router.push(`/dashboard/tasks/update/${id}`)

const onSearchChange = (value: string) => {
  tasksStore.setSearchQuery(value)
}

const onCreated = (task: any) => {
  tasksStore.createTask(task)
}

const onUpdated = (task: any) => {
  tasksStore.updateTask(task.id, task)
}

const onDeleted = (id: number) => {
  tasksStore.deleteTask(id)
}

onMounted(() => {
  socketService.on('task:created', onCreated)
  socketService.on('task:updated', onUpdated)
  socketService.on('task:deleted', onDeleted)
})

onUnmounted(() => {
  socketService.off('task:created', onCreated)
  socketService.off('task:updated', onUpdated)
  socketService.off('task:deleted', onDeleted)
})
</script>


<template>
    <ErrorMessage v-if="tasksStore.error" :message="tasksStore.error" />
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Завдання</h1>
      <Button variant="primary" @click="addTask">Додати завдання</Button>
    </div>

<Input
      v-model="tasksStore.searchQuery"
      placeholder="Пошук завдань..."
      @input="onSearchChange(tasksStore.searchQuery)"
      class="mb-4 max-w-sm"
    />

    <div v-if="tasksStore.loading">Завантаження...</div>
    <div v-else-if="tasksStore.error" class="text-red-500">
      {{ tasksStore.error }}
    </div>

    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-50">
  <tr>
    <th class="px-4 py-2 text-left border-r border-gray-200 whitespace-nowrap">Назва</th>
    <th class="px-4 py-2 text-left border-r border-gray-200 whitespace-nowrap">Опис</th>
    <th class="px-4 py-2 text-left border-r border-gray-200 whitespace-nowrap">Пріоритет</th>
    <th class="px-4 py-2 text-left border-r border-gray-200 whitespace-nowrap">Дата виконання</th>
    <th class="px-4 py-2 text-left border-r border-gray-200 whitespace-nowrap">Виконано</th>
    <th class="px-4 py-2 text-left border-r border-gray-200 whitespace-nowrap">Витрачений час</th>
    <th class="px-4 py-2 text-left border-r border-gray-200 whitespace-nowrap">Вкладення</th>
    <th class="px-4 py-2 text-left border-r border-gray-200 whitespace-nowrap">Категорія</th>
    <th class="px-4 py-2 text-right border-r border-gray-200 whitespace-nowrap">Дії</th>
  </tr>
</thead>

        <tbody>
          <tr
            v-for="task in displayedTasks"
            :key="task.id"
            class="border-t"
          >
            <td class="px-4 py-2 border-r border-gray-200">{{ task.title }}</td>
            <td class="px-4 py-2 border-r border-gray-200">{{ task.description }}</td>
            <td class="px-4 py-2 border-r border-gray-200" >{{ task.priority }}</td>
            <td class="px-4 py-2 border-r border-gray-200">{{ task.dueDate }}</td>
            <td class="px-4 py-2 border-r border-gray-200">{{ task.completed ? 'Yes' : 'No' }}</td>
            <td class="px-4 py-2 border-r border-gray-200">{{ task.timeSpent }}</td>
            <td class="px-4 py-2 border-r border-gray-200">{{ task.attachment || '—' }}</td>
            <td class="px-4 py-2 border-r border-gray-200">{{ task.category?.name || '—' }}</td>
            <td class="px-4 py-2 border-r border-gray-200 text-right space-x-2">
              <Button class="my-1" size="sm" variant="secondary" @click="editTask(task.id)">
                Редагувати
              </Button>
              <Button
  size="sm"
  variant="danger"
  @click="() => { tasksStore.deleteTask(task.id) }"
>
  Видалити
</Button>

            </td>
          </tr>

          <tr v-if="displayedTasks.length === 0">
  <td colspan="9" class="px-4 py-6 text-center text-gray-500">
    Завдань не знайдено
  </td>
</tr>

        </tbody>
      </table>
    </div>
  </div>
</template>
