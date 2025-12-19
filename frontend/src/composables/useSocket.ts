import { onMounted, onUnmounted, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import socketService from '@/services/socket.service'

export const useSocket = () => {
  const authStore = useAuthStore()

  const connect = () => {
    if (authStore.token) {
      socketService.connect(authStore.token)
    }
  }

  const disconnect = () => {
    socketService.disconnect()
  }

  onMounted(() => {
    connect()
  })

  onUnmounted(() => {
    disconnect()
  })

  // якщо токен зміниться (логін / логаут)
  watch(
    () => authStore.token,
    (newToken, oldToken) => {
      if (oldToken) socketService.disconnect()
      if (newToken) socketService.connect(newToken)
    }
  )

  return {
    socket: socketService,
    connect,
    disconnect,
  }
}
