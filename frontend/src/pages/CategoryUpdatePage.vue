<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useForm, Field } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { categorySchema, type CategoryFormData } from '@/schemas/category.schema'
import { categoriesService } from '@/services/categories.service'
import Button from '@/components/common/Button.vue'
import { toast } from 'vue3-toastify'
import ErrorMessage from '@/components/common/ErrorMessage.vue'

const router = useRouter()
const route = useRoute()
const categoryId = Number(route.params.id) 

const serverError = ref('')

const { handleSubmit, setValues } = useForm<CategoryFormData>({
  validationSchema: toTypedSchema(categorySchema),
  initialValues: { name: '' }
})

onMounted(async () => {
  try {
    const category = await categoriesService.getById(categoryId)

    setValues({
      name: category.name
    })
  } catch (error: any) {
    console.error('Update category error:', error)

    const msg =
      error.response?.data?.message ||
      error.message ||
      'Помилка завантаження категорії'

    toast.error(msg)
    serverError.value = msg
  }
})


const onSubmit = handleSubmit(async (values) => {
  serverError.value = ''

  try {
    const updatedCategory = await categoriesService.update(categoryId, {
      name: values.name
    })

    toast.success(`Категорію "${updatedCategory.name}" успішно оновлено!`)
    router.push('/dashboard/categories')
  } catch (error: any) {
    console.error('Update submit error:', error)

    const msg =
      error.response?.data?.message ||
      error.message ||
      'Помилка оновлення'

    toast.error(msg)
    serverError.value = msg
  }
})

const cancel = () => {
  router.push('/dashboard/categories')
}
</script>


<template>
     <ErrorMessage v-if="serverError" :message="serverError" />
  <div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Редагувати категорію</h1>

    <form @submit.prevent="onSubmit" class="bg-white rounded-lg shadow p-6 space-y-4">

      <Field name="name" v-slot="{ field }">
        <input 
          v-bind="field"
          placeholder="Назва категорії"
          class="border p-2 w-full border-gray-300 focus:border-gray-500 rounded-lg transition-colors focus:outline-none"
        />
      </Field>

      <div class="flex gap-4 mt-4">
        <Button type="submit" variant="primary">Редагувати категорію</Button>
        <Button type="button" variant="secondary" @click="cancel">Скасувати</Button>
      </div>
    </form>
  </div>
</template>
