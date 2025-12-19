<script setup lang="ts">
import { ref } from "vue";
import Button from '@/components/common/Button.vue';
import NotificationBell from "../common/NotificationBell.vue";


const menuItems = ref([
  { name: "ГОЛОВНА", href: "/dashboard" },
  //{ name: "MAIN", href: "/main" },
  { name: "КАЛЕНДАР", href: "/calendar" },
  //{ name: "ТИЖДЕНЬ", href: "/week" },
  { name: "АКАУНТ", href: "/account" }
]);

import { useRouter } from 'vue-router';

const router = useRouter();

function handleClick(mode: 'login' | 'register') {
  router.push(mode === 'login' ? '/login' : '/register')
}

const menuOpen = ref(false);
</script>

<template>
  <header
    class="relative w-full flex items-center justify-between px-6 py-4 border-b border-gray-200"
  >
    <div class="text-lg font-bold">TIME PLANNER</div>

    <nav class="hidden md:flex">
      <ul class="flex gap-10">
        <li v-for="item in menuItems" :key="item.href">
          <router-link
            :to="item.href"
            class="text-sm font-medium relative hover:font-bold"
            active-class="text-black font-bold"
          >
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </nav>


    <div class="hidden md:flex gap-4">
        <NotificationBell />
      <Button variant="primary" size="sm" @click="handleClick('register')">
        ЗАРЕЄСТРУВАТИСЬ
      </Button>
      <Button variant="secondary" size="sm" @click="handleClick('login')">
        УВІЙТИ
      </Button>
    </div>

    <button
      class="md:hidden flex items-center"
      @click="menuOpen = !menuOpen"
    >
      <span class="text-3xl">☰</span>
    </button>

<div
  v-if="menuOpen"
  class="absolute top-full left-0 w-full bg-white shadow-md md:hidden px-6 py-4 flex flex-col gap-4 z-50"
>
  <nav>
    <ul class="flex flex-col gap-4">
      <li v-for="item in menuItems" :key="item.href">
        <router-link
          :to="item.href"
          class="nav__link"
          
          @click="menuOpen = false"
        >
          {{ item.name }}
        </router-link>
      </li>
    </ul>
  </nav>

  <div class="hidden md:flex gap-4">
  <Button variant="primary" size="sm" @click="handleClick('register')">
    ЗАРЕЄСТРУВАТИСЬ
  </Button>
  <Button variant="secondary" size="sm" @click="handleClick('login')">
    УВІЙТИ
  </Button>
</div>

</div>
  </header>
</template>
