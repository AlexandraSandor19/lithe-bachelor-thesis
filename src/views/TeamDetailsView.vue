<script setup>
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
import { useAuthStore } from '../stores/auth'
import { useTeamStore } from '../stores/team'
import { useProjectStore } from '../stores/project'
import { ref, computed, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const userStore = useAuthStore()
const teamStore = useTeamStore()
const projectStore = useProjectStore()
const route = useRoute()
const router = useRouter()

const isLoaded = ref(false)

const state = reactive({
  team: {},
  projects: [],
  members: [],
  team_leader: {}
})

const amIMemberOfTeam = computed(() => {
  return state.members?.map((member) => member._id).includes(userStore.userData._id)
})

function userFullname(user) {
  return user?.forename + ' ' + user?.surname
}

async function handleData() {
  const id = route.params.id
  state.team = await teamStore.getTeamById(id)
  state.projects = projectStore.allProjects.filter((project) => project.team_id === state.team._id)
  state.team.members_ids.forEach(async (id) => {
    const user = await userStore.getUserById(id)
    state.members.push(user)
  })
  state.team_leader = state.team.team_leader_id
    ? await userStore.getUserById(state.team.team_leader_id)
    : '-'
}

function viewBoard() {
  router.replace({
    name: 'board',
    params: { id: route.params.id }
  })
}

onMounted(async () => {
  await userStore.getUser()
  await projectStore.getAllProjects()
  await handleData()
  isLoaded.value = true
})
</script>

<template>
  <main v-if="isLoaded">
    <Header />
    <div class="flex flex-row w-12">
      <Sidebar />
      <div class="page-content">
        <div class="flex flex-row align-items-center justify-content-between mt-3">
          <span class="name-label">{{ state.team.team_name }}</span>
          <button v-if="!amIMemberOfTeam" class="join-btn">Join Team</button>
        </div>
        <Divider />
        <div class="flex flex-row mt-4 w-12">
          <div class="flex flex-column" style="width: 30%">
            <div
              v-if="state.team_leader !== '-'"
              class="flex flex-row align-items-center container"
            >
              <span class="lead-by">Lead by: </span>
              <Avatar
                style="width: 1.6rem; height: 1.6rem"
                image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                class="mr-2 ml-3"
                shape="circle"
              />
              <span class="leader">{{ userFullname(state.team_leader) }}</span>
            </div>
            <div v-else class="container lead-by">Lead by: -</div>
            <div class="container mt-3">
              <p class="label">Projects</p>
              <Listbox :options="state.projects" optionLabel="project_name" />
            </div>
          </div>
          <div class="container ml-3" style="width: 40%">
            <p class="label">Members</p>
            <Listbox :options="state.members" :optionLabel="forename">
              <template #option="slotProps">
                <div class="flex align-items-center">
                  <Avatar
                    style="width: 1.6rem; height: 1.6rem"
                    image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                    class="mr-2"
                    shape="circle"
                  />
                  <div>{{ userFullname(slotProps.option) }}</div>
                </div>
              </template>
            </Listbox>
          </div>
          <div class="container flex flex-column ml-3 h-full">
            <button class="btn" @click="viewBoard">View Board</button>
            <button class="btn">View Backlog</button>
          </div>
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
  padding: 1rem 2rem 1rem 2rem;
  font-family: $pt-sans-font;
  width: 100%;
}

.name-label {
  font-size: 2.5rem;
  color: $black-1;
  border: 1px solid $whiteish;
  border-top: 3px solid $main-purple;
  border-bottom: 3px solid $main-purple;
  padding: 0.3rem 1rem;
  border-radius: 10px;
  box-shadow: $box-shadow1;
}

.join-btn {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: $pt-sans-font;
  margin-right: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  background-color: $light-purple;
  letter-spacing: 0.9px;
  color: $white;
  font-size: 0.9rem;
  border: 1px solid $light-purple;
  cursor: pointer;
  box-shadow: $box-shadow1;
}

.container {
  padding: 1.6rem 1rem;
  border: 1px solid $whiteish;
  border-radius: 5px;
  box-shadow: $box-shadow1;
  background-color: $white;
}

.lead-by {
  color: $dark-grey;
  font-size: 1.05rem;
}

.leader {
  color: $black-2;
  font-size: 1rem;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}

.label {
  color: $dark-grey;
  font-size: 1.05rem;
  margin: 0;
  padding-bottom: 1rem;
}

.btn {
  padding: 0.8rem 0.7rem;
  margin: 0.4rem 0.6rem;
  color: $black-2;
  font-size: 0.9rem;
  border: 2px solid $light-grey;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: $box-shadow1;
}
</style>
