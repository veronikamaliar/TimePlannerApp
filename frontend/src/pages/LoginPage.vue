<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore, type User } from '@/stores/authStore'
import Input from '@/components/common/Input.vue'
import Button from '@/components/common/Button.vue'
import api from '@/services/api'
import ErrorMessage from '@/components/common/ErrorMessage.vue'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const serverError = ref('')

import { authService } from '@/services/authService'

const onSubmit = async () => {
  serverError.value = ''
  try {
    const { user, tokens } = await authService.login(email.value, password.value)

    authStore.login(user, tokens.accessToken)
    localStorage.setItem('token', tokens.accessToken)
    api.defaults.headers.common['Authorization'] = `Bearer ${tokens.accessToken}`
    router.push('/account')
  } catch (err: any) {
    serverError.value = err.response?.data?.message || 'Помилка входу'
  }
}
</script>

<template>
    <ErrorMessage v-if="serverError" :message="serverError" />
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-6">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-md flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-center mb-4">Вхід</h2>

      <Input v-model="email" label="Email" placeholder="Електронна пошта" />
      <Input v-model="password" type="password" label="Пароль" placeholder="Пароль" />

      

      <Button variant="primary" @click="onSubmit" class="w-full">Увійти</Button>
    </div>
  </div>
</template>
