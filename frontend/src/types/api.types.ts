export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export type UserRole = "USER" | "ADMIN";

export interface User {
  id: number;
  name: string;
  email: string;
  birthDate: string;
  role: UserRole;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  birthDate: string;
  role?: UserRole;
  avatar?: string;
  password: string;
}

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  completed: boolean;
  timeSpent: number;
  attachment?: string;
  categoryId: number;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  completed: boolean;
  timeSpent: number;
  attachment?: string;
  categoryId: number;
}

export interface Category {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCategoryDto {
  name: string;
}

export interface TimeLog {
  id: number;
  userId: number;
  taskId: number;
  startTime: string;
  endTime: string;
  duration: number;
  createdAt: string;
}

export interface CreateTimeLogDto {
  userId: number;
  taskId: number;
  startTime: string;
  endTime: string;
}

export interface ApiEndpoints {
  users: string;
  tasks: string;
  categories: string;
  timelogs: string;
}
