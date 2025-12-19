<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useForm, Field } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useUsersStore } from '@/stores/usersStore'
import { toast } from 'vue3-toastify'
import Button from '@/components/common/Button.vue'
import { userUpdateSchema, type UserUpdateFormData } from '@/schemas/userUpdate.schema'


const route = useRoute()
const router = useRouter()
const usersStore = useUsersStore()
const serverError = ref('')

const userId = Number(route.params.id)

const { handleSubmit, errors, setValues } = useForm<UserUpdateFormData>({
  validationSchema: toTypedSchema(userUpdateSchema),
  initialValues: {
    name: '',
    email: '',
    birthDate: '',
  },
})

onMounted(async () => {
  if (!usersStore.users.length) {
    await usersStore.fetchUsers()
  }

  const user = usersStore.getUserById(userId)

  if (!user) {
    router.push('/dashboard/users')
    return
  }

  setValues({
    name: user.name,
    email: user.email,
    birthDate: user.birthDate?.slice(0, 10) ?? '',
  })
})


const onSubmit = handleSubmit(async (values) => {
  try {
    serverError.value = ''

    const payload: any = {
  name: values.name,
  email: values.email,
}

if (values.birthDate?.trim()) {
  payload.birthDate = values.birthDate
}

    await usersStore.updateUser(userId, payload)
    toast.success('Користувача оновлено!')
    router.push('/dashboard/users')
  } catch (err: any) {
  console.log('BACKEND ERROR DATA:', err.response?.data)
  console.log('BACKEND STATUS:', err.response?.status)

  serverError.value =
    err.response?.data?.message ||
    JSON.stringify(err.response?.data) ||
    'Помилка редагування користувача'
}
})
</script>

<template>
    
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Редагувати користувача</h1>

    <form @submit.prevent="onSubmit" class="bg-white rounded-lg shadow p-6 space-y-4">

      <Field name="name" v-slot="{ field, meta }">
        <input
          v-bind="field"
          class="w-full border p-2 rounded"
          placeholder="Імʼя"
        />
        <p v-if="meta.touched && meta.errorMessage" class="text-red-500 text-sm">
          {{ meta.errorMessage }}
        </p>
      </Field>

      <Field name="email" v-slot="{ field, meta }">
        <input
          v-bind="field"
          type="email"
          class="w-full border p-2 rounded"
          placeholder="Електронна пошта"
        />
        <p v-if="meta.touched && meta.errorMessage" class="text-red-500 text-sm">
          {{ meta.errorMessage }}
        </p>
      </Field>


      <Field name="birthDate" v-slot="{ field }">
        <input type="date" v-bind="field" class="w-full border p-2 rounded" />
      </Field>

      <p v-if="serverError" class="text-red-500 text-sm">{{ serverError }}</p>

      <div class="flex gap-4 mt-4">
        <Button type="submit" class="bg-pink-500 text-white px-4 py-2 rounded">
          Оновити користувача
        </Button>

        <Button
          type="button"
          class="bg-gray-300 px-4 py-2 rounded"
          @click="router.push('/dashboard/users')"
        >
          Скасувати
        </Button>
      </div>
    </form>

    <pre v-if="Object.keys(errors).length" class="text-xs text-red-500 mt-4">
{{ errors }}
    </pre>
  </div>
</template>
