<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import socketService from '@/services/socket.service'
import { useNotificationsStore } from '@/stores/notificationsStore'

const notificationsStore = useNotificationsStore()
const isOpen = ref(false)

const onNotification = (data: any) => {
  notificationsStore.addNotification({
    type: data.type,
    title: data.title,
    message: data.message,
  })
}

onMounted(() => {
  socketService.on('notification', onNotification)
})

onUnmounted(() => {
  socketService.off('notification', onNotification)
})

const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="relative">
    <!-- Дзвіночок -->
    <button
      @click="toggle"
      class="relative p-2 rounded-full hover:bg-gray-100"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>

      <!-- Badge -->
      <span
        v-if="notificationsStore.unreadCount > 0"
        class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
      >
        {{ notificationsStore.unreadCount }}
      </span>
    </button>

    <!-- Dropdown -->
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50"
    >
      <div class="p-4 border-b font-semibold">
        Сповіщення
      </div>

      <div class="max-h-96 overflow-y-auto">
        <p
          v-if="notificationsStore.notifications.length === 0"
          class="p-4 text-gray-500 text-center"
        >
          Немає сповіщень
        </p>

        <div
          v-for="n in notificationsStore.notifications"
          :key="n.id"
          class="p-4 border-b hover:bg-gray-50"
          :class="{ 'bg-blue-50': !n.read }"
          @click="notificationsStore.markAsRead(n.id)"
        >
          <h4 class="font-medium">{{ n.title }}</h4>
          <p class="text-sm text-gray-600">{{ n.message }}</p>
          <span class="text-xs text-gray-400">
            {{ n.timestamp.toLocaleString() }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
