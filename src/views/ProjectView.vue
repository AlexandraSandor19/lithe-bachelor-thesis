<script setup>
import { ref, onMounted, reactive } from 'vue'
import Header from '../components/Header.vue'
import ProjectForm from '../components/ProjectForm.vue'
import Sidebar from '../components/Sidebar.vue'
import { useAuthStore } from '../stores/auth'
import { useProjectStore } from '../stores/project'
import { useTeamStore } from '../stores/team'
import { useRouter } from 'vue-router'

const router = useRouter()

const teamStore = useTeamStore()
const projectStore = useProjectStore()
const userStore = useAuthStore()

const metaKey = ref(true)
const state = reactive({
  projects: []
})

function selectProject(event) {
  router.push({
    name: 'project-details',
    params: { id: event.data._id }
  })
}

onMounted(async () => {
  await userStore.getUser()
  await teamStore.getUserTeams(userStore.userData.id)
  await projectStore.getAllProjects()
  const teams_ids = teamStore.userTeams.map(team => team._id)
  state.projects = projectStore.allProjects.filter(project => teams_ids.includes(project.team_id))
})
</script>

<template>
  <main>
    <Header />
    <div class="flex flex-row">
      <Sidebar />
      <div class="page-content">
        <Divider align="left" type="solid">
          <span class="project-label">Projects</span>
        </Divider>
        <div class="flex flex-row justify-content-between align-items-center pl-2 pt-2">
          <span class="my-projects-label"> My Projects </span>
          <button class="create-btn" @click="projectStore.openProjectModal">
            <span class="pi pi-plus-circle pr-2" style="font-size: 0.9rem"></span>
            Create a project
          </button>
        </div>
        <div class="project-table">
          <DataTable
            :value="state.projects"
            tableStyle="width: 100%"
            :metaKeySelection="metaKey"
            selectionMode="single"
            @rowSelect="selectProject"
          >
            <Column field="project_name" header="Project" style="font-weight: 600"></Column>
          </DataTable>
        </div>
      </div>
    </div>
    <ProjectForm />
  </main>
</template>

<style lang="scss" scoped>
main {
  background-color: $eggshell;
  min-height: 100vh;
}
.page-content {
  margin-left: 18rem;
  padding: 1.5rem 2rem 1rem 2rem;
  width: 100%;
}

:deep(.p-divider-content) {
  font-size: 2.5rem;
  color: $main-purple;
  background-color: $eggshell;
}

.project-table {
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

.my-projects-label {
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
