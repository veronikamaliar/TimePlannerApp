<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Button from '@/components/common/Button.vue';

interface Task {
  id: number;
  title: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  completed: boolean;
  plannedDate?: string; 
}

const props = defineProps<{ task: Task }>();
const emit = defineEmits<{
  (e: 'updateTask', task: Task): void;
  (e: 'deleteTask', id: number): void;
}>();

const completed = ref(props.task.completed);
watch(() => props.task.completed, val => {
  completed.value = val;
});

const toggleCompleted = () => {
  completed.value = !completed.value;
  emit('updateTask', { ...props.task, completed: completed.value });
};

const priorityClass = computed(() => {
  switch (props.task.priority) {
    case 'HIGH': return 'border-red-500 bg-red-50';
    case 'MEDIUM': return 'border-yellow-400 bg-yellow-50';
    case 'LOW': return 'border-green-500 bg-green-50';
    default: return 'border-gray-300 bg-gray-50';
  }
});

const deleteTask = () => emit('deleteTask', props.task.id);
</script>

<template>
  <div :class="['border-l-4 p-2 rounded-md flex flex-col gap-1 text-sm', priorityClass, completed ? 'bg-gray-200 text-gray-400 line-through' : '']">
    <div class="flex justify-between items-center">
      <span>{{ task.title }}</span>
      <Checkbox :model-value="completed" @update:model-value="toggleCompleted" />
    </div>
    <div class="flex justify-end gap-1 mt-1">
      <Button variant="danger" size="sm" @click="deleteTask">Видалити</Button>
    </div>
  </div>
</template>
