<script setup>
import { computed, ref, reactive, onMounted } from 'vue'
import { issueColorClass, priorityIconClass } from '../utils/constants';
import { useAuthStore } from '../stores/auth'

const props = defineProps({
  issue: {
    type: Object,
    required: true
  }
})

const userStore = useAuthStore()
const assignee = ref('')

onMounted(async () => {
  const user = props.issue.assignee_id ? await userStore.getUserById(props.issue.assignee_id) : "";
  assignee.value = user.username ?? "";
})
</script>

<template>
  <div class="issue-card" :class="issueColorClass(props.issue.priority)">
    <span class="project">{{ props.issue.project_name }}</span>
    <div class="title">
      {{ props.issue.issue_name }}
    </div>
    <hr />
    <div class="flex flex-column">
      <div class="flex flex-row justify-content-between align-items-center">
        <span class="priority">
          <span :class="priorityIconClass(props.issue.priority)"></span>
          {{ props.issue.priority }}
        </span>
      </div>
      <span class="points-text">
        Story points:
        <span class="points">{{ props.issue.story_points }}</span>
      </span>
      <span class="assignee">assignee: {{ assignee }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.issue-card {
  border-radius: 10px;
  background-color: $white;
  box-shadow: $box-shadow1;
  margin: 1rem;
  font-family: $pt-sans-font;
  padding: 1.2rem 1.5rem;
  max-width: 12rem;
  border-top: 1px solid $whiteish;
  border-bottom: 1px solid $whiteish;
  border-right: 1px solid $whiteish;

  hr {
    border-top: 1px solid $light-grey;
  }
}

.title {
  font-weight: 600;
  color: $black-2;
  margin-bottom: 0.6rem;
  font-size: 1.2rem;
}

.project {
  display: flex;
  justify-content: center;
  margin: 0.1rem 0 0.5rem 0;
  padding: 0.3rem 0.5rem;
  background-color: $light-purple;
  color: $white;
  font-size: 0.7rem;
  border-radius: 5px;
  width: fit-content;
}

.points-text {
  color: $dark-grey;
  .points {
    margin-right: 1rem;
    padding: 0.1rem 0.4rem;
    background-color: $blue;
    border: 1px solid $dark-blue;
    border-radius: 7px;
    color: $white;
    font-size: 0.8rem;
    width: fit-content;
  }
}

.priority {
  text-transform: lowercase;
  color: $dark-grey;
}

.assignee {
  color: $dark-grey;
}
</style>
