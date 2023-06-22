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
import { useSprintStore } from '../stores/sprint';
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const isLoaded = ref(false)

const userStore = useAuthStore()
const teamStore = useTeamStore()
const issueStore = useIssueStore()
const projectStore = useProjectStore()
const sprintStore = useSprintStore()

const state = reactive({
  team: {},
  issues: [],
})
const sprint_config = reactive({
  dates: [],
  sprint_state: "",
  goal: ""
})
const sprint_backlog = reactive({
  active_sprint: {},
  active_sprint_issues: [],
  planning_sprints: [],
})

const teamLabelText = computed(() => {
  return `${state.team.team_name} Team`
})

const doSprintsExist = computed(() => {
  return sprint_backlog.active_sprint || sprint_backlog.planning_sprints.length;
})

function selectIssue(issue) {
  router.push({
    name: 'issue-details',
    params: { id: issue._id }
  })
}

async function createSprint(startDayInput, endDayInput) {
  const data = {
    team_id: state.team._id,
    startDate: startDayInput,
    endDate: endDayInput,
    goal: sprint_config.goal
  }
  const response = await sprintStore.create(data);
  if (response.message) {
    showError(response.message);
  }
}

async function submitSprint(event) {
  event.preventDefault();
  const startDayInput = sprint_config.dates[0];
  const endDayInput = sprint_config.dates[1];
  if (!startDayInput || !endDayInput) {
    showError("The selected start and end dates for the sprint are invalid.\nPlease choose valid start and end dates for the sprint.")
  } else {
    startDayInput.setDate(startDayInput.getDate() + 1);
    endDayInput.setDate(endDayInput.getDate() + 1);
    await createSprint(event, startDayInput, endDayInput);
  }
}

async function handleData(id) {
  state.team = await teamStore.getTeamById(id);
  const projects = await projectStore.getTeamProjects(id);
  projects.forEach(async (project) => {
    const project_issues = await issueStore.getProjectIssues(project._id);
    state.issues = state.issues.concat(project_issues);
  })
  const sprints = await sprintStore.getSprints();
  sprint_backlog.active_sprint = sprints.find(sprint => sprint.state === 'active');
  sprint_backlog.planning_sprints = sprints.filter(sprint => sprint.state === 'planning');
  if (sprint_backlog.active_sprint?.issues?.length) {
    sprint_backlog.active_sprint_issues = sprint_backlog.active_sprint.issues.map(async (id) => await issueStore.getIssueById(id))
  }
  console.log(sprint_backlog);
}

function showError(message) {
  toast.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 })
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
            <div class="pb-label">Product Backlog</div>
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
          <ScrollPanel v-if="doSprintsExist" class="backlog-panel">
            <div class="pb-label">Sprint Backlog</div>
            <div class="w-full h-full" v-if="sprint_backlog.active_sprint">
              <draggable
                item-key="_id"
                class="drag-column"
                :options="{clone: true}"
                v-model="sprint_backlog.active_sprint_issues"
                tag="div"
                :animation="300"
                group="state.issues"
              >
                <template #item="{ element: issue }">
                  <IssueBacklogCard :issue="issue" @dblclick="selectIssue(issue)" />
                </template>
              </draggable>
            </div>
          </ScrollPanel>
          <ScrollPanel v-else class="backlog-panel">
            <div class="flex flex-column align-items-center mb-2">
              <span class="label">No active sprint</span>
              <span class="label plan">Plan a sprint</span>
            </div>
            <form @submit="submitSprint">
              <div class="card flex flex-column justify-content-center pl-7 pr-7">
                <span class="text-label mt-3 mb-1">Choose iteration timespan:</span>
                <Calendar 
                  v-model="sprint_config.dates"
                  selectionMode="range"
                  inline 
                  showIcon />
                <span class="text-label mt-3 mb-1">Enter sprint goal:</span>
                <Textarea v-model="sprint_config.goal" style="width: 100%; height:4rem" />
                <div class="flex w-full justify-content-center">
                  <button type="submit" class="plan-btn">Plan Sprint</button>
                </div>
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
  <Toast />
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
  width: 100%;
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
  font-size: 0.9rem;
  color: $dark-grey;
  font-weight: 600;
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
  margin-bottom: -0.3rem;
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

.pb-label {
  color: $dark-grey;
  font-weight: 600;
  margin: 0.3rem 1.3rem 1rem;
  padding-bottom: 0.4rem;
  width: fit-content;
  border-bottom: 1.6px solid $grey;
}

:deep(.p-datepicker table td > span.p-highlight) {
  color: $white;
  background: linear-gradient(
    180deg,
    rgb(178, 189, 241) 0%,
    rgb(218, 212, 237) 56%,
    rgb(178, 189, 241) 100%
  );
  border: 2px solid $white;
}
</style>
