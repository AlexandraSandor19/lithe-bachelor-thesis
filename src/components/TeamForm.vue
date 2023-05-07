<script setup>
import { computed, ref, reactive, onMounted } from 'vue';
import { useTeamStore } from '../stores/team';
import { useAuthStore } from '../stores/auth';
import { useToast } from "primevue/usetoast";

const toast = useToast();

const teamStore = useTeamStore();
const authStore = useAuthStore();

const state = reactive({
    team_name: "",
    members: [],
    team_leader: "",
});

const memberOptions = ref([
    { name: 'Alex'}, 
    { name: 'Alexandra'},
    { name: 'Ianis'}
    ]);

const modalState = computed(() => {
  return teamStore.modalState;
});

function handleClose() {
    if (teamStore.modalState === true) {
        teamStore.closeTeamModal();
    }   
}

async function onSubmit() {
    const myId = authStore.userData.id;

    const data = {
        team_name: state.team_name,
        members_ids: state.members,
        creator_id: myId,
        team_leader_id: state.team_leader
    }

    await teamStore.create(data)
            .then(res => {
                showSuccess();
            })
            .catch(err => {
                showError(err.message);
            });
}

const showSuccess = () => {
    toast.add({ severity: 'success', summary: "Success", detail: `Team ${state.team_name} was created successfully!`, life: 3000 });
};

const showError = (message) => {
    toast.add({ severity: 'error', summary: "Error", detail: message, life: 3000 });
};

async function getUser() {
    await authStore.getUser();
}

onMounted(async () => {
    await getUser();
})

</script>

<template>
    <main>
        <Dialog :visible="modalState" modal @update:visible="handleClose" :style="{ width: '60vw' }" :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
            <div class="header-text">
                <span>Create a new team</span>
            </div>
            <div class="container">
                <form class="form">
                    <div class="flex flex-column field-section">
                        <p class="field-text">What's the name of the team?</p>
                        <InputText type="text" v-model="state.team_name" />
                    </div>
                    <div class="flex flex-column field-section">
                        <p class="field-text">Select one ore more team members</p>
                        <MultiSelect 
                            v-model="state.members" 
                            display="chip" 
                            :options="memberOptions" 
                            optionLabel="name" 
                            :maxSelectedLabels="3" 
                            class="w-full" 
                        />
                    </div>
                    <div class="flex flex-column field-section">
                        <p class="field-text">Select a team leader</p>
                        <Dropdown v-model="state.team_leader" :options="memberOptions" showClear optionLabel="name" />
                    </div>
                    <button type="submit" class="form-btn shadow-2" @click.prevent="onSubmit">Create team</button>
                </form>
            </div>
        </Dialog>
    </main>
    <Toast />
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