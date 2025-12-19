<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  class?: string;
}>()

const emit = defineEmits(['click'])

function handleClick(event: MouseEvent) {
  if (props.type === 'submit') return 
  if (!props.isLoading) emit('click', event)
}


const variantClass = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-pink-50 border border-pink-500 text-pink-500 hover:shadow-md hover:shadow-pink-300/50'
    case 'danger':
      return 'bg-red-500 text-white hover:shadow-md hover:shadow-red-700/50'
    default:
      return 'bg-pink-200 text-pink-700 rounded-full hover:shadow-md hover:shadow-pink-400/50 '
  }
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm': return 'px-3 py-1 text-sm'
    case 'lg': return 'px-6 py-3 text-lg'
    default: return 'px-4 py-2 text-base'
  }
})


</script>

<template>
  <button
    :type="props.type || 'button'"
    :disabled="props.isLoading"
    :class="[
      'rounded-full font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1',
      variantClass,
      sizeClass,
      props.class,
      props.isLoading ? 'opacity-60 cursor-not-allowed' : ''
    ]"
    @click="handleClick"
  >
    <span v-if="props.isLoading">Завантаження...</span>
    <span v-else><slot /></span>
  </button>
</template>
