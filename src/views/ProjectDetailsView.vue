<script setup>
import Header from '../components/Header.vue'
import IssueForm from '../components/IssueForm.vue'
import Sidebar from '../components/Sidebar.vue'
import { useAuthStore } from '../stores/auth'
import { useTeamStore } from '../stores/team'
import { useProjectStore } from '../stores/project'
import { useIssueStore } from '../stores/issue'
import { ref, computed, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const userStore = useAuthStore()
const teamStore = useTeamStore()
const issueStore = useIssueStore()
const projectStore = useProjectStore()
const router = useRouter()
const route = useRoute()

const isLoaded = ref(false)
const metaKey = ref(true)

const state = reactive({
  user: {},
  project: {},
  tableData: [],
  product_owner: {},
  isUserInTeam: false,
})

async function handleData() {
  const id = route.params.id
  state.user = await userStore.getUser();
  state.project = await projectStore.getProjectById(id)
  const team = await teamStore.getTeamById(state.project.team_id);
  state.isUserInTeam = team.members_ids.includes(state.user.id);
  const issues = await issueStore.getProjectIssues(id)
  issues.forEach(async (issue) => {
    const assignor = await userStore.getUserById(issue.creator_id)
    const assignee = issue?.assignee_id ? await userStore.getUserById(issue.assignee_id) : ""
    state.tableData.push({
      issue: issue,
      assignee: assignee ? `${assignee.forename} ${assignee.surname}` : "",
      assignor: `${assignor.forename} ${assignor.surname}`
    })
  })
  state.product_owner = state.project.po_id ? await userStore.getUser(state.project?.po_id) : '-'
}

function selectIssue(event) {
  router.replace({
    name: 'issue-details',
    params: { id: event.data.issue._id }
  })
}

onMounted(async () => {
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
          <span class="name-label">{{ state.project.project_name }}</span>
        </div>
        <Divider />
        <div class="label-section">
          <span 
            class="project-label" 
            v-for="label in state.project.labels"
            >
            {{ label }}
          </span>
        </div>
        <div class="flex flex-column mt-4 w-12">
          <div class="flex flex-row w-12">
            <div class="container po">
              <div class="label">Product Owner:</div>
              <Avatar
                style="width: 1.6rem; height: 1.6rem"
                image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                class="mr-2 ml-3"
                shape="circle"
              />
              <div>Andrew Thomas</div>
            </div>
            <div class="container repo">
              <div class="label">Project Repository: </div>
              {{ state.project.repository_url }}
            </div>
          </div>
          <div class="container table">
            <div class="flex flex-row justify-content-between align-items-center">
              <span class="label issues">Open Issues</span>
              <button 
                v-if="state.isUserInTeam" 
                class="create-btn"
                @click="issueStore.openIssueModal"
                >
                <span class="pi pi-plus-circle pr-2" style="font-size: 0.9rem"></span>
                Create Issue
              </button>
            </div>
            <Divider />
            <div class="w-12">
              <DataTable
                :value="state.tableData"
                :metaKeySelection="metaKey"
                selectionMode="single"
                @rowSelect="selectIssue"
              >
                <Column field="issue.issue_name" header="Issue" style="font-weight: 600"></Column>
                <Column header="Assignor">
                  <template #body="slotProps">
                    <div class="flex flex-row align-items-center ">
                      <Avatar
                        style="width: 1.6rem; height: 1.6rem"
                        image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                        class="mr-2 ml-3"
                        shape="circle"
                      />
                      <span>{{ slotProps.data.assignor }}</span>
                    </div>
                  </template>
                </Column>
                <Column field="assignee" header="Assignee">
                  <template #body="slotProps">
                    <div v-if="slotProps.data.assignee !== ''" class="flex flex-row align-items-center ">
                      <Avatar
                        style="width: 1.6rem; height: 1.6rem"
                        image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                        class="mr-2 ml-3"
                        shape="circle"
                      />
                      <span>{{ slotProps.data.assignee }}</span>
                    </div>
                    <div class="flex flex-row align-items-center ml-3" v-else>
                      <span class="pi pi-question-circle text-lg"></span>
                    </div>
                  </template>
                </Column>
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
    <IssueForm :projectId="state.project._id"/>
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

.labels {
  display: flex;
  flex-direction: row;
}

.container {
  display: flex;
  padding: 1.5rem 1rem;
  border: 1px solid $whiteish;
  border-radius: 5px;
  box-shadow: $box-shadow1;
  background-color: $white;

  &.po {
    min-width: fit-content;
  }

  &.repo {
    margin-left: 1rem;
    width: 100%;
  }

  &.table {
    width: 100%;
    margin-top: 1rem;
    padding: 1rem 1rem;
    flex-direction: column;

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
}

.label-section {
  display: flex;
  flex-direction: row;
  padding: 0.5rem 0.5rem;
  margin-top: 1rem;

  .project-label {
    padding: 0.4rem 0.7rem;
    border: 1px solid $whiteish;
    border-radius: 15%;
    margin-right: 0.8rem;
    font-weight: 600;
    color: $dark-grey;
    background-color: $white;
  }
}

.label {
  color: $dark-grey;
  font-size: 1.05rem;

  &.issues {
    margin-left: 0.5rem;
  }
}

.name-label {
  font-size: 2rem;
  color: $black-1;
  padding: 0.3rem 1rem;
  border-radius: 10px;
  box-shadow: $box-shadow1;
  border: 1px solid $whiteish;
  border-top: 3px solid $main-purple;
  border-bottom: 3px solid $main-purple;
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
