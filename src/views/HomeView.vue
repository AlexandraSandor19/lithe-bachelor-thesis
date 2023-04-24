<script setup>
import { computed } from 'vue';
import Header from '../components/Header.vue'
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();

const user = computed(() => {
  return authStore.userData;
});

const isAuthenticated = computed(() => {
  return authStore.isAuthenticated;
});
</script>

<template>
  <main>
    <Header />
    <div v-if="!isAuthenticated" id="landing-page">
      <div class="main-section">
        <div class="text-section">
          <span class="hero-text --main">Something meaningful about teamwork.</span>
          <span class="hero-text --second">This text is about how cool this is.</span>
          <span class="hero-text --get-started">Get started with 
            <span class="lithe">Lithe</span>!
          </span>
          <a class="sign-up" href="/sign-up">Sign Up</a>
        </div>
      </div>
      <div class="features-section">
        <div class="features-title">
          Manage tasks and projects easily
        </div>
      </div>
    </div>
    <div v-else>
      <div class="main-section--auth">
        <div class="text-section">
          <span class="hero-text --main --auth">Welcome back, {{ user.forename }}!</span>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  main {
    font-family: $logo-font;
  }

  .main-section {
    background: url("../assets/background.png") no-repeat center fixed;
    background-size: cover;
    min-height: 100vh;
  }

  .main-section--auth {
    background-color: $whiteish;
    min-height: 100vh;
  }

  .text-section {
    display: flex;
    flex-direction: column;
    padding: 9.5rem 0rem 0rem 7rem;
    letter-spacing: .1rem;
  }

  .hero-text {
    color: $white;
    margin: 1rem 0 0.5rem 0;

    &.--main {
      font-size: 3rem;
      margin-top: 1rem;
    }
    
    &.--second {
      font-size: 1.2rem;
    }

    &.--get-started {
      font-size: 2rem;
      margin-top: 3rem;
    }

    &.--auth {
      color: $bcg-purple-pure;
    }
  }

  .lithe {
    color: $yellow;
  }

  .sign-up {
    margin-top: 1rem;
    font-size: 1.1rem;
    width: fit-content;
    text-transform: uppercase;
    text-decoration: none;
    color: $yellow;
    border: 2px solid $yellow;
    border-radius: 7px;
    padding: 0.7rem 1.5rem;
    cursor: pointer;
    box-shadow: $bs-yellow-light;
    transition: 0.4s;

    &:hover {
      box-shadow: $bs-yellow;
      text-shadow: $ts-yellow;
    }
  }

  .features-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background-color: white;
    padding: 2rem;
  }

  .features-title {
    color: $bcg-purple-pure;
    font-size: 3rem;
    margin-top: 2rem;
  }
</style>
