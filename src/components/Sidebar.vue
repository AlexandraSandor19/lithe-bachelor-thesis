<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useUploadsStore } from '../stores/uploads'
import { useTeamStore } from '../stores/team'

const authStore = useAuthStore()
const uploadsStore = useUploadsStore()
const teamStore = useTeamStore()
const router = useRouter()

const menu = ref()
const image = ref(null)
const myTeams = ref([]);

const user = computed(() => {
  return authStore.userData
})

const imageSource = computed(() => {
  if (image.value) {
    return `data:${uploadsStore.profileImage.image.contentType};base64,${uploadsStore.profileImage.image.data}`;
  }
})

const toggle = (event) => {
    menu.value.toggle(event);
};

const boardsOptions = ref([]);

onMounted(async () => {
  await authStore.getUser();
  const myTeams = await teamStore.getUserTeams(authStore.userData._id);
  myTeams.forEach((team) => {
    boardsOptions.value.push({
      label: `${team.team_name}'s Board`,
      command: () => {
        router.replace({
          name: 'board',
          params: { id: team._id }
        })
      }
    })
  })
  image.value = await uploadsStore.getImage(authStore.userData._id);
})
</script>

<template>
  <main>
    <div class="sidebar">
      <div class="menu">
        <a href="/" class="menu-item">
          <span class="pi pi-home"></span>
          Home
        </a>
        <a href="/profile" class="menu-item">
          <span class="pi pi-user"></span>
          Profile
        </a>
        <a href="/teams" class="menu-item">
          <span class="pi pi-users"></span>
          Teams
        </a>
        <a href="/projects" class="menu-item">
          <span class="pi pi-folder"></span>
          Projects
        </a>
        <a href="/issues" class="menu-item">
          <span class="pi pi-bookmark"></span>
          Issues
        </a>
        <a class="flex flex-row align-items-center justify-content-between menu-item">
          <div>
            <span class="pi pi-th-large" label="Toggle" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu"></span>
            Boards            
          </div>
          <div>
            <span class="pi pi-angle-down mr-2" label="Toggle" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu"></span>
            <Menu 
                ref="menu" 
                id="overlay_menu" 
                :model="boardsOptions" 
                :popup="true"
                style="font-size: 0.9rem; font-weight:600"
                />
          </div>
        </a>
      </div>
      <div>
        <Divider />
        <div class="user-info">
          <img
            v-if="!image"
            src="../assets/default-user-icon.jpg"
            class="prf-image mr-2"
          />
          <img
            v-else
            :src="imageSource"
            class="prf-image mr-2"
          />
          <span class="name">{{ user.fullName }}</span>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 7.5rem);
  width: 17rem;
  background-color: $white;
  margin-top: 1.5rem;
  border-radius: 5px;
  margin-left: 1.5rem;
  box-shadow: $box-shadow1;
  padding: 1.3rem;
  font-family: $pt-sans-font;
  border: 1px solid $whiteish;

  .prf-image {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    box-shadow: $box-shadow1;
    border: 0.9px solid $light-grey;
    object-fit: cover;
  }

  .menu {
    display: flex;
    flex-direction: column;

    .menu-item {
      font-size: 0.96rem;
      color: $grey;
      margin: 0.4rem 0 1.1rem 0.7rem;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      text-decoration: none;

      :deep(.pi) {
        font-size: 0.9rem;
        margin-right: 0.6rem;
      }

      &:hover {
        transform: scale(1.07);
        color: $main-purple;
      }
    }
  }

  .user-info {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: fit-content;
    padding: 0.8rem 0.5rem;
    border: 1.7px solid $light-purple;
    border-radius: 5px;
    box-shadow: $box-shadow1;

    .name {
      font-size: 1rem;
      color: $dark-grey;
    }
  }
}
</style>
