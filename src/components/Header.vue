<script setup>
import Logo from './Logo.vue'

defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="header">
    <Logo />
    <div class="tabs">
      <a href="/">Contact</a>
      <a href="/">About Scrum</a>
      <a href="/">Features</a>
      <a href="/">Log in</a>
    </div>
  </div>
</template>

<style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 7rem;
    margin: 0;
    background-color: #5E376D;
  }

  .tabs {
    display: flex;
    margin-right: 5rem;
  }

  a {
    text-decoration: none;
    color: white;
    font-size: 1.1rem;
    padding-left: 2rem;
  }
</style>
