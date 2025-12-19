<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.replace('/login')
  }
})
</script>

<template>
  <slot v-if="authStore.isAuthenticated" />
</template>
