export interface Task {
  id: number
  title: string
  description?: string
  priority?: string
  dueDate?: string
  completed: boolean
  timeSpent?: string
  attachment?: string
  category?: { id: number; name: string } | null
}
