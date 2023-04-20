<script setup>
import Logo from './Logo.vue'

defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="header">
    <Logo />
    <div class="tabs">
      <a href="/">Contact</a>
      <a href="/">About Scrum</a>
      <a href="/">Features</a>
      <a href="/log-in">
        <span>
          Log in
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
    position: fixed; /* Set the navbar to fixed position */
    width: 100%;
    top: 0; /* Position the navbar at the top of the page */
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
