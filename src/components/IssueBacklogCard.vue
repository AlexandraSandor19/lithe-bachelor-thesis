<script setup>
import { ref, onMounted } from 'vue'
import { priorityIconClass } from '../utils/constants';
import { useProjectStore } from '../stores/project'

const props = defineProps({
  issue: {
    type: Object,
    required: true
  },
})

const projectStore = useProjectStore()
const project_name = ref(null)

onMounted(async () => {
  const project = await projectStore.getProjectById(props.issue.project_id);
  project_name.value = project.project_name ?? "?";
})
</script>

<template>
  <div :id="props.issue._id" class="issue-card">
    <div class="section">
      <span class="priority" :class="priorityIconClass(props.issue.priority)"></span>
      <div class="title">
          {{ props.issue.issue_name }}
      </div>
    </div>
    <div class="project">{{ project_name }}</div>
    <div class="flex flex-row justify-content-between align-items-center">
    </div>
    <span class="points-text">
    <span class="points">{{ props.issue.story_points }}</span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.issue-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 10px;
  background-color: $white;
  box-shadow: $box-shadow1;
  margin: 0.5rem 1rem;
  font-family: $pt-sans-font;
  padding: 0.9rem 1.5rem;
  min-width: 13rem;
  border: 1.5px solid $whiteish;
}

.section {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 30%;
}

.title {
  font-weight: 600;
  color: $black-2;
  font-size: 0.9rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.project {
  display: flex;
  justify-content: center;
  max-width: 30%;
  padding: 0.3rem 0.4rem;
  background-color: $light-purple;
  color: $white;
  font-size: 0.7rem;
  border-radius: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.points-text {
  color: $dark-grey;
  .points {
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
  color: $dark-grey;
  margin-right: 0.7rem;
}
</style>
