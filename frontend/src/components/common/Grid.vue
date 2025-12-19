<script setup lang="ts">
import { } from 'vue'

const props = defineProps<{
  data: Record<string, any>[]
  cols?: number
}>()

const colsClass = `grid grid-cols-${props.cols || 3} gap-4`
</script>

<template>
  <div :class="colsClass">
    <div v-for="(item, index) in props.data" :key="index" class="p-4 border rounded-lg">
      <slot name="item" :item="item" />
    </div>
  </div>
</template>
