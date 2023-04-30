<script setup>
import Form from '../components/AuthForm.vue';
</script>

<template>
  <main>
    <div class="form">
      <Form formType="sign-up"/>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  background: $whiteish;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>
