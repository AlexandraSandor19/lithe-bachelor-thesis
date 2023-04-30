<script setup>
</script>

<template>
  <span class="container">
    <img class="logo" src="../assets/logo-pic.png" alt="">
    <span class="text">lithe</span>
  </span>
</template>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 4rem;

    .logo {
      width: 8%;
    }
  
    .text {
      font-family: $logo-font;
      font-size: 2rem;
      color: $bcg-purple-pure;
      margin-left: 5px;
    }
  }
</style>
