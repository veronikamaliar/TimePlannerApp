<script setup lang="ts">
import { } from 'vue'

interface Column {
  label: string
  key: string
}

const props = defineProps<{
  columns: Column[]
  data: Record<string, any>[]
}>()
</script>

<template>
  <table class="min-w-full bg-white border rounded-lg overflow-hidden">
    <thead class="bg-gray-100">
      <tr>
        <th v-for="col in props.columns" :key="col.key" class="p-2 text-left border-b">
          {{ col.label }}
        </th>
        <th class="p-2 border-b">Дії</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in props.data" :key="index" class="hover:bg-gray-50">
        <td v-for="col in props.columns" :key="col.key" class="p-2 border-b">
          {{ item[col.key] }}
        </td>
        <td class="p-2 border-b">
          <slot name="actions" :item="item" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
