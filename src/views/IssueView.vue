<script setup>
import Header from '../components/Header.vue'
import { useIssueStore } from '../stores/issue';
import IssueForm from '../components/IssueForm.vue';
import Sidebar from '../components/Sidebar.vue';
import DraggableCard from '../components/DraggableCard.vue';

const issueStore = useIssueStore();

</script>

<template>
  <main>
    <Header />
    <div class="flex flex-row">
      <Sidebar />
      <div class="page-content">
        <Button label="Show" icon="pi pi-external-link" @click="issueStore.openIssueModal" />
        <DraggableCard />
      </div> 
    </div>
    <IssueForm />
  </main>
</template>

<style lang="scss" scoped>
  .page-content {
    margin-left: 18rem;
    padding: 2rem 1rem;
  }
</style>