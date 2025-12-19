<script setup lang="ts">
import WeekCard from './WeekCard.vue';
import Button from './Button.vue';

interface Task {
  id: number;
  title: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  completed: boolean;
  plannedDate?: string;
}

const props = defineProps<{
  weekdayName: string;
  date: string;
  tasks: Task[];
}>();

const emit = defineEmits<{
  (e: 'add', date: string): void;
  (e: 'updateTask', task: Task): void;
  (e: 'deleteTask', id: number): void;
}>();

const updateTask = (task: Task) => emit('updateTask', task);
const deleteTask = (id: number) => emit('deleteTask', id);
const addTask = () => emit('add', props.date);
</script>

<template>
  <div class="flex flex-col bg-white rounded-xl shadow border border-gray-200 p-2 h-full">
    <h3 class="text-center font-semibold text-gray-800 text-sm">{{ weekdayName }}</h3>
    <p class="text-center text-gray-500 text-xs mb-1">{{ date }}</p>

    <div class="flex flex-col gap-1 flex-1 overflow-y-auto">
      <WeekCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @updateTask="updateTask"
        @deleteTask="deleteTask"
      />
      <p v-if="tasks.length === 0" class="text-gray-400 text-center text-xs mt-1">Завдань немає</p>
    </div>

    <Button variant="primary" @click="addTask">Додати завдання</Button>
  </div>
</template>
