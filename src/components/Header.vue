<script setup>
import Logo from './Logo.vue'
import { computed, ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const user = computed(() => {
  return authStore.userData;
});

const isAuthenticated = computed(() => {
  return authStore.isAuthenticated;
});

async function logout() {
  await authStore.logout()
    .then(res => {
      router.replace({ name: 'home'});
    })
    .catch(err => {
      console.log(err.message);
    })
}

const menu = ref();

const items = ref([
    { separator: true },
    { 
      label: 'Profile', 
      icon: 'pi pi-fw pi-user', 
      to: '/profile',
    },
    { 
      label: 'Log Out', 
      icon: 'pi pi-sign-out',
      command: async () => await logout() 
    },
]);

const toggle = (event) => {
    menu.value.toggle(event);
};

</script>

<template>
  <div class="header">
    <Logo />
    <div v-if="!isAuthenticated" class="tabs">
      <a href="/">Contact</a>
      <a href="/">About Scrum</a>
      <a href="/">Features</a>
      <a href="/log-in">
        <span>
          Log in
        </span>
      </a>
    </div>
    <div v-else class="tabs">
        <router-link to="/">
          <span class="pi pi-fw pi-home header-icon"></span>
        </router-link>
        <button class="user-btn" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu">
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="mr-5" shape="circle" />
            <span class="pi pi-chevron-down"></span>
        </button>
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" style="width: fit-content; font-size: 0.9rem;">
          <template #start>
            <div class="menu-name">
              Logged in as 
              <span style="font-weight: 500;">
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
    position: fixed;
    width: 100%;
    top: 0;
    background-color: $bcg-purple-pure;
    -moz-box-shadow: rgba(57, 57, 57, 0.4) 0px 8px 24px;
    -webkit-box-shadow: rgba(57, 57, 57, 0.4) 0px 8px 24px;
    box-shadow: rgba(57, 57, 57, 0.4) 0px 8px 24px;
    z-index: 1;
   }

  .tabs {
    display: flex;
    align-items: center;
    margin-right: 4rem;

    a {
      font-family: $logo-font;
      text-decoration: none;
      color: $white;
      font-size: 0.9rem;
      margin-left: 2.5rem;
      align-items: center;
      letter-spacing: .1rem;

      &:last-child {
        color: $yellow;
        border: 2px solid $yellow;
        border-radius: 7px;
        padding: 0.4rem 1rem;
        box-shadow: $bs-yellow-light;
        transition: 0.4s;

        &:hover {
          box-shadow: $bs-yellow;
          text-shadow: $ts-yellow;
        }
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
    color: $white;
    cursor: pointer;
  }

  .header-icon {
    color: $white;
    font-size: 1.5rem;
    cursor: pointer;
    margin-right: 1.4rem;
  }

  .menu-name {
    margin: 0.5rem 1.2rem;
  }
</style>
