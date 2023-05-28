<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const user = computed(() => {
  return authStore.userData
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
        <a href="/board" class="menu-item">
          <span class="pi pi-th-large"></span>
          Boards
        </a>
      </div>
      <div>
        <Divider />
        <div class="user-info">
          <Avatar
            style="width: 2.5rem; height: 2.5rem"
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            class="mr-2"
            shape="circle"
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
  width: 16rem;
  background-color: $white;
  margin-top: 1.5rem;
  border-radius: 5px;
  margin-left: 1.5rem;
  box-shadow: $box-shadow1;
  padding: 1.3rem;
  font-family: $pt-sans-font;
  border: 1px solid $whiteish;

  .menu {
    display: flex;
    flex-direction: column;

    .menu-item {
      font-size: 0.95rem;
      color: $dark-grey;
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
