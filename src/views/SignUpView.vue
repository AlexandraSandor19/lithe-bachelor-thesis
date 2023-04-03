<script setup>
import Form from '../components/Form.vue';
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
  background: rgb(94,55,109);
  background: linear-gradient(180deg, rgba(94,55,109,1) 0%, rgba(171,128,180,1) 56%, rgba(150,160,108,0.829656862745098) 100%);
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>
