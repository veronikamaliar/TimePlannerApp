<script setup lang="ts">
import { } from 'vue';

defineProps<{
  message?: string
}>();
</script>

<template>
  <div v-if="message" class="bg-red-100 border border-red-500 text-red-700 px-4 py-3 rounded-xl relative" role="alert">
    <strong class="font-bold">Помилка! </strong>
    <span class="block sm:inline">{{ message }}</span>
  </div>
</template>


