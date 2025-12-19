<script setup>
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import { useSocket } from '@/composables/useSocket'

useSocket()
</script>


<template>
  <Header />
  <main>
    <router-view />
  </main>
  <Footer />
</template>



<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>