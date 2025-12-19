<script setup lang="ts">
import { onMounted, onUnmounted, computed, watch, ref } from 'vue'
import { useCategoriesStore } from '@/stores/categoriesStore'
import Button from '@/components/common/Button.vue'
import Input from '@/components/common/Input.vue'
import { useRouter } from 'vue-router'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import socketService from '@/services/socket.service'

const categoriesStore = useCategoriesStore()
const router = useRouter()

const searchQuery = ref('')

onMounted(() => {
  categoriesStore.fetchCategories()
})

watch(searchQuery, value => {
  categoriesStore.setSearchQuery(value)
})

const displayedCategories = computed(() => categoriesStore.filteredCategories)

const addCategory = () => {
  router.push('/dashboard/categories/create')
}

const editCategory = (id: number) => {
  router.push(`/dashboard/categories/update/${id}`)
}

const deleteCategory = async (id: number) => {
  if (confirm('Ви впевнені, що хочете видалити категорію?')) {
    await categoriesStore.deleteCategory(id)
  }
}

const onCreated = (task: any) => {
  categoriesStore.createCategory(task)
}

const onUpdated = (task: any) => {
  categoriesStore.updateCategory(task.id, task)
}

const onDeleted = (id: number) => {
  categoriesStore.deleteCategory(id)
}

onMounted(() => {
  socketService.on('category:created', onCreated)
  socketService.on('category:updated', onUpdated)
  socketService.on('category:deleted', onDeleted)
})

onUnmounted(() => {
  socketService.off('category:created', onCreated)
  socketService.off('category:updated', onUpdated)
  socketService.off('category:deleted', onDeleted)
})
</script>

<template>
    <ErrorMessage :message="categoriesStore.error ?? undefined" />
  <div class="max-w-4xl mx-auto p-6">
    
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Категорії</h1>
      <Button variant="primary" @click="addCategory">
        Додати категорію
      </Button>
    </div>

    <Input
      v-model="searchQuery"
      type="text"
      placeholder="Пошук категорії..."
      class="mb-4 max-w-sm"
    />

    <div v-if="categoriesStore.loading" class="text-center py-6">
      Завантаження...
    </div>

    <div v-if="categoriesStore.error" class="text-red-500 mb-4">
      {{ categoriesStore.error }}
    </div>

    <table
      v-if="!categoriesStore.loading"
      class="min-w-full text-sm bg-white rounded-lg shadow"
    >
      <thead class="bg-gray-50">
        <tr>
          <th class="px-4 py-2 text-left">Назва</th>
          <th class="px-4 py-2 text-right">Дії</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="cat in displayedCategories"
          :key="cat.id"
          class="border-t"
        >
          <td class="px-4 py-2">{{ cat.name }}</td>
          <td class="px-4 py-2 text-right space-x-2">
            <Button size="sm" variant="secondary" @click="editCategory(cat.id)">
              Редагувати
            </Button>
            <Button size="sm" variant="danger" @click="deleteCategory(cat.id)">
              Видалити
            </Button>
          </td>
        </tr>

        <tr v-if="displayedCategories.length === 0">
          <td colspan="3" class="text-center py-4 text-gray-500">
            Категорій не знайдено
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
