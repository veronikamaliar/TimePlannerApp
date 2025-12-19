<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import WeekDay from '@/components/common/WeekDay.vue';
import TaskSidebar from '@/components/layout/TaskSidebar.vue';

interface Task {
  id: number;
  title: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  completed: boolean;
  plannedDate?: string;
}

const today = new Date();
const startOfWeek = new Date(today);
startOfWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7));

const weekDates = computed(() => {
  const arr: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    arr.push(d.toISOString().split('T')[0]);
  }
  return arr;
});

const weekdayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const tasks = ref<Task[]>([]);

const fetchTasks = async () => {
  try {
    const res = await axios.get('/tasks');
    tasks.value = res.data.map((t: any) => ({ ...t, plannedDate: t.plannedDate }));
  } catch (err) {
    console.error(err);
  }
};

onMounted(fetchTasks);

const tasksForDay = (date: string) =>
  tasks.value.filter(t => t.plannedDate === date);

const updateTask = async (task: Task) => {
  try {
    await axios.put(`/tasks/${task.id}`, task);
    const index = tasks.value.findIndex(t => t.id === task.id);
    if (index !== -1) tasks.value[index] = task;
  } catch (err) { console.error(err); }
};

const deleteTask = async (id: number) => {
  try {
    await axios.delete(`/tasks/${id}`);
    tasks.value = tasks.value.filter(t => t.id !== id);
  } catch (err) { console.error(err); }
};

const sidebarOpen = ref(false);
const selectedDate = ref<string | null>(null);

const openSidebar = (date: string) => {
  selectedDate.value = date;
  sidebarOpen.value = true;
};

const closeSidebar = () => { sidebarOpen.value = false; };

const handleAddTask = async (task: Task) => {
  task.plannedDate = selectedDate.value!;
  try {
    await axios.post('/tasks', task);
    fetchTasks();
  } catch (err) { console.error(err); }
  closeSidebar();
};
</script>

<template>
  <div class="max-w-7xl mx-auto p-4">
    <h2 class="text-2xl font-bold mb-6 text-center">
      Тиждень
    </h2>

    <div class="grid grid-cols-7 gap-4 h-[80vh]">
      <WeekDay
        v-for="(date, i) in weekDates"
        :key="date"
        :weekdayName="weekdayNames[i] || ''"
        :date="date"
        :tasks="tasksForDay(date)"
        @updateTask="updateTask"
        @deleteTask="deleteTask"
        @add="openSidebar"
      />
    </div>

    <TaskSidebar
      v-if="selectedDate"
      :show="sidebarOpen"
      :defaultDate="selectedDate"
      @addTask="handleAddTask"
      @close="closeSidebar"
    />
  </div>
</template>
