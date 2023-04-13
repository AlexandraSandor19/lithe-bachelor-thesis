<script setup>
import Profile from '../components/Profile.vue';
</script>

<template>
  <main>
    <div class="profile">
      <Profile />
    </div>
  </main>
</template>

<style lang="scss" scoped>
    .profile {
    display: flex;
    background: $bcg-purple-gradient;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    }
</style>
