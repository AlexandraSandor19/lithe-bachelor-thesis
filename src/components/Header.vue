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
      <a class="shadow-2" href="/log-in">Log in</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5rem;
    margin: 0;
    position: relative;
    background-color: $bcg-purple-pure;
    -moz-box-shadow: rgba(57, 57, 57, 0.4) 0px 8px 24px;
    -webkit-box-shadow: rgba(57, 57, 57, 0.4) 0px 8px 24px;
    box-shadow: rgba(57, 57, 57, 0.4) 0px 8px 24px;
   }

  .tabs {
    display: flex;
    align-items: center;
    margin-right: 5rem;

    a {
      font-family: 'Anek Telugu', sans-serif;
      font-family: 'Bebas Neue', cursive;
      font-family: 'Roboto', sans-serif;
      text-decoration: none;
      color: $white;
      font-size: 1rem;
      margin-left: 2rem;
      align-items: center;

      &:last-child {
        color: #FFBD59;
        border: 2px solid #FFBD59;
        border-radius: 7px;
        padding: 0.4rem 0.8rem;
      }
    }
  }
</style>
