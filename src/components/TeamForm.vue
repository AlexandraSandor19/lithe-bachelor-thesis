<script setup>
import { computed, ref, reactive, onMounted } from 'vue'
import { useTeamStore } from '../stores/team'
import { useAuthStore } from '../stores/auth'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const teamStore = useTeamStore()
const authStore = useAuthStore()

const state = reactive({
  team_name: '',
  members: [],
  team_leader: ''
})

const tlChecked = ref(false)

const modalState = computed(() => {
  return teamStore.modalState
})

function handleClose() {
  if (teamStore.modalState === true) {
    teamStore.closeTeamModal()
  }
}

const memberOptions = computed(() => {
  return authStore.allUsers.filter((user) => user.id !== authStore.userData.id)
})

function removeSelectedLeader() {
  state.team_leader = ''
}

function makeTlCheckFalse() {
  tlChecked.value = false
}

async function onSubmit() {
  const myId = authStore.userData.id
  const members_ids = state.members.map((member) => member.id)

  const data = {
    team_name: state.team_name,
    members_ids,
    creator_id: myId,
    team_leader_id: tlChecked ? myId : state.team_leader.id
  }

  await teamStore
    .create(data)
    .then((res) => {
      showSuccess()
    })
    .catch((err) => {
      showError(err.message)
    })
}

const showSuccess = () => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: `Team ${state.team_name} was created successfully!`,
    life: 3000
  })
}

const showError = (message) => {
  toast.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 })
}

onMounted(async () => {
  await authStore.getUser()
  await authStore.getUsers()
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
        <span>Create a new team</span>
      </div>
      <div class="container">
        <form class="form">
          <div class="flex flex-column field-section">
            <p class="field-text">What's the name of the team?</p>
            <InputText type="text" v-model="state.team_name" />
          </div>
          <div class="flex flex-column field-section">
            <p class="field-text">Select one ore more team members</p>
            <MultiSelect
              v-model="state.members"
              display="chip"
              :options="memberOptions"
              optionLabel="forename"
              :maxSelectedLabels="3"
              class="w-full"
            />
          </div>
          <div class="flex flex-row align-items-center justify-content-center">
            <div class="flex flex-column field-section">
              <p class="field-text">Select a team leader</p>
              <div class="flex flex-row align-items-center">
                <Dropdown
                  v-model="state.team_leader"
                  :options="state.members"
                  style="width: 60%"
                  showClear
                  optionLabel="forename"
                  @update:modelValue="makeTlCheckFalse"
                />
                <div class="ml-3">
                  <Checkbox v-model="tlChecked" :binary="true" @change="removeSelectedLeader" />
                  <label class="ml-2"> I will be the team leader </label>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" class="form-btn shadow-2" @click.prevent="onSubmit">
            Create team
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
