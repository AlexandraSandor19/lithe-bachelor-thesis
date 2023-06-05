<script setup>
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
import { ref, reactive, onMounted, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useTeamStore } from '../stores/team'
import { useProjectStore } from '../stores/project'
import TeamForm from '../components/TeamForm.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const userStore = useAuthStore()
const teamStore = useTeamStore()
const projectStore = useProjectStore()

const selectedTeam = ref()
const metaKey = ref(true)

const myTeamsData = reactive([])
const suggestedTeamsData = reactive([])

async function selectTeam(event) {
  router.push({
    name: 'team-details',
    params: { id: event.data.team._id }
  })
}

async function getLeadFullname(id) {
  if (id) {
    const tl = await userStore.getUserById(id)
    return `${tl.forename} ${tl.surname}`
  }
  return '-'
}

async function noProjectsOfTeam(team_id) {
  return projectStore.allProjects.filter((project) => project.team_id === team_id).length
}

function amIMemberOfTeam(team) {
  return team.members_ids.includes(userStore.userData._id)
}

async function handleData() {
  await teamStore.getAllTeams()
  await projectStore.getAllProjects()

  teamStore.allTeams.forEach(async (team) => {
    const tl = await getLeadFullname(team.team_leader_id)
    const noProjects = await noProjectsOfTeam(team._id)
    if (amIMemberOfTeam(team)) {
      myTeamsData.push({
        team: team,
        leader: tl,
        noOfProjects: noProjects
      })
    } else {
      suggestedTeamsData.push({
        team: team,
        leader: tl,
        noOfProjects: noProjects
      })
    }
  })
}

onMounted(async () => {
  await userStore.getUser()
  await handleData()
})
</script>

<template>
  <main>
    <Header />
    <div class="flex flex-row">
      <Sidebar />
      <div class="page-content">
        <Divider align="left" type="solid">
          <span class="teams-label">Teams</span>
        </Divider>
        <div class="flex flex-row justify-content-between align-items-center pl-2 pt-2">
          <span class="my-teams-label">
            <span class="pi pi-star-fill mr-1" style="font-size: 0.9rem"></span>
            My teams
          </span>
          <button class="create-btn" @click="teamStore.openTeamModal">
            <span class="pi pi-plus-circle pr-2" style="font-size: 0.9rem"></span>
            Create a team
          </button>
        </div>
        <div class="team-table">
          <DataTable
            v-model:selection="selectedTeam"
            :value="myTeamsData"
            :metaKeySelection="metaKey"
            selectionMode="single"
            @rowSelect="selectTeam"
            tableStyle="width: 100%"
          >
            <Column field="team.team_name" header="Team" style="font-weight: 600"></Column>
            <Column field="leader" header="Team Leader"></Column>
            <Column field="noOfProjects" header="Number of Projects"></Column>
          </DataTable>
        </div>
        <div class="flex flex-row justify-content-between align-items-center pl-2 pt-2 mt-4">
          <span class="my-teams-label">
            <span class="pi pi-star mr-1" style="font-size: 0.9rem"></span>
            Teams you may know
          </span>
        </div>
        <div class="team-table mb-3">
          <DataTable 
            :value="suggestedTeamsData" 
            :metaKeySelection="metaKey"
            selectionMode="single"
            @rowSelect="selectTeam"
            tableStyle="width: 100%">
            <Column field="team.team_name" header="Team" style="font-weight: 600"></Column>
            <Column field="leader" header="Lead"></Column>
            <Column field="noOfProjects" header="Number of Projects"></Column>
          </DataTable>
        </div>
      </div>
    </div>
    <TeamForm />
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

:deep(.p-divider-content) {
  font-size: 2.5rem;
  color: $main-purple;
  background-color: $eggshell;
}

.team-table {
  box-shadow: $box-shadow1;
  margin-top: 1rem;
  margin-right: 1rem;
  padding: 0.2rem 0.3rem 1rem 0.3rem;
  border: 1px solid $whiteish;
  border-radius: 5px;

  :deep(.p-column-title) {
    font-family: $pt-sans-font;
    color: $black-2;
    font-size: 1rem;
  }

  :deep(td) {
    font-family: $pt-sans-font;
    color: $grey;
    font-size: 1rem;
  }
}

.my-teams-label {
  color: $grey;
  font-size: 1.1rem;
}

.create-btn {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: $pt-sans-font;
  margin-right: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  background-color: $yellow;
  letter-spacing: 0.9px;
  color: $white;
  font-size: 0.9rem;
  border: 1px solid $yellow1;
  cursor: pointer;
}
</style>
