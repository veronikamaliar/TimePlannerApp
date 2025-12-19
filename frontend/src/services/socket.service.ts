import { io, type Socket } from 'socket.io-client'

class SocketService {
  private socket: Socket | null = null

  connect(token: string) {
    if (this.socket) return this.socket

    console.log('Connecting to', import.meta.env.VITE_API_URL)

    this.socket = io(import.meta.env.VITE_API_URL, {
      auth: { token },
      transports: ['websocket'],
    })

    this.socket.on('connect', () => {
      console.log('WebSocket connected')
    })

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected')
    })

    return this.socket
  }

  disconnect() {
    if (!this.socket) return
    this.socket.disconnect()
    this.socket = null
  }

  on(event: string, callback: (...args: any[]) => void) {
    this.socket?.on(event, callback)
  }

  off(event: string, callback?: (...args: any[]) => void) {
    this.socket?.off(event, callback)
  }

  emit(event: string, data?: any) {
    this.socket?.emit(event, data)
  }
}

export default new SocketService()
