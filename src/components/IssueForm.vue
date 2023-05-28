<script setup>
import { computed, ref, reactive, onMounted, watch } from 'vue'
import { useIssueStore } from '../stores/issue'
import { useAuthStore } from '../stores/auth'
import { useProjectStore } from '../stores/project'
import { useTeamStore } from '../stores/team'
import { useToast } from 'primevue/usetoast'
import { priorities, story_points } from '../utils/constants'

const props = defineProps({
  projectId: {
    type: String
  }
})

const toast = useToast()

const teamStore = useTeamStore()
const projectStore = useProjectStore()
const authStore = useAuthStore()
const issueStore = useIssueStore()

const state = reactive({
  issue_name: '',
  labels: [],
  story_points: '',
  priority: '',
  assignee: '',
  goal: '',
  description: '',
  project: {},
  userProjects: [],
  teamMembers: []
})

const assigneeCheck = ref(false)

const modalState = computed(() => {
  return issueStore.modalState
})

function handleClose() {
  if (issueStore.modalState === true) {
    issueStore.closeIssueModal()
  }
}

async function onSubmit() {
  const myId = authStore.userData.id

  const data = {
    issue_name: state?.issue_name,
    creator_id: myId,
    project_id: state?.project._id,
    labels: state?.labels,
    priority: state?.priority.level,
    assignee_id: state?.assignee._id,
    goal: state?.goal,
    description: state?.description,
    story_points: state?.story_points
  }

  await issueStore
    .create(data)
    .then((res) => {
      showSuccess()
      issueStore.closeIssueModal()
    })
    .catch((err) => {
      showError(err.message)
    })
}

const showSuccess = () => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: `Issue was created successfully!`,
    life: 3000
  })
}

const showError = (message) => {
  toast.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 })
}

const makeCheckFalse = () => {
  assigneeCheck.value = false;
}

const removeSelectedAssignee = () => {
  state.assignee = '';
}

const fetchTeamMembers = async () => {
  const team = await teamStore.getTeamById(state.project.team_id)
  team.members_ids.forEach(async (id) => {
    const member = await authStore.getUserById(id)
    member['fullName'] = `${member.forename} ${member.surname}`
    state.teamMembers.push(member)
  })
}

const selectProject = async () => {
  if (state.project) {
    await fetchTeamMembers()
  } else {
    state.assignee = "";
    state.teamMembers = [];
  }
}

const handleData = async () => {
  if (!props?.projectId) {
    const allProjects = await projectStore.getAllProjects();
    await teamStore.getUserTeams(authStore.userData.id);
    const teamsIds = teamStore.userTeams.map(team => team._id)
    state.userProjects = allProjects.filter(project => teamsIds.includes(project.team_id));
  } else {
    state.project = await projectStore.getProjectById(props.projectId)
    await fetchTeamMembers()
  }
}

onMounted(async () => {
  await authStore.getUser()
  await handleData()
})
</script>

<template>
  <main>
    <Dialog
      :visible="modalState"
      modal
      @update:visible="handleClose"
      :style="{ width: '50vw' }"
      :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
    >
      <div class="header-text">
        <span>Create a new issue</span>
      </div>
      <div class="container">
        <form class="form">
          <div class="flex flex-column field-section">
            <p class="field-text">Title of issue</p>
            <InputText type="text" v-model="state.issue_name" />
          </div>
          <div class="flex flex-row">
            <div class="flex flex-column field-section">
              <p class="field-text">Add labels</p>
              <Chips v-model="state.labels" showClear optionLabel="labels" />
            </div>
            <div class="flex flex-column field-section">
              <p class="field-text">Story points</p>
              <Dropdown
                v-model="state.story_points"
                :options="story_points"
              />
            </div>
          </div>
          <div v-if="!props.projectId" class="flex flex-column field-section">
            <p class="field-text">Project</p>
            <Dropdown
              v-model="state.project"
              :options="state.userProjects"
              @update:modelValue="selectProject"
              showClear
              optionLabel="project_name"
            />
          </div>
          <div class="flex flex-column field-section">
            <p class="field-text">Priority</p>
            <Dropdown
              v-model="state.priority"
              :options="priorities"
              showClear
              optionLabel="level"
            />
          </div>
          <div class="flex flex-row align-items-center justify-content-center">
            <div class="flex flex-column field-section">
              <p class="field-text">Assign contributor</p>
              <div class="flex flex-row align-items-center">
                <Dropdown
                  v-model="state.assignee"
                  :options="state.teamMembers"
                  showClear
                  optionLabel="fullName"
                  style="width: 70%"
                  @update:modelValue="makeCheckFalse"
                />
                <div class="ml-3">
                  <Checkbox v-model="assigneeCheck" :binary="true" @change="removeSelectedAssignee" />
                  <label class="ml-2"> Assign to me </label>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-column field-section">
            <p class="field-text">Goal</p>
            <Textarea v-model="state.goal" rows="4" style="width: 100%" />
          </div>
          <div class="flex flex-column field-section">
            <p class="field-text">Description</p>
            <Textarea v-model="state.description" rows="6" style="width: 100%" />
          </div>
          <button type="submit" class="form-btn shadow-2" @click.prevent="onSubmit">
            Create issue
          </button>
        </form>
      </div>
    </Dialog>
  </main>
  <Toast />
</template>

<style lang="scss" scoped>
.header-text {
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: $pt-sans-font;
  color: $main-purple;
  font-size: 2rem;
}

.container {
  padding: 0.5rem 1rem;
}

.form {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: $whiteish;
  border-radius: 3px;
  margin-bottom: 1.5rem;
  padding: 1rem 2rem;
}

.field-section {
  width: 100%;
  padding: 0 0.4rem 0.5rem 0.4rem;

  .field-text {
    font-size: 1rem;
    margin-bottom: 0.8rem;
    color: $main-purple;
  }
}

.form-btn {
  height: 2.7rem;
  margin-top: 1.5rem;
  width: 100%;
  font-size: 1rem;
  font-family: $pt-sans-font;
  background-color: #8a6196;
  border: 2px solid #8a6196;
  border-radius: 0.2rem;
  color: $white;
  align-self: center;
  cursor: pointer;
  min-width: 20rem;
}
</style>
