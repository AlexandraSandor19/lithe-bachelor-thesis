<script setup>
import Header from '../components/Header.vue'
import { useIssueStore } from '../stores/issue';
import IssueForm from '../components/IssueForm.vue';

const issueStore = useIssueStore();

</script>

<template>
  <main>
    <Header />
    <div class="page-content">
      <Button label="Show" icon="pi pi-external-link" @click="issueStore.openIssueModal" />
    </div>
    <IssueForm />
  </main>
</template>

<style lang="scss" scoped>
  .page-content {
    margin: 6rem;
  }
</style>