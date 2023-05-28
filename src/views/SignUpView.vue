<script setup>
import Form from '../components/AuthForm.vue'
</script>

<template>
  <main>
    <div class="form">
      <Form formType="sign-up" />
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  background-color: $eggshell;
  min-height: 100vh;
}
.form {
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>
