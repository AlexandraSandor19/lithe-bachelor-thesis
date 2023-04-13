<script setup>
import Form from '../components/Form.vue';
</script>

<template>
  <main>
    <div class="form">
      <Form formType="log-in"/>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  background: rgb(94,55,109);
  background: $bcg-purple-gradient;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>
