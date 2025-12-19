<script setup lang="ts">
interface Task {
  id: number;
  title: string;
}

const props = defineProps<{
  dayNumber: number | null;
  tasks: Task[];
  isToday?: boolean;
}>();
</script>

<template>
  <div
  class="w-32 h-32 shadow-md shadow-pink-300/50 rounded-xl flex flex-col p-1 relative border transition-all cursor-pointer"
  :class="[
    dayNumber === null && 'border-transparent bg-transparent',
    dayNumber !== null && !isToday && 'border-gray-200 bg-gray-50 hover:shadow-md hover:shadow-pink-400/50',
    dayNumber !== null && isToday && 'border-pink-200 bg-pink-100 hover:shadow-md hover:shadow-pink-300/50'
  ]"
>

    <div
      v-if="dayNumber"
      class="absolute top-2 right-2 text-sm font-semibold text-800"
    >
      {{ dayNumber }}
    </div>

    <ul v-if="dayNumber && tasks.length" class="mt-6 flex flex-col gap-1 text-sm bg-pink-200 text-pink-800 rounded-md p-1 mx-2">
      <li v-for="task in tasks" :key="task.id" class="truncate">
        {{ task.title }}
      </li>
    </ul>
  </div>
</template>
