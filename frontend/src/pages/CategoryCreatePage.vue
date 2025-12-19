<script setup lang="ts">
import { ref } from 'vue' 
import { useRouter } from 'vue-router' 
import { useForm, Field } from 'vee-validate' 
import { toTypedSchema } from '@vee-validate/zod' 
import { categorySchema, type CategoryFormData } from '@/schemas/category.schema' 
import { categoriesService } from '@/services/categories.service' 

import ErrorMessage from '@/components/common/ErrorMessage.vue'

import Button from '@/components/common/Button.vue' 
import { toast } from 'vue3-toastify'

const router = useRouter()
const serverError = ref('')

const { handleSubmit } = useForm<CategoryFormData>({
  validationSchema: toTypedSchema(categorySchema),
  initialValues: { name: '' }
})


const onSubmit = handleSubmit(async (values) => {
  console.log('Payload для бекенду:', values) 
  serverError.value = ''
  try {
    const newCategory = await categoriesService.create({ name: values.name })
    toast.success(`Категорію "${newCategory.name}" успішно створено!`)
    router.push('/dashboard/categories')
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Помилка створення'
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
    <h1 class="text-3xl font-bold mb-6">Нова категорія</h1>

    <form @submit.prevent="onSubmit" class="bg-white rounded-lg shadow p-6 space-y-4">
      
      <Field name="name" v-slot="{ field }">
  <input 
    v-bind="field"   
    placeholder="Назва категорії"
    class="border p-2 w-full border-gray-300 focus:border-gray-500 rounded-lg transition-colors focus:outline-none"
  />
  
</Field>

      <div class="flex gap-4 mt-4">
        <Button type="submit" variant="primary" >Додати категорію</Button>
        <Button type="button" variant="secondary" @click="cancel">Скасувати</Button>
      </div>
    </form>
  </div>
</template>
