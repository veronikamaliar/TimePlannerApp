<script setup lang="ts">
import { } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'

const props = defineProps<{
  isOpen: boolean
  onClose: () => void
  title: string
  size?: 'sm' | 'md' | 'lg'
}>()

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
}
</script>

<template>
  <TransitionRoot appear :show="props.isOpen" as="template">
    <Dialog class="relative z-50" @close="props.onClose">
      
      <TransitionChild
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
        as="template"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            enter="ease-out duration-300"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
            as="template"
          >
            <DialogPanel :class="['w-full', sizeClasses[props.size || 'md'], 'bg-white rounded-lg shadow-xl']">
              <div class="p-6">
                <DialogTitle class="text-xl font-bold mb-4">{{ props.title }}</DialogTitle>
                <slot />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>

    </Dialog>
  </TransitionRoot>
</template>
