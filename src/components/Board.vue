<script setup>
import { ref, reactive, onMounted } from 'vue'
import draggable from 'vuedraggable'
import IssueCard from './IssueCard.vue'
import { useIssueStore } from '../stores/issue'
import { useTeamStore } from '../stores/team'
import { useProjectStore } from '../stores/project'
import { useRoute } from 'vue-router'

const issueStore = useIssueStore()
const projectStore = useProjectStore()
const route = useRoute()

const state = reactive({
  issues: [],
  openIssues: [],
  inProgressIssues: [],
  inReviewIssues: [],
  doneIssues: []
})

onMounted(async () => {
  const id = route.params.id;
  const projects = await projectStore.getTeamProjects(id);
  projects.forEach(async (project) => {
    const issues = await issueStore.getProjectIssues(project._id);
    const project_name = project.project_name;
    issues.forEach(async (issue) => {
      let propIssue = issue;
      propIssue['project_name'] = project_name;
      switch (issue.status) {
        case 'open':
          state.openIssues.push(issue);
          break;
        case 'in progress':
          state.inProgressIssues.push(issue);
          break;
        case 'in review':
          state.inReviewIssues.push(issue);
          break;
        case 'done':
          state.doneIssues.push(issue);
          break;
      }
    })
  })
})
</script>

<template>
  <div class="flex flex-row">
    <div class="flex flex-column align-items-center">
      <h1 class="column-label">OPEN</h1>
      <draggable v-model="state.openIssues" group="state.issues">
        <template #item="{ element: issue }">
          <IssueCard :issue="issue" />
        </template>
      </draggable>
    </div>
    <Divider layout="vertical" />
    <div class="flex flex-column">
      <h1 class="column-label">IN PROGRESS</h1>
      <draggable v-model="state.inProgressIssues" group="state.issues">
        <template #item="{ element: issue }">
          <IssueCard :issue="issue" />
        </template>
      </draggable>
    </div>
    <Divider layout="vertical" />
    <div class="flex flex-column">
      <h1 class="column-label">IN REVIEW</h1>
      <draggable v-model="state.inReviewIssues" group="state.issues">
        <template #item="{ element: issue }">
          <IssueCard :issue="issue" />
        </template>
      </draggable>
    </div>
    <Divider layout="vertical" />
    <div class="flex flex-column">
      <h1 class="column-label">DONE</h1>
      <draggable v-model="state.doneIssues" group="state.issues">
        <template #item="{ element: issue }">
          <IssueCard :issue="issue" />
        </template>
      </draggable>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.column-label {
  color: $dark-grey;
  font-family: $pt-sans-font;
  padding: 0 2rem;
  font-size: 1.5rem;
}
</style>
