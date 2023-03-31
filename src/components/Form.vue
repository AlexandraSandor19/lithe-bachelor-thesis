<script setup>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';

defineProps({
  formType: {
    type: String,
    required: true
  }
})

const username = ref(null);
const email = ref(null);
const password = ref(null);
</script>

<template>
    <section class="form">
        <div class="card">
            <Card class="form-container">
                <template #title> Log in </template>
                <template #content>
                    <div class="fields">
                        <div class="field-section">
                            <p class="field-text">Username</p>
                            <InputText type="text" v-model="username" />
                        </div>
                        <div class="field-section">
                            <p class="field-text">Email</p>
                            <InputText type="text" v-model="email" />
                        </div>
                    </div>
                </template>
            </Card>
        </div> 
    </section> 
</template>

<style lang="scss" scoped>
    .form {
        display: flex;
        background-color: #5E376D;
        min-height: 100vh;
        justify-content: center;
        align-items: center;
    }

    .form-container {
        width: 40rem;
        height: fit-content;
    }

    :deep(.p-card) {
        padding: 1rem 2rem;
    }

    :deep(.p-card-title) {
        color: #5E376D;
        font-size: 2.6rem;
    }

    .fields {
        display: flex;
        justify-content: left;

        &:deep(.p-inputtext) {
            height: 2.4rem;
            width: 14rem;
        }

        &:deep(.field-text) {
            margin-bottom: 0.4rem;
        }
    }

    .field-section {
        display: flex;
        flex-direction: column;
        padding-left: 0.2rem;
    }

</style>