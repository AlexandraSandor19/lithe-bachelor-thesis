<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import Header from '../components/Header.vue'
import { useAuthStore } from '../stores/auth'
import { useIssueStore } from '../stores/issue'
import { useProjectStore } from '../stores/project'
import IssueForm from '../components/IssueForm.vue'
import Sidebar from '../components/Sidebar.vue'
import { useRoute, useRouter } from 'vue-router'

const userStore = useAuthStore()
const issueStore = useIssueStore()
const projectStore = useProjectStore()

const router = useRouter()

const state = reactive([])
const isLoaded = ref(false)
const metaKey = ref(true)

const openedByMe = computed(() => {
  const myId = userStore.userData.id
  return state.filter(object => object.issue.creator_id === myId)
})

const assignedToMe = computed(() => {
  const myId = userStore.userData.id
  return state.filter(object => object.issue.assignee_id === myId)
})

function selectIssue(event) {
  router.push({
    name: 'issue-details',
    params: { id: event.data.issue._id }
  })
}

async function handleData() {
  issueStore.allIssues.forEach(async (issue, index) => {
    const project = await projectStore.getProjectById(issue.project_id)
    const assignee = await userStore.getUserById(issue.assignee_id)
    const assignor = await userStore.getUserById(issue.creator_id)
    state.push({
      issue: issue,
      project: project.project_name,
      assignee: `${assignee.forename} ${assignee.surname}`,
      assignor: `${assignor.forename} ${assignor.surname}`
    })
  })
}

onMounted(async () => {
  await userStore.getUser()
  await issueStore.getAll()
  await handleData()
  console.log(state);
})
</script>

<template>
  <main>
    <Header />
    <div class="flex flex-row">
      <Sidebar />
      <div class="page-content">
        <Divider align="left" type="solid">
          <span class="issues-label">Issues</span>
        </Divider>
        <div class="flex flex-row justify-content-between align-items-center pl-2 pt-2">
          <span class="my-issues-label"> Issues opened by me </span>
          <button class="create-btn" @click="issueStore.openIssueModal">
            <span class="pi pi-plus-circle pr-2" style="font-size: 0.9rem"></span>
            Create an issue
          </button>
        </div>
        <div class="issue-table">
          <DataTable 
            :value="openedByMe" 
            tableStyle="width: 100%"
            :metaKeySelection="metaKey"
            selectionMode="single"
            @rowSelect="selectIssue"
            >
            <Column field="issue.issue_name" header="Issue" style="font-weight: 600"></Column>
            <Column field="project" header="Project">
              <template #body="slotProps">
                <span class="project-label">{{ slotProps.data.project }}</span>
              </template>
            </Column>
            <Column field="issue.status" header="Status"></Column>
            <Column field="assignee" header="Assignee">
              <template #body="slotProps">
                <div class="flex flex-row align-items-center ">
                  <Avatar
                    style="width: 1.6rem; height: 1.6rem"
                    image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                    class="mr-2 ml-3"
                    shape="circle"
                  />
                  <span>{{ slotProps.data.assignee }}</span>
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
        <div class="flex flex-row justify-content-between align-items-center pl-2 pt-5">
          <span class="my-issues-label"> Issues assigned to me </span>
        </div>
        <div class="issue-table">
          <DataTable 
            :value="assignedToMe" 
            tableStyle="width: 100%"
            :metaKeySelection="metaKey"
            selectionMode="single"
            @rowSelect="selectIssue"
            >
            <Column field="issue_name" header="Issue" style="font-weight: 600"></Column>
            <Column field="project_id" header="Project"></Column>
            <Column field="status" header="Status"></Column>
            <Column field="assignor" header="Assignor">
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
          </DataTable>
        </div>
      </div>
    </div>
    <IssueForm />
  </main>
</template>

<style lang="scss" scoped>
main {
  background-color: $eggshell;
  min-height: 100vh;
}

.page-content {
  margin-left: 18rem;
  padding: 1.5rem 1rem 1rem 2rem;
  width: 100%;
}

:deep(.p-divider-content) {
  font-size: 2.5rem;
  color: $main-purple;
  background-color: $eggshell;
}

.issue-table {
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

.my-issues-label {
  color: $grey;
  font-size: 1.1rem;
}

.project-label {
  background-color: pink;
  border-radius: 5px;
  padding: 0.4rem 0.7rem;
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
