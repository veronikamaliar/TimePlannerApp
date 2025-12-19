<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Input from '@/components/common/Input.vue';
import Button from '@/components/common/Button.vue';

const props = defineProps<{ show: boolean }>();
const emit = defineEmits<{
  (e: 'close'): void;
}>();

const title = ref('');
const description = ref('');
const deadline = ref('');
const priority = ref('');
const selectedCategoryId = ref<number | null>(null); 
const categories = ref<{ id: number; name: string }[]>([]);

onMounted(async () => {
  try {
    const response = await axios.get('/api/categories');
    categories.value = response.data;
  } catch (error) {
    console.error('Помилка завантаження категорій', error);
  }
});

async function addTask() {
  if (!title.value || !selectedCategoryId.value) return;

  try {
    await axios.post('/api/tasks', {
      title: title.value,
      description: description.value,
      priority: priority.value || 'MEDIUM',
      dueDate: deadline.value || null,
      completed: false,
      timeSpent: 0,
      attachment: null,
      categoryId: selectedCategoryId.value,
    });

    title.value = '';
    description.value = '';
    deadline.value = '';
    priority.value = '';
    selectedCategoryId.value = null;

    emit('close');
  } catch (error) {
    console.error('Помилка додавання завдання', error);
  }
}
</script>

<template>
  <div
    class="fixed inset-0 bg-black/40 flex justify-end z-50"
    @click.self="$emit('close')"
    v-show="props.show"
  >
    <div
      :class="[
        'bg-white w-80 md:w-96 h-full p-6 transition-transform transform flex flex-col',
        props.show ? 'translate-x-0' : 'translate-x-full'
      ]"
    >
      <h2 class="text-xl font-bold mb-4">Додати завдання</h2>

      <div class="flex flex-col gap-4 mb-4 w-full">
        <div class="flex flex-col gap-3 w-full">
          <Input v-model="title" placeholder="Назва завдання" class="w-full" />
          <Input type="textarea" v-model="description" placeholder="Опис завдання" class="w-full" />
          <Input type="date" v-model="deadline" class="w-full" />

          <select v-model="selectedCategoryId" class="w-full border border-brand-300 rounded-lg p-2">
            <option disabled value="">Оберіть категорію</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>

          <select v-model="priority" class="w-full border border-brand-300 rounded-lg p-2">
            <option disabled value="">Оберіть пріоритет</option>
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
          </select>
        </div>
      </div>

      <Button variant="primary" class="w-full mt-auto" @click="addTask">Додати</Button>
    </div>
  </div>
</template>

