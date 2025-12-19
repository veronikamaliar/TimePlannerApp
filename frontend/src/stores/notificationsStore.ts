import { defineStore } from 'pinia'

export type NotificationType = 'info' | 'success' | 'warning' | 'error'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: Date
  read: boolean
}

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: [] as Notification[],
  }),

  getters: {
    unreadCount: (state) =>
      state.notifications.filter((n) => !n.read).length,
  },

  actions: {
    addNotification(
      notification: Omit<Notification, 'id' | 'timestamp' | 'read'>
    ) {
      const newNotification: Notification = {
        ...notification,
        id: Math.random().toString(36).slice(2),
        timestamp: new Date(),
        read: false,
      }
      this.notifications.unshift(newNotification)
    },

    markAsRead(id: string) {
      const n = this.notifications.find((n) => n.id === id)
      if (n) n.read = true
    },

    clearAll() {
      this.notifications = []
    },
  },
})
