<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const menuItems = [
  { name: 'Головна', path: '/dashboard/board' },
  { name: 'Користувачі', path: '/dashboard/users' },
  { name: 'Завдання', path: '/dashboard/tasks' },
  { name: 'Категорії', path: '/dashboard/categories' },

]

const navigate = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="min-h-screen flex bg-gray-100">

    <aside class="w-64 bg-white shadow-md p-4">
      <nav class="flex flex-col gap-2">
        <button
          v-for="item in menuItems"
          :key="item.path"
          @click="navigate(item.path)"
          class="text-left px-4 py-2 rounded hover:bg-pink-100 transition"
        >
          {{ item.name }}
        </button>
      </nav>
    </aside>

    <main class="flex-1 p-6">
      <router-view />
    </main>
  </div>
</template>

