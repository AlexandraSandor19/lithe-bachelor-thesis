<script setup>
import Logo from './Logo.vue'
import { computed, onMounted } from 'vue';
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
      <a>
        <span>
          {{ user.username }}
        </span>
      </a>
      <a @click="logout">
        <span>
          Log out
        </span>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5rem;
    position: fixed;
    width: 100%;
    top: 0;
    background-color: $bcg-purple-pure;
    -moz-box-shadow: rgba(57, 57, 57, 0.4) 0px 8px 24px;
    -webkit-box-shadow: rgba(57, 57, 57, 0.4) 0px 8px 24px;
    box-shadow: rgba(57, 57, 57, 0.4) 0px 8px 24px;
   }

  .tabs {
    display: flex;
    align-items: center;
    margin-right: 7rem;

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
</style>
