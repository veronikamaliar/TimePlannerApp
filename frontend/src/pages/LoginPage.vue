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

const onSubmit = async () => {
  serverError.value = ''

  try {
    const res = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    })

    const user: User = res.data.user
    const token: string = res.data.tokens.accessToken 

authStore.login(user, token)
localStorage.setItem('token', token) 

api.defaults.headers.common['Authorization'] = `Bearer ${token}`
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
