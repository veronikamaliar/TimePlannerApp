<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from "axios";

import DayCard from '@/components/common/DayCard.vue';

interface Task {
  id: number;
  title: string;
  dueDate: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  completed: boolean;
}

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
const daysInMonth = new Date(year, month + 1, 0).getDate();

const calendarDays = computed(() => {
  const arr: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) arr.push(null);
  for (let i = 1; i <= daysInMonth; i++) arr.push(i);
  return arr;
});

const monthNames = [
  'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
  'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
];

const tasks = ref<Task[]>([]);

async function loadTasks() {
  try {
    const res = await axios.get("http://localhost:3000/api/tasks");
    tasks.value = res.data.data.map((t: any) => ({
      id: t.id,
      title: t.title,
      dueDate: t.dueDate,
      priority: t.priority,
      completed: t.completed,
    }));
  } catch (err) {
    console.error("Error loading tasks:", err);
  }
}

onMounted(loadTasks);

const selectedDay = ref<number | null>(null);
const sidebarOpen = ref(false);

function openSidebar(day: number) {
  selectedDay.value = day;
  sidebarOpen.value = true;
}

const tasksByDay = (day: number) =>
  tasks.value.filter(t => {
    const d = new Date(t.dueDate);
    return (
      d.getFullYear() === year &&
      d.getMonth() === month &&
      d.getDate() === day
    );
  });


</script>

<template>
  <div class="calendar-container max-w-5xl mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4 text-center">
      {{ monthNames[month] }} {{ year }}
    </h2>

    <div class="grid grid-cols-7 gap-2">
      <div v-for="(day, index) in calendarDays" :key="index">
        <DayCard
          v-if="day"
          :day-number="day"
          :tasks="tasksByDay(day)"
          :is-today="day === today.getDate()"
          @click.native="openSidebar(day)"
        />
        <div v-else class="bg-transparent h-32 rounded"></div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.calendar-container {
  position: relative;
}
</style>
