<script setup lang="ts">
defineProps<{
  title: string
  value: number
}>()
</script>

<template>
  <div class="bg-white rounded-xl shadow-xl shadow-pink-50 p-5">
    <p class="text-sm text-gray-500">{{ title }}</p>
    <p class="text-3xl font-bold mt-2">{{ value }}</p>
  </div>
</template>


