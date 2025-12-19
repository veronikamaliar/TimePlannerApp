<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import Button from '@/components/common/Button.vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const isLoggedIn = computed(() => authStore.isAuthenticated)

const logout = () => {
  authStore.logout()
  router.push('/login')
}

const editProfile = () => {
  router.push('/dashboard/account/edit')
}
</script>

<template>
  <div class="max-w-3xl mx-auto p-6 ">
    <h1 class="text-3xl font-bold mb-6 text-center">Мій акаунт</h1>

    <div v-if="isLoggedIn" class="bg-white rounded-2xl p-6 space-y-4 shadow-2xl">
      <div class="flex items-center space-x-4">
       
        <div class="w-20 h-20 rounded-full bg-gray-400 flex items-center justify-center text-2xl font-bold text-white">
          {{ authStore.user?.name?.charAt(0) || 'U' }}
        </div>
        <div>
          <h2 class="text-xl font-semibold">{{ authStore.user?.name }}</h2>
<p class="text-gray-500">{{ authStore.user?.email }}</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
       
    
      </div>

      <div class="flex space-x-4 mt-4">
        <Button variant="primary" @click="editProfile">Редагувати профіль</Button>
        <Button variant="danger" @click="logout">Вийти</Button>
      </div>
    </div>

    <div v-else class="bg-white shadow rounded-lg p-6 text-center space-y-4">
      <p class="text-gray-500 text-lg">Ви не авторизовані.</p>
      <div class="flex justify-center gap-4">
        <Button variant="primary" @click="() => router.push('/login')">Увійти</Button>
        <Button variant="secondary" @click="() => router.push('/register')">Зареєструватися</Button>
      </div>
    </div>
  </div>
</template>
