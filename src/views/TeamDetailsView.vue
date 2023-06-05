<script setup>
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
import { useAuthStore } from '../stores/auth'
import { useTeamStore } from '../stores/team'
import { useProjectStore } from '../stores/project'
import { useUploadsStore } from '../stores/uploads'
import { ref, computed, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const userStore = useAuthStore()
const teamStore = useTeamStore()
const projectStore = useProjectStore()
const uploadsStore = useUploadsStore()
const route = useRoute()
const router = useRouter()
const toast = useToast()

const isLoaded = ref(false)

const state = reactive({
  team: {},
  projects: [],
  members: [],
  team_leader: {}
})
const images = reactive([]);

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
    await fetchUserImage(id)
    state.members.push(user)
  })

  if (state.team.team_leader_id) {
    state.team_leader = await userStore.getUserById(state.team.team_leader_id)
    await fetchUserImage(state.team.team_leader_id)
  } else {
    state.team_leader = '-';
  }
}

async function joinTeam() {
  const my_id = userStore.userData._id;
  const team_id = state.team._id;

  const response = await teamStore.joinTeam(team_id, my_id);
  if (response.message) {
    showError(response.message);
  } else {
    showJoinSuccess(state.team.team_name);
  }
}

function getUserImage(user_id) {
  if (images[user_id]) {
    return images[user_id];
  }
}

async function fetchUserImage(user_id) {
  const image = await uploadsStore.getImage(user_id);
  if (image) {
    images[user_id]=`data:${image.image.contentType};base64,${image.image.data}`;
  }  
}

function viewBoard() {
  router.replace({
    name: 'board',
    params: { id: route.params.id }
  })
}

function viewBacklog() {
  router.replace({
    name: 'team-backlog',
    params: { id: route.params.id }
  })
}

function showError(message) {
  toast.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 })
}

function showJoinSuccess(team) {
  toast.add({ severity: 'success', summary: 'Joined team successfully', detail: `You are now a member of team ${team}!`, life: 3000 })
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
        <div class="flex flex-column w-fit mt-3">
          <span class="name-label">{{ state.team.team_name }}</span>
          <div  v-if="!amIMemberOfTeam" class="flex flex-column mt-3">
            <span class="not-a-member-text">You are not a member of this team.</span>
            <button class="join-btn" @click="joinTeam">Join Team</button>
          </div>
        </div>
        <Divider />
        <div class="flex flex-row mt-4 w-12">
          <div class="flex flex-column" style="width: 30%">
            <div
              v-if="state.team_leader !== '-'"
              class="flex flex-row align-items-center container"
            >
              <span class="lead-by">Lead by: </span>
              <img
                v-if="images[state.team_leader._id]"
                class="prf-image ml-3 mr-2"
                :src="getUserImage(state.team_leader._id)" 
              >
              <img
                v-else
                src="../assets/default-user-icon.jpg"
                class="prf-image ml-2 mr-2"
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
                  <img
                    v-if="images[slotProps.option._id]"
                    class="prf-image mr-2"
                    :src="getUserImage(slotProps.option._id)" 
                  >
                  <img
                    v-else
                    src="../assets/default-user-icon.jpg"
                    class="prf-image mr-2"
                  />
                  <div>{{ userFullname(slotProps.option) }}</div>
                </div>
              </template>
            </Listbox>
          </div>
          <div class="container flex flex-column ml-3 h-full">
            <button class="btn" @click="viewBoard">View Board</button>
            <button class="btn" @click="viewBacklog">View Backlog</button>
          </div>
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
  padding: 1rem 2rem 1rem 2rem;
  font-family: $pt-sans-font;
  width: 100%;
}

.name-label {
  font-size: 2.1rem;
  color: $dark-grey;
  font-weight: 600;
}
.prf-image {
  width: 1.9rem;
  height: 1.9rem;
  border-radius: 50%;
  box-shadow: $box-shadow1;
  border: 0.9px solid $light-grey;
  object-fit: cover;
}

.not-a-member-text {
  font-size: 0.9rem;
  color: $grey;
}

.join-btn {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: $pt-sans-font;
  margin-top: 0.5rem;
  width: fit-content;
  margin-right: 1.1rem;
  padding: 0.4rem 0.8rem;
  border-radius: 7px;
  background-color: $light-purple;
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
  padding: 0.6rem 0.7rem;
  margin: 0.4rem 0.6rem;
  color: $black-2;
  font-size: 0.9rem;
  border: 2px solid $light-grey;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: $box-shadow1;
}
</style>
