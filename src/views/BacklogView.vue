<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
import draggable from 'vuedraggable'
import IssueCard from '../components/IssueCard.vue'
import { useAuthStore } from '../stores/auth'
import { useTeamStore } from '../stores/team'
import { useIssueStore } from '../stores/issue'
import { useProjectStore } from '../stores/project'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isLoaded = ref(false)

const userStore = useAuthStore()
const teamStore = useTeamStore()
const issueStore = useIssueStore()
const projectStore = useProjectStore()

const state = reactive({
  team: {},
  issues: []
})

const teamLabelText = computed(() => {
  return `${state.team.team_name} Team`
})

async function handleData(id) {
  state.team = await teamStore.getTeamById(id);
  const projects = await projectStore.getTeamProjects(id);
  console.log(projects);
  projects.forEach(async (project) => {
    const project_issues = await issueStore.getProjectIssues(project._id);
    state.issues = state.issues.concat(project_issues);
  })
}

function selectIssue(issue) {
  router.push({
    name: 'issue-details',
    params: { id: issue._id }
  })
}

onMounted(async () => {
  await userStore.getUser()
  const id = route.params.id;
  await handleData(id);
  isLoaded.value = true;
})
</script>

<template>
  <main v-if="isLoaded">
    <Header />
    <div class="flex flex-row">
      <Sidebar />
      <div class="page-content">
        <div class="flex flex-column">
          <span class="name-label">Backlog</span>
          <span class="team-label"> {{ teamLabelText }} </span>
        </div>
        <Divider />
        <draggable
          item-key="_id"
          class="drag-column"
          :options="{clone: true}"
          v-model="state.issues"
          tag="div"
          :animation="300"
          group="state.issues"
        >
          <template #item="{ element: issue }">
            <div @dblclick="selectIssue(issue)"> {{ issue.issue_name }}</div>
          </template>
        </draggable>
      </div>
    </div>
  </main>
  <main class="flex flex-column align-items-center justify-content-center" v-else>
    <ProgressSpinner style="width: 80px; height: 80px" strokeWidth="5" animationDuration=".5s" />
  </main>
</template>

<style lang="scss" scoped>
main {
  background-color: $eggshell;
  min-height: 100vh;
}
.page-content {
  margin-left: 18rem;
  padding: 2rem 2.5rem;
  font-family: $pt-sans-font;
  width: 100%;
}

.name-label {
  font-size: 2.1rem;
  color: $dark-grey;
  font-weight: 600;
}

.team-label {
  font-size: 1rem;
  margin-top: 0.5rem;
  color: $grey;
}
</style>
