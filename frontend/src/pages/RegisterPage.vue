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

const name = ref('')
const email = ref('')
const birthDate = ref('')
const password = ref('')
const serverError = ref('')

const onSubmit = async () => {
  serverError.value = ''

  if (!name.value || !email.value || !password.value || !birthDate.value) {
    serverError.value = 'Будь ласка, заповніть всі поля'
    return
  }

  try {
    const response = await api.post('/auth/register', {
      name: name.value,
      email: email.value,
      birthDate: birthDate.value,
      password: password.value
    })

    const user: User = response.data.user
    const token: string = response.data.token

    authStore.login(user, token)
    if (user.role === 'ADMIN') {
  router.push('/dashboard')
} else {
  router.push('/dashboard/board')
}
  } catch (error: any) {
    serverError.value = error.response?.data?.message || 'Помилка реєстрації'
    console.error(error)
  }
}
</script>

<template>
    <ErrorMessage v-if="serverError" :message="serverError" />
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-6">
    <form @submit.prevent="onSubmit" class="w-full max-w-md bg-white p-8 rounded-lg shadow-md flex flex-col gap-4">
      <h2 class="text-2xl font-semibold text-center mb-4">Реєстрація</h2>

      <Input v-model="name" label="Ім'я" placeholder="Ім'я" />
      <Input v-model="email" label="Email" type="email" placeholder="Елетронна пошта" />
      <Input v-model="birthDate" label="Дата народження" type="date" placeholder="Дата народження" />
      <Input v-model="password" label="Пароль" type="password" placeholder="Пароль" />


      <Button type="submit" variant="primary" class="w-full">Зареєструватися</Button>

      <p class="text-sm text-center mt-2">
        Вже є акаунт?
        <router-link to="/login" class="text-blue-600 hover:underline">Увійти</router-link>
      </p>
    </form>
  </div>
</template>
