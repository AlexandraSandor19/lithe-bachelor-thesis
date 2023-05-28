<script setup>
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
import Board from '../components/Board.vue'
</script>

<template>
  <main>
    <Header />
    <div class="flex flex-row">
      <Sidebar />
      <div class="page-content">
        <Board />
      </div>
    </div>
    <ProjectForm />
  </main>
</template>

<style lang="scss" scoped>
main {
  background-color: $eggshell;
  min-height: 100vh;
}
.page-content {
  margin-left: 18rem;
  padding: 2rem 1rem;
}
</style>
