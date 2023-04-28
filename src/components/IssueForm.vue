<script setup>
import { computed, ref, reactive } from 'vue';
import { useIssueStore } from '../stores/issue';

const issueStore = useIssueStore();

const state = reactive({
    issue_title: "",
    labels: [],
    points: "",
    priority: "",
    assignee: "",
    goal: "",
    description: "",
});

const story_points_choices = ref([
    { points: 1 },
    { points: 2 },
    { points: 3 },
    { points: 5 },
    { points: 8 },
    { points: 13 }
]);

const priority_choices = ref([
    { level: "Very Low" },
    { level: "Low" },
    { level: "Medium" },
    { level: "High" },
    { level: "Very High" },
    { level: "Critical" }
]);

const modalState = computed(() => {
  return issueStore.modalState;
});

function handleClose() {
    if (issueStore.modalState === true) {
        issueStore.closeIssueModal();
    }   
}

</script>

<template>
    <main>
        <Dialog :visible="modalState" modal @update:visible="handleClose" :style="{ width: '50vw' }" :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
            <div class="header-text">
                <span>Create a new issue</span>
            </div>
            <div class="container">
                <form class="form">
                    <div class="flex flex-column field-section">
                        <p class="field-text">Title of issue</p>
                        <InputText type="text" v-model="state.issue_title"/>
                    </div>
                    <div class="flex flex-row">
                        <div class="flex flex-column field-section">
                            <p class="field-text">Add labels</p>
                            <Chips v-model="state.labels" showClear optionLabel="labels" />
                        </div>
                        <div class="flex flex-column field-section">
                            <p class="field-text">Story points</p>
                            <Dropdown v-model="state.points" :options="story_points_choices" showClear optionLabel="points" />
                        </div>
                    </div>
                    <div class="flex flex-column field-section">
                        <p class="field-text">Priority</p>
                        <Dropdown v-model="state.priority" :options="priority_choices" showClear optionLabel="level" />
                    </div>
                    <div class="flex flex-column field-section">
                        <p class="field-text">Assign contributor</p>
                        <InputText v-model="state.assignee" type="text" />
                    </div>
                    <div class="flex flex-column field-section">
                        <p class="field-text">Goal</p>
                        <Textarea v-model="state.goal" rows="4" style="width: 100%;" />
                    </div>
                    <div class="flex flex-column field-section">
                        <p class="field-text">Description</p>
                        <Textarea v-model="state.description" rows="6" style="width: 100%;" />
                    </div>
                    <button type="submit" class="form-btn shadow-2">Create issue</button>
                </form>
            </div>
        </Dialog>
    </main>
</template>

<style lang="scss" scoped>
.header-text {
    width: 100%;
    display: flex;
    justify-content: center;
    font-family: $pt-sans-font;
    color: $bcg-purple-pure;
    font-size: 2rem;
}

.container {
    padding: 0.5rem 1rem;
}

.form {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: $whiteish;
    border-radius: 3px;
    margin-bottom: 1.5rem;
    padding: 1rem 2rem;
}

.field-section {
    width: 100%;
    padding: 0 0.4rem 0.5rem 0.4rem;

    .field-text {
        font-size: 1rem;
        margin-bottom: 0.8rem;
        color: $bcg-purple-pure;
    }
}

.form-btn {
    height: 2.7rem;
    margin-top: 1.5rem; 
    width: 100%;
    font-size: 1rem;
    font-family: $pt-sans-font;
    background-color: #8A6196;
    border: 2px solid #8A6196;
    border-radius: 0.2rem;
    color: $white;
    align-self: center;
    cursor: pointer;
    min-width: 20rem;
}
</style>