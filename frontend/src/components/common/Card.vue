<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Checkbox from '@/components/common/Checkbox.vue';
import Button from '@/components/common/Button.vue';

interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  completed: boolean;
  category?: { name: string; color?: string };
}

const props = defineProps<{ task: Task }>();
const emit = defineEmits<{
  (e: 'update:completed', value: boolean): void;
  (e: 'edit', taskId: number): void;
  (e: 'delete', taskId: number): void;
}>();

const completed = ref(props.task.completed);
watch(() => props.task.completed, (val) => {
  completed.value = val;
});

const priorityClass = computed(() => {
  switch (props.task.priority) {
    case 'HIGH':
      return 'border-red-500 bg-red-50';
    case 'MEDIUM':
      return 'border-yellow-400 bg-yellow-50';
    case 'LOW':
      return 'border-brand-500 bg-brand-50';
    default:
      return 'border-gray-300 bg-gray-50';
  }
});

const timeLeft = computed(() => {
  if (!props.task.dueDate) return 'No deadline';
  const now = new Date();
  const due = new Date(props.task.dueDate);
  const diffMs = due.getTime() - now.getTime();
  if (diffMs <= 0) return 'Overdue';
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${diffHours}h ${diffMinutes}m left`;
});

const toggleCompleted = () => {
  completed.value = !completed.value;
  emit('update:completed', completed.value);
};

const editTask = () => emit('edit', props.task.id);
const deleteTask = () => emit('delete', props.task.id);
</script>

<template>
  <div
    class="w-full max-w-md mx-auto p-4 rounded-xl border-2 flex flex-col gap-3"
  :class="[priorityClass, { 'bg-gray-300': completed }]"
  >
    
    <div class="flex justify-between items-center">
      <h3
        class="font-semibold text-lg"
        :class="{ 'line-through text-gray-400': completed }"
      >
        {{ task.title }}
      </h3>
      <Checkbox :model-value="completed" @update:model-value="toggleCompleted" />
    </div>

    <div v-if="task.description" class="text-sm text-gray-700">
      {{ task.description }}
    </div>

    <div class="flex justify-between text-xs mt-1">
      <span class="font-medium">
        {{ task.category?.name || 'No category' }}
      </span>
      <span class="italic">
        {{ timeLeft }}
      </span>
    </div>

    <div class="flex flex-col sm:flex-row justify-end gap-2 mt-2">
      <Button variant="secondary" size="sm" class="w-full sm:w-auto" @click="editTask">
        Редагувати
      </Button>
      <Button variant="danger" size="sm" class="w-full sm:w-auto" @click="deleteTask">
        Видалити
      </Button>
    </div>
  </div>
</template>
