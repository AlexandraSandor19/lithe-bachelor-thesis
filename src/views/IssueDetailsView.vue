<script setup>
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
import Comment from '../components/Comment.vue'
import { ref, reactive, onMounted, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useIssueStore } from '../stores/issue'
import { useCommentStore } from '../stores/comments'
import { useRoute } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { story_points, status } from '../utils/constants'

const route = useRoute()

const userStore = useAuthStore()
const commentStore = useCommentStore()
const issueStore = useIssueStore()

const toast = useToast()

const editorText = ref("")

const state = reactive({
  isLoaded: false,
  issue: {},
  assignor: {},
  assignee: {},
  comments: [],
  points: ""
})

async function submitComment() {
  const myId = userStore.userData.id

  const data = {
    creator_id: myId,
    issue_id: state.issue._id,
    date: new Date().toISOString(),
    content: editorText.value
  }

  await commentStore.create(data).then(async (res) => {
      await handleComments();
    })
    .catch((err) => {
      showError(err.message)
    })
}

const assignorFullname = computed(() => {
  return `${state.assignor.forename} ${state.assignor.surname}`
})

const assigneeFullname = computed(() => {
  return `${state.assignee.forename} ${state.assignee.surname}`
})

const showError = (message) => {
  toast.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 })
}

const handleComments = async () => {
  const id = route.params.id;
  await commentStore.getComments(id);
  commentStore.allComments.forEach(async (comment) => {
    const user = await userStore.getUserById(comment.creator_id);
    state.comments.push({
      user: user,
      date: new Date(comment.date),
      content: comment.content
    })
  })
}

onMounted(async () => {
  await userStore.getUser()
  const id = route.params.id;
  state.issue = await issueStore.getIssueById(id);
  state.assignor = await userStore.getUserById(state.issue.creator_id)
  state.assignee = state.issue.assignee_id ? await userStore.getUserById(state.issue.assignee_id) : "";
  state.points = state.issue.story_points ?? ""
  await handleComments();
  state.isLoaded = true;
})
</script>

<template>
  <main v-if="state.isLoaded">
    <Header />
    <div class="flex flex-row">
      <Sidebar />
      <div class="page-content">
        <div class="flex flex-row align-items-center justify-content-between mt-3">
          <span class="issue-name">{{ state.issue.issue_name }}</span>
        </div>
        <Divider />
        <div class="flex flex-row w-max container">
          <div class="flex flex-column">
            <div class="field">
              <span class="field-name">Labels:</span>
              <span v-for="label in state.issue.labels" class="label">{{ label }}</span>
            </div>
            <div class="field">             
              <span class="field-name">Created by:</span>
              <span class="user-field">
                <Avatar
                  style="width: 1.6rem; height: 1.6rem"
                  image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                  class="mr-2 ml-3"
                  shape="circle"
                />
                {{ assignorFullname }}
              </span>
            </div>
            <div class="field">           
              <span class="field-name">Assigned to:</span>
              <span v-if="state.assignee" class="user-field">
                <Avatar
                  style="width: 1.6rem; height: 1.6rem"
                  image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                  class="mr-2 ml-3"
                  shape="circle"
                />
                {{ assigneeFullname }}
              </span>
              <span v-else class="user-field">
                <span class="pi pi-question-circle ml-2 text-lg"></span>
              </span>
            </div>
          </div>
          <Divider layout="vertical" />
          <div class="flex flex-column">
            <!-- <div class="field">
              <span class="field-name">Status:</span>
              <span>{{ state.issue.status }}</span>
            </div> -->
            <div class="field">
              <span class="field-name">Story points:</span>
              <Dropdown v-model="state.points" :options="story_points" :placeholder="state.points" class="w-full" />
            </div>
          </div>
        </div>
        <Timeline :value="status" layout="horizontal" class="flex justify-content-center ml-4 mr-2">
          <template #marker="slotProps">
            <span v-if="slotProps.item == state.issue.status" class="right-icon"></span>
            <span v-else class="wrong-icon"></span>
          </template>
          <template #content="slotProps">
            <span v-if="slotProps.item == state.issue.status" class="status--bold">{{ slotProps.item }}</span>
            <span v-else class="status">{{ slotProps.item }}</span>
          </template>
        </Timeline>
        <div class="flex flex-column">
          <Panel header="Goal" class="goal-panel mt-3">
            <p class="m-0">
              {{ state.issue.goal }}
            </p>
          </Panel>
          <Panel class="mt-2" header="Description">
            <p class="m-0">
              {{ state.issue.description }}
            </p>
          </Panel>
          <Divider />
          <div class="flex flex-column container">
            <div class="mb-2">
              <span class="comment-label">Comments</span>
              <span class="number-comments">{{ state.comments.length }}</span>
            </div>
            <div v-for="comment in state.comments">
              <Comment 
                :user="comment.user"
                :date="comment.date"
                :content="comment.content"
              />
            </div>
            <form @submit.prevent="submitComment" class="flex flex-column mt-3">
              <Editor v-model="editorText" editorStyle="height: 130px; width: 100%">
                <template v-slot:toolbar>
                    <span class="ql-formats">
                        <button class="ql-bold"></button>
                        <button class="ql-italic"></button>
                        <button class="ql-underline"></button>
                    </span>
                </template>
              </Editor>
              <div class="mt-5 relative w-12">
                <button class="send-btn">
                  <span class="pi pi-send text-lg"></span>
                </button>
              </div>
            </form>
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

:deep(.p-dropdown .p-dropdown-label.p-placeholder) {
  width: 0.4rem;
  padding: 0.5rem;
}

.right-icon {
  height: 1.2rem;
  width: 1.2rem;
  border-radius: 50%;
  border: 2px solid $white;
  box-shadow: $bs-slight-blue;
  background-color: $low-pr-blue;
}

.wrong-icon {
  height: 1.2rem;
  width: 1.2rem;
  border-radius: 50%;
  border: 1.5px solid $dark-blue;
  box-shadow: $bs-slight-blue;
}

.status {
  font-family: $pt-sans-font;
  color: $black-2;
}

.status--bold {
  color: $black-1;
  font-weight: 600;
}

.container {
  display: flex;
  padding: 1.5rem 1rem;
  border: 1px solid $whiteish;
  border-radius: 5px;
  box-shadow: $box-shadow1;
  background-color: $white;
}

.issue-name {
  font-size: 2rem;
  color: $black-1;
  padding: 0.3rem 1rem;
  border-radius: 10px;
  box-shadow: $box-shadow1;
  border: 1px solid $whiteish;
  border-top: 3px solid $main-purple;
  border-bottom: 3px solid $main-purple;
}

.field {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.7rem 0.2rem;
  margin: 0;
  .field-name {
    color: $black-2;
    font-size: 1rem;
    font-weight: 600;
    margin-right: 0.5rem;
  }

  .user-field {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: -0.5rem;
  }

  .label {
    padding: 0.4rem 0.5rem;
    border: 1px solid $whiteish;
    border-radius: 7%;
    margin-right: 0.8rem;
    color: $dark-grey;
    background-color: $white;
  }

}
  :deep(.p-panel-header) {
    font-family: $pt-sans-font;
    color: $black-2;
  }

.comment-label {
  font-family: $pt-sans-font;
  color: $black-2;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.4rem 0rem;
  border-bottom: 1px solid $black-2;
}

.number-comments {
  font-size: 0.9rem;
  margin-left: 0.7rem;
  background-color: $blue;
  padding: 0.1rem 0.4rem;
  border-radius: 50%;
}

.send-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: $white;
  border: 1px solid $light-grey;
  padding: 0.8rem 0.7rem 0.6rem 0.7rem;
  display: flex;
  border-radius: 6px;
  color: $grey;
  width: fit-content;
  cursor: pointer;
}

</style>
