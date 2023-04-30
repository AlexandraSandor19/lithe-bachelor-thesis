<script setup>
import Profile from '../components/Profile.vue';
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
</script>

<template>
  <main>
    <Header />
    <div class="flex flex-row">
      <Sidebar />
      <div class="profile">
        <Profile />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  main {
    margin: 0;
    background-color: $whiteish;
    min-height: 100vh;
  }  

    .profile {
    display: flex;
    margin-left: 17rem;
    width: 100%;
    height: 100%;
    }
</style>
