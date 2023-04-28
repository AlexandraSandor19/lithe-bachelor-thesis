<script setup>
import { computed, ref, reactive } from 'vue';
import { useProjectStore } from '../stores/project';

const projectStore = useProjectStore();

const state = reactive({
    project_name: "",
    labels: [],
    repository_URL: "",
});

const modalState = computed(() => {
  return projectStore.modalState;
});

function handleClose() {
    if (projectStore.modalState === true) {
        projectStore.closeProjectModal();
    }   
}

</script>

<template>
    <main>
        <Dialog :visible="modalState" modal @update:visible="handleClose" :style="{ width: '60vw' }" :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
            <div class="header-text">
                <span>Create a new project</span>
            </div>
            <div class="container">
                <form class="form">
                    <div class="flex flex-column field-section">
                        <p class="field-text">What's the name of the project?</p>
                        <InputText type="text" v-model="state.project_name" />
                    </div>
                    <div class="flex flex-column field-section">
                        <p class="field-text">Add labels</p>
                        <Chips v-model="state.labels" showClear optionLabel="labels" />
                    </div>
                    <div class="flex flex-column field-section">
                        <p class="field-text">Add project repository</p>
                        <InputText type="text" v-bind="state.repository_URL" />
                    </div>
                    <button type="submit" class="form-btn shadow-2">Create project</button>
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