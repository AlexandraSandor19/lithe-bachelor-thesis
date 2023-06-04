<script setup>
import Logo from './Logo.vue'
import { computed, ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { useUploadsStore } from '../stores/uploads'

const uploadsStore = useUploadsStore()
const authStore = useAuthStore()
const router = useRouter()

const user = computed(() => {
  return authStore.userData
})

const isAuthenticated = computed(() => {
  return authStore.isAuthenticated
})

const imageSource = computed(() => {
  if (image.value) {
    return `data:${uploadsStore.profileImage.image.contentType};base64,${uploadsStore.profileImage.image.data}`;
  }
})

async function logout() {
  await authStore
    .logout()
    .then((res) => {
      router.replace({ name: 'home' })
    })
    .catch((err) => {
      console.log(err.message)
    })
}

const menu = ref()
const image = ref(null)

const items = ref([
  { separator: true },
  {
    label: 'Profile',
    icon: 'pi pi-fw pi-user',
    to: '/profile'
  },
  {
    label: 'Log Out',
    icon: 'pi pi-sign-out',
    command: async () => await logout()
  }
])

const toggle = (event) => {
  menu.value.toggle(event)
}

onMounted(async () => {
  await authStore.getUser();
  image.value = await uploadsStore.getImage(authStore.userData._id);
})
</script>

<template>
  <div class="header">
    <Logo />
    <div v-if="!isAuthenticated" class="tabs">
      <a href="/">Contact</a>
      <a href="/">About Scrum</a>
      <a href="/">Features</a>
      <a href="/log-in">
        <span> Log in </span>
      </a>
    </div>
    <div v-else class="tabs">
      <router-link to="/">
        <span class="pi pi-fw pi-home header-icon"></span>
      </router-link>
      <button class="user-btn" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu">
        <img
          v-if="!image"
          src="../assets/default-user-icon.jpg"
          class="prf-image mr-4"
        />
        <img
          v-else
          :src="imageSource"
          class="prf-image mr-4"
        />
        <span class="pi pi-chevron-down"></span>
      </button>
      <Menu
        ref="menu"
        id="overlay_menu"
        :model="items"
        :popup="true"
        style="width: fit-content; font-size: 0.9rem"
      >
        <template #start>
          <div class="menu-name">
            Logged in as
            <span style="font-weight: 500">
              {{ user.fullName }}
            </span>
          </div>
        </template>
      </Menu>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4.5rem;
  position: sticky;
  width: 100%;
  top: 0;
  background-color: $white;
  box-shadow: $box-shadow2;
  z-index: 2;
}

.prf-image {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  box-shadow: $box-shadow1;
  border: 0.9px solid $light-grey;
  object-fit: cover;
}

.tabs {
  display: flex;
  align-items: center;
  margin-right: 4rem;

  a {
    font-family: $logo-font;
    text-decoration: none;
    color: $main-purple;
    font-size: 0.95rem;
    margin-left: 2.5rem;
    align-items: center;
    letter-spacing: 0.1rem;

    &:last-child {
      color: $yellow;
      border: 2px solid $yellow;
      border-radius: 7px;
      padding: 0.4rem 1rem;
      box-shadow: $box-shadow1;
    }
  }
}

.user-btn {
  display: flex;
  width: 100%;
  background-color: transparent;
  padding: 0.5rem 1rem;
  align-items: center;
  border: 2px solid transparent;
  font-size: 1.2rem;
  color: $grey;
  cursor: pointer;
}

.header-icon {
  color: $grey;
  font-size: 1.4rem;
  cursor: pointer;
  margin-right: 1rem;
  margin-top: 5px;
}

.menu-name {
  margin: 0.5rem 1.2rem;
}
</style>
