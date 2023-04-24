<script setup>
import Profile from '../components/Profile.vue';
import Header from '../components/Header.vue';
</script>

<template>
  <main>
    <Header />
    <div class="profile">
      <Profile />
    </div>
  </main>
</template>

<style lang="scss" scoped>
    .profile {
    display: flex;
    background-color: $whiteish;
    min-height: 100vh;
    height: fit-content;
    width: 100%;
    justify-content: center;
    align-items: center;
    }
</style>
