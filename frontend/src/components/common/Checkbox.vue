<script setup lang="ts">
const props = defineProps<{
  modelValue?: boolean
  label?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<template>
  <label class="flex items-center gap-2 cursor-pointer select-none"
         :class="{ 'opacity-60 cursor-not-allowed': props.disabled }">
    <input
      type="checkbox"
      :checked="!!props.modelValue"
      @change="emit('update:modelValue', $event.target.checked)"
      :disabled="props.disabled"
      class="w-5 h-5 rounded border-gray-300 accent-pink-300"
    />
    <span class="text-base text-pink-800">{{ props.label }}</span>
  </label>
</template>
