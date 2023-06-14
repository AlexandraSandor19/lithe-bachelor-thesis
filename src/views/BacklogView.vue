<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
import IssueBacklogCard from '../components/IssueBacklogCard.vue';
import draggable from 'vuedraggable'
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
  issues: [],
  sprint_issues: []
})
const sprint_config = reactive({
  dates: [],
  sprint_state: "",
  goal: ""
})

const teamLabelText = computed(() => {
  return `${state.team.team_name} Team`
})

function selectIssue(issue) {
  router.push({
    name: 'issue-details',
    params: { id: issue._id }
  })
}

function submitSprint(event) {
  event.preventDefault();


async function handleData(id) {
  state.team = await teamStore.getTeamById(id);
  const projects = await projectStore.getTeamProjects(id);
  projects.forEach(async (project) => {
    const project_issues = await issueStore.getProjectIssues(project._id);
    state.issues = state.issues.concat(project_issues);
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
        <div class="flex flex-row justify-content-between">
          <ScrollPanel class="backlog-panel">
            <span>Product Backlog</span>
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
                <IssueBacklogCard :issue="issue" @dblclick="selectIssue(issue)" />
              </template>
            </draggable>
          </ScrollPanel>
          <ScrollPanel v-if="state.sprint_issues.length" class="backlog-panel">
            <span>Sprint Backlog</span>
            <draggable
              item-key="_id"
              class="drag-column"
              :options="{clone: true}"
              v-model="state.sprint_issues"
              tag="div"
              :animation="300"
              group="state.issues"
            >
              <template #item="{ element: issue }">
                <IssueBacklogCard :issue="issue" @dblclick="selectIssue(issue)" />
              </template>
            </draggable>
          </ScrollPanel>
          <ScrollPanel v-else class="backlog-panel">
            <div class="flex flex-column align-items-center mb-2">
              <span class="label -1">No active sprint</span>
              <span class="label plan">Plan a sprint</span>
            </div>
            <form @submit="submitSprint">
              <div class="card flex flex-column justify-content-center pl-7 pr-7">
                <span class="text-label mt-3 mb-1">Choose iteration timespan:</span>
                <Calendar 
                v-model="sprint_config.dates"
                @update:modelValue="dateUpdate"
                selectionMode="range"
                inline 
                showIcon />
                <span class="text-label mt-3 mb-1">Enter sprint goal:</span>
                <Textarea v-model="sprint_config.goal" style="width: 100%; height:4rem" />
              </div>
              <div class="flex w-full justify-content-center">
                <button type="submit" class="plan-btn">Plan Sprint</button>
              </div>
            </form>
          </ScrollPanel>
        </div>
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

.drag-column {
  width: 100%;
  height: 100%;
}

.label {
  margin-top: 0.3rem;
  font-size: 1.2rem;
  color: $grey;
  font-weight: 600;
  
  &.plan {
    color: $main-purple;
    font-size: 1.8rem;
  }
}

.plan-btn {
  height: 2.5rem;
  width: 40%;
  margin-top: 1.2rem;
  font-size: 0.9rem;
  background-color: $main-purple;
  border: 2px solid $main-purple;
  border-radius: 0.2rem;
  color: $white;
  align-self: center;
  cursor: pointer;
}

.text-label {
  font-size: 1rem;
  color: $dark-grey;
}

.name-label {
  font-size: 2.1rem;
  color: $main-purple;
  font-weight: 600;
}

.team-label {
  font-size: 1rem;
  margin-top: 0.3rem;
  color: $grey;
}

.backlog-panel {
  height: 100vh;
  width: 48%;
  padding: 0.5rem 0.3rem;
  border: 1px solid $light-grey;
  box-shadow: $box-shadow2;
  border-radius: 5px;
  border-left: 2px solid $main-purple;
  border-right: 2px solid $main-purple;
}
</style>
