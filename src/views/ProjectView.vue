<script setup>
import Header from '../components/Header.vue'
import ProjectForm from '../components/ProjectForm.vue';
import Sidebar from '../components/Sidebar.vue';
import { useProjectStore } from '../stores/project';

const projectStore = useProjectStore();
</script>

<template>
  <main>
    <Header />
    <div class="flex flex-row">
      <Sidebar />
      <div class="page-content">
        <Button label="Show" icon="pi pi-external-link" @click="projectStore.openProjectModal" />
      </div> 
    </div>
    <ProjectForm />
  </main>
</template>

<style lang="scss" scoped>
  .page-content {
    margin-left: 18rem;
    padding: 1.5rem 1rem 1rem 2rem;
  }
</style>