<script setup lang="ts">
import { } from 'vue'

const props = defineProps<{
  data: Record<string, any>[]
}>()
</script>

<template>
  <ul class="space-y-2">
    <li v-for="(item, index) in props.data" :key="index" class="p-4 border rounded-lg flex justify-between items-center">
      <slot name="item" :item="item" />
    </li>
  </ul>
</template>
