<script setup lang="ts">
import { computed } from 'vue';
import Button from '@/components/common/Button.vue';

interface Props {
  total: number;     
  page: number;      
  pageSize: number;     
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:page', value: number): void
}>();

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)));

function prev() {
  if (props.page > 1) emit('update:page', props.page - 1);
}

function next() {
  if (props.page < totalPages.value) emit('update:page', props.page + 1);
}
</script>

<template>
  <div class="flex items-center justify-center gap-2 mt-4">
    <Button
      variant="secondary"
      size="sm"
      :disabled="props.page === 1"
      @click="prev"
    >
      Назад
    </Button>

    <span class="text-sm font-medium text-gray-700">
      {{ props.page }} / {{ totalPages }}
    </span>

    <Button
      variant="secondary"
      size="sm"
      :disabled="props.page === totalPages"
      @click="next"
    >
      Вперед
    </Button>
    
  </div>
</template>

<style scoped>
</style>
