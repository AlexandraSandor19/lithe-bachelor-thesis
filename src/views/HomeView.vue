<script setup>
import Header from '../components/Header.vue'
</script>

<template>
  <main>
    <Header />
    <div class="hero">
    </div>
  </main>
</template>

<style lang="scss" scoped>
    /* 
    TODO: Better background color scheme/wallpaper?
    */ 
  .hero {
    background-color: $bcg-purple-pure;
    height: calc(100vh - 5rem);
  }
</style>
