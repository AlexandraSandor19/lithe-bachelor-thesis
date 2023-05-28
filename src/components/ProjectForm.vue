<script setup>
import { computed, ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useProjectStore } from '../stores/project'
import { useTeamStore } from '../stores/team'
import { useToast } from 'primevue/usetoast'
const toast = useToast()

const projectStore = useProjectStore()
const authStore = useAuthStore()
const teamStore = useTeamStore()

const state = reactive({
  project_name: '',
  team: '',
  labels: [],
  repository_URL: '',
  po: ''
})

const po_options = computed(() => {
  return authStore.allUsers.filter((user) => user.role === 'Product Owner')
})

const myTeams = computed(() => {
  return teamStore.allTeams.filter((team) => team.members_ids.includes(authStore.userData._id))
})

const modalState = computed(() => {
  return projectStore.modalState
})

async function onSubmit() {
  const myId = authStore.userData.id

  const data = {
    project_name: state.project_name,
    team_id: state.team._id,
    creator_id: myId,
    repository_url: state.repository_URL,
    labels: state.labels,
    po_id: state.po._id
  }

  await projectStore
    .create(data)
    .then((res) => {
      showSuccess()
    })
    .catch((err) => {
      showError(err.message)
    })
}

function handleClose() {
  if (projectStore.modalState === true) {
    projectStore.closeProjectModal()
  }
}

const showSuccess = () => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: `Project ${state.project_name} was created successfully!`,
    life: 3000
  })
}

const showError = (message) => {
  toast.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 })
}

onMounted(async () => {
  await authStore.getUser()
  await authStore.getUsers()
  await teamStore.getAllTeams()
})
</script>

<template>
  <main>
    <Dialog
      :visible="modalState"
      modal
      @update:visible="handleClose"
      :style="{ width: '60vw' }"
      :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
    >
      <div class="header-text">
        <span>Create a new project</span>
      </div>
      <div class="container">
        <form class="form">
          <div class="flex flex-column field-section">
            <p class="field-text">What's the name of the project?</p>
            <InputText type="text" v-model="state.project_name" />
          </div>
          <div class="flex flex-column field-section">
            <p class="field-text">Assign project to team</p>
            <Dropdown v-model="state.team" :options="myTeams" showClear optionLabel="team_name" />
          </div>
          <div class="flex flex-column field-section">
            <p class="field-text">Add labels</p>
            <Chips v-model="state.labels" showClear optionLabel="labels" />
          </div>
          <div class="flex flex-column field-section">
            <p class="field-text">Add project repository</p>
            <InputText type="text" v-bind="state.repository_URL" />
          </div>
          <div class="flex flex-column field-section">
            <p class="field-text">Select a product owner</p>
            <Dropdown v-model="state.po" :options="po_options" showClear optionLabel="surname" />
          </div>
          <button type="submit" class="form-btn shadow-2" @click.prevent="onSubmit">
            Create project
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
