<script setup>
import { computed, ref, onMounted } from 'vue'

const message = ref("Nothing to show here");
</script>

<template>
  <main>
    <span>{{ message }}</span>
  </main>
</template>

<style lang="scss" scoped>
</style>
