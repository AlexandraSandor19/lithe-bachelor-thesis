<script setup>
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue';
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useTeamStore } from '../stores/team';
import TeamForm from '../components/TeamForm.vue';

const userStore = useAuthStore();
const teamStore = useTeamStore();

async function getLeadFullname(id) {
  console.log(id);
  const lead = await userStore.getUserById(id);
  return lead.fullName;
}

onMounted(async () => {
  await userStore.getUser();
  await teamStore.getAllTeams();
  await teamStore.getMyTeams(userStore.userData.id);
})
</script>

<template>
  <main>
    <Header />
    <div class="flex flex-row">
      <Sidebar />
      <div class="page-content">
        <Divider align="left" type="solid">
            <span class="teams-label">Teams</span>
        </Divider>
        <div class="flex flex-row justify-content-between align-items-center pl-2 pt-2">
            <span class="my-teams-label">
                <span class="pi pi-star-fill mr-1" style="font-size: 0.9rem;"></span>
                My teams
            </span>
            <button class="create-btn" @click="teamStore.openTeamModal">
                <span class="pi pi-plus-circle pr-2" style="font-size: 0.9rem;"></span>
                Create a team
            </button>
        </div>
        <div class="team-table">
            <DataTable :value="teamStore.myTeams" tableStyle="width: 100%">
                <Column field="team_name" header="Team" style="font-weight: 600;"></Column>
                <Column field="lead" header="Lead">
                  <template v-if="slotProps" #body="slotProps">
                    {{ getLeadFullname(slotProps) }}
                  </template>
                  <template v-else #body="slotProps">
                    <span class="pi pi-question-circle pl-2" style="font-size: 0.9rem"></span>
                  </template>
                </Column>
                <Column field="no_projects" header="Number of Project"></Column>
            </DataTable>
        </div>
        <div class="flex flex-row justify-content-between align-items-center pl-2 pt-2 mt-4">
            <span class="my-teams-label">
                <span class="pi pi-star mr-1" style="font-size: 0.9rem;"></span>
                Teams you may know
            </span>
        </div>
        <div class="team-table mb-3">
            <DataTable :value="teamStore.suggestedTeams" tableStyle="width: 100%">
                <Column field="team_name" header="Team" style="font-weight: 600;"></Column>
                <Column field="lead" header="Lead">
                  <template v-if="slotProps" #body="slotProps">
                    {{ getLeadFullname(slotProps) }}
                  </template>
                  <template v-else #body="slotProps">
                    <span class="pi pi-question-circle pl-2" style="font-size: 0.9rem"></span>
                  </template>
                </Column>
                <Column field="no_projects" header="Number of Project"></Column>
            </DataTable>
        </div>
      </div> 
    </div>
    <TeamForm />
  </main>
</template>

<style lang="scss" scoped>
  .page-content {
    margin-left: 18rem;
    padding: 1rem 1rem 1rem 2rem;
    font-family: $pt-sans-font;
    width: 100%;
  }

  .teams-label {
    font-size: 2.5rem;
    color: $bcg-purple-pure;
  }

  .team-table {
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

  .my-teams-label {
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