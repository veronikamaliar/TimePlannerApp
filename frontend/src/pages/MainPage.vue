<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Card from '@/components/common/Card.vue';
import Button from '@/components/common/Button.vue';
import Pagination from '@/components/common/Pagination.vue';
import TaskSidebar from '@/components/layout/TaskSidebar.vue';

interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  completed: boolean;
  category?: { name: string; color?: string };
}

const today = ref("");
const showSidebar = ref(false);
const searchQuery = ref("");
const currentPage = ref(1);
const pageSize = 3;

const tasks = ref<Task[]>([]);

const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return tasks.value.slice(start, start + pageSize);
});

const totalPages = computed(() => Math.ceil(tasks.value.length / pageSize));

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

onMounted(() => {
  today.value = formatDate(new Date());
});

function handleAddTask(task: Task) {
  tasks.value.push({ ...task, id: tasks.value.length + 1 });
  showSidebar.value = false;
}
</script>

<template>
  <h1 class="text-center text-3xl font-bold mt-10">{{ today }}</h1>

  <div class="w-full max-w-2xl mx-auto mt-8 flex flex-col gap-4 px-4">
    <SearchInput class="w-full max-w-md mx-auto" @update:search="(val: string) => searchQuery = val" />

    <Button
      variant="primary"
      class="w-64 py-3 text-base font-semibold rounded-xl mx-auto"
      @click="showSidebar = true"
    >
      ADD TASK
    </Button>

    <div class="flex flex-col gap-4">
      <Card
        v-for="task in paginatedTasks"
        :key="task.id"
        :task="task"
      />
    </div>

    <TaskSidebar
      :show="showSidebar"
      @addTask="handleAddTask"
      @close="showSidebar = false"
    />

    <div class="mt-6 mb-10">
      <Pagination
        :page="currentPage"
        :total="tasks.length"
        :pageSize="pageSize"
        @update:page="goToPage"
      />
    </div>
  </div>
</template>
