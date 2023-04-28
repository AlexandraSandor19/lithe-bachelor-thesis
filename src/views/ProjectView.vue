<script setup>
import Header from '../components/Header.vue'
import ProjectForm from '../components/ProjectForm.vue';
import { useProjectStore } from '../stores/project';

const projectStore = useProjectStore();
</script>

<template>
  <main>
    <Header />
    <div class="page-content">
      <Button label="Show" icon="pi pi-external-link" @click="projectStore.openProjectModal" />
    </div>
    <ProjectForm />
  </main>
</template>

<style lang="scss" scoped>
  .page-content {
    margin: 6rem;
  }
</style>