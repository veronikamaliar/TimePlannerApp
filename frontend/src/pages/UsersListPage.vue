<script setup lang="ts">
import { onMounted, onUnmounted, computed, watch } from 'vue'
import { useUsersStore } from '@/stores/usersStore'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router' 
import Input from '@/components/common/Input.vue'
import Button from '@/components/common/Button.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import socketService from '@/services/socket.service'

const usersStore = useUsersStore()
const authStore = useAuthStore()
const router = useRouter() 


watch(
  () => authStore.token,
  (newToken: string | null) => {
    if (newToken) {
      usersStore.fetchUsers()
    }
  },
  { immediate: true } 
)

const displayedUsers = computed(() => usersStore.filteredUsers)

const editUser = (id: number) => router.push(`/dashboard/users/update/${id}`)

const onSearchChange = (value: string) => {
  usersStore.setSearchQuery(value)
}

const onCreated = (task: any) => {
  usersStore.createUser(task)
}

const onUpdated = (task: any) => {
  usersStore.updateUser(task.id, task)
}

const onDeleted = (id: number) => {
  usersStore.deleteUser(id)
}

onMounted(() => {
  socketService.on('user:created', onCreated)
  socketService.on('user:updated', onUpdated)
  socketService.on('user:deleted', onDeleted)
})

onUnmounted(() => {
  socketService.off('user:created', onCreated)
  socketService.off('user:updated', onUpdated)
  socketService.off('user:deleted', onDeleted)
})

</script>


<template>
    <ErrorMessage :message="usersStore.error ?? undefined" />
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Користувачі</h1>
    </div>

    <Input
      v-model="usersStore.searchQuery"
      placeholder="Пошук користувачів..."
      @input="onSearchChange(usersStore.searchQuery)"
      class="mb-4 max-w-sm"
    />

    <div v-if="usersStore.loading">Завантаження...</div>

    <div v-else-if="usersStore.error" class="text-red-500">
      {{ usersStore.error }}
    </div>

    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-2 text-left">Імʼя</th>
            <th class="px-4 py-2 text-left">Електронна пошта</th>
            <th class="px-4 py-2 text-left">Дата народження</th>
            <th class="px-4 py-2 text-left">Роль</th>
            <th class="px-4 py-2 text-right">Дії</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in displayedUsers" :key="user.id" class="border-t">
            <td class="px-4 py-2">{{ user.name }}</td>
            <td class="px-4 py-2">{{ user.email }}</td>
            <td class="px-4 py-2">
  {{ user.birthDate ? new Date(user.birthDate).toLocaleDateString('uk-UA') : '—' }}
</td>
            <td class="px-4 py-2">{{ user.role }}</td>
            <td class="px-4 py-2 text-right space-x-2">
              <Button class="my-1" size="sm" variant="secondary" @click="editUser(user.id)">
                Редагувати
              </Button>
              <Button
  size="sm"
  variant="danger"
  @click="() => usersStore.deleteUser(user.id)"
>
  Видалити
</Button>

            </td>
          </tr>

          <tr v-if="displayedUsers.length === 0">
            <td colspan="4" class="px-4 py-6 text-center text-gray-500">
              Користувачів не знайдено
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
