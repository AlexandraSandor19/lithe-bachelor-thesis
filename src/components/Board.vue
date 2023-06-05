<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import draggable from 'vuedraggable'
import IssueCard from './IssueCard.vue'
import NothingToShow from './NothingToShow.vue'
import { useIssueStore } from '../stores/issue'
import { useTeamStore } from '../stores/team'
import { useProjectStore } from '../stores/project'
import { useRouter, useRoute } from 'vue-router'

const issueStore = useIssueStore()
const projectStore = useProjectStore()
const teamStore = useTeamStore()
const router = useRouter()
const route = useRoute()

const draggedCard = ref();
const hasIssues = ref(false);

const props = defineProps({
  id: {
    type: String
  }
})

const state = reactive({
  team: {},
  openIssues: [],
  inProgressIssues: [],
  inReviewIssues: [],
  doneIssues: []
})

function selectIssue(issue) {
  router.push({
    name: 'issue-details',
    params: { id: issue._id }
  })
}

async function handleOpenIssue(event) {
  const id = draggedCard.value;
  console.log(id);
  if (event.added) {
    await issueStore.changeStatus(id, { status: "open" }); 
  }
}

async function handleInProgressIssue(event) {
  const id = draggedCard.value;
  if (event.added) {
    await issueStore.changeStatus(id, { status: "in progress" }); 
  }
}

async function handleInReviewIssue(event) {
  const id = draggedCard.value;
  if (event.added) {
    await issueStore.changeStatus(id, { status: "in review" }); 
  }
}

async function handleDoneIssue(event) {
  const id = draggedCard.value;
  if (event.added) {
    await issueStore.changeStatus(id, { status: "done" }); 
  }
}

function emptyState() {
  state.team = {};
  state.openIssues = [];
  state.inProgressIssues = [];
  state.inReviewIssues = [];
  state.doneIssues = [];
}

function handleDragStart(event) {
  draggedCard.value = event.target.id;
}

async function handleData(id) {
  state.team = await teamStore.getTeamById(id);
  const projects = await projectStore.getTeamProjects(id);
  projects.forEach(async (project) => {
    const issues = await issueStore.getProjectIssues(project._id);
    if (issues.length) {
      hasIssues.value = true;
    }
    const project_name = project.project_name;
    issues.forEach(async (issue) => {
      let propIssue = issue;
      propIssue['project_name'] = project_name;
      switch (issue.status) {
        case 'open':
          state.openIssues.push(issue);
          break;
        case 'in progress':
          state.inProgressIssues.push(issue);
          break;
        case 'in review':
          state.inReviewIssues.push(issue);
          break;
        case 'done':
          state.doneIssues.push(issue);
          break;
      }
    })
  })
}

watch(() => route.params, async () => {
  emptyState();
  await handleData(route.params.id);
})

onMounted(async () => {
  const id = route.params.id
  await handleData(id);
})
</script>

<template>
  <div class="heading">
    <span class="team-label">Team {{ state.team.team_name }}</span>
    <span class="board-label">Sprint Board</span>
    <span class="sprint-label"><b>Active sprint:</b> 04.06.2023 - 18.06.2023</span>
  </div>
  <div v-if="hasIssues" class="flex flex-row h-full pl-3">
    <div class="column">
      <h1 class="column-label">OPEN
        <span class="issues-number">{{ state.openIssues.length }}</span>
      </h1>
      <draggable
        item-key="_id"
        @dragstart="handleDragStart($event)" 
        @change="handleOpenIssue($event)"
        class="drag-column"
        :options="{clone: true}"
        v-model="state.openIssues"
        tag="div"
        :animation="300"
        group="state.openIssues"
        >
          <template #item="{ element: issue }">
            <IssueCard :issue="issue" @dblclick="selectIssue(issue)"/>
          </template>
      </draggable>
    </div>
    <Divider layout="vertical" />
    <div class="column">
      <h1 class="column-label">IN PROGRESS
        <span class="issues-number">{{ state.inProgressIssues.length }}</span>
      </h1>
      <draggable 
        item-key="_id"
        @dragstart="handleDragStart($event)" 
        @change="handleInProgressIssue($event)" 
        class="drag-column" 
        v-model="state.inProgressIssues" 
        :animation="300" 
        tag="div" 
        group="state.openIssues">
          <template #item="{ element: issue }">
            <IssueCard :issue="issue" @dblclick="selectIssue(issue)"/>
          </template>
      </draggable>
    </div>
    <Divider layout="vertical" />
    <div class="column">
      <h1 class="column-label">IN REVIEW
        <span class="issues-number">{{ state.inReviewIssues.length }}</span>
      </h1>
      <draggable
        item-key="_id"
        @dragstart="handleDragStart($event)" 
        @change="handleInReviewIssue($event)" 
        class="drag-column" 
        v-model="state.inReviewIssues" 
        :animation="300" 
        group="state.openIssues">
          <template #item="{ element: issue }">
            <IssueCard :issue="issue" @dblclick="selectIssue(issue)"/>
          </template>
      </draggable>
    </div>
    <Divider layout="vertical" />
    <div class="column">
      <h1 class="column-label">DONE
        <span class="issues-number">{{ state.doneIssues.length }}</span>
      </h1>
      <draggable
        item-key="_id"
        @dragstart="handleDragStart($event)" 
        @change="handleDoneIssue($event)" 
        class="drag-column" 
        v-model="state.doneIssues" 
        :animation="300" 
        group="state.openIssues">
          <template #item="{ element: issue }">
            <IssueCard :issue="issue" @dblclick="selectIssue(issue)"/>
          </template>
      </draggable>
    </div>
  </div>
  <NothingToShow v-else/>
</template>

<style lang="scss" scoped>
.column-label {
  color: $grey;
  font-family: $pt-sans-font;
  padding: 0.4rem 0.5rem;
  margin-left: 1rem;
  font-size: 1.3rem;
  width: fit-content;
  display: flex;
  align-items: center;
}

.column {
  display: flex;
  flex-direction: column;
  border: 1px solid $light-grey;
  box-shadow: $box-shadow1;
  border-radius: 10px;
  min-height: 100vh;
  min-width: 16rem;
  margin-bottom: 2rem;
}

.issues-number {
  font-size: 0.8rem;
  margin-left: 0.5rem;
  border-radius: 50%;
  border: 1px solid $yellow;
  background-color: $yellow;
  padding: 0.1rem 0.4rem;
  font-weight: 500;
}

.drag-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  min-width: 11.25rem;
}

.heading {
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  margin-bottom: 0.6rem;
  font-family: $pt-sans-font;

  .team-label {
    color: $grey;
    font-size: 0.9rem;
    margin-bottom: 0.4rem;
    border-bottom: 1px solid $grey;
    width: fit-content;
  }
  .board-label {
    color: $dark-grey;
    font-size: 1.7rem;
    font-weight: 600;
  }

  .sprint-label {
    margin-top: 0.6rem;
    border-radius: 7px;
    width: fit-content;
    color: $grey;
    font-size: 0.9rem;
  }
}
</style>
