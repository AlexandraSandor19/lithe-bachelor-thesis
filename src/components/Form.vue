<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  formType: {
    type: String,
    required: true
  }
})

const username = ref();
const surname = ref();
const forename = ref();
const email = ref();
const password = ref();
const confPassword = ref();
const role = ref();
const roles = ref([
    { title: 'Product Owner' },
    { title: 'Development Contributor' },
    { title: 'Scrum Master' },
]);

// TODO: Change multiple ref declaration to the state below

const title = computed(() => {
  return props.formType == 'sign-up' ? 'Get started!' : 'Log into your account!'
})

const subtitle = computed(() => {
  return props.formType == 'sign-up' ? {
        subtitleText: 'Already have an account?',
        link: 'Log in',
        path: '/log-in'
    } : {
        subtitleText: "Haven't registered yet?",
        link: 'Sign up',
        path: '/sign-up'
    };
})

const btnText = computed(() => {
  return props.formType == 'sign-up' ? 'Sign up' : 'Log in'
})
</script>

<template>
        <div class="card">
            <Card class="form-container">
                <template #title> {{ title }} </template>
                <template #subtitle> {{ subtitle.subtitleText }}
                    <a :href="subtitle.path" class="login-link">
                        {{ subtitle.link }}
                    </a> 
                </template>
                <template #content>
                    <form @submit="onSubmit" class="flex flex-column fields">
                        <div v-if="formType == 'sign-up'">
                            <div class="field-section">
                                <p class="field-text">Username</p>
                                <InputText type="text" v-model="username" />
                            </div>
                            <div class="flex flex-row">
                                <div class="flex flex-column field-section">
                                    <p class="field-text">Forename</p>
                                    <InputText type="text" v-model="forename" />
                                </div>
                                <div class="flex flex-column field-section">
                                    <p class="field-text">Surname</p>
                                    <InputText type="text" v-model="surname" />
                                </div>
                            </div>
                            <div class="flex flex-column field-section">
                                <p class="field-text">Role</p>
                                <Dropdown v-model="role" :options="roles" showClear optionLabel="title" />
                            </div>
                            <div class="flex flex-column field-section">
                                <p class="field-text">Email</p>
                                <InputText type="text" v-model="email" />
                            </div>
                            <div class="flex flex-row">
                                <div class="flex flex-column field-section">
                                    <p class="field-text">Password</p>
                                    <div class="card flex justify-content-center">
                                        <Password v-model="password" toggleMask />
                                    </div>
                                </div>
                                <div class="flex flex-column field-section">
                                    <p class="field-text">Confirm password</p>
                                    <div class="card flex justify-content-center">
                                        <Password v-model="confPassword" toggleMask />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="flex flex-column field-section">
                                <p class="field-text">Email</p>
                                <InputText type="text" v-model="email" />
                            </div>
                            <div class="flex flex-column field-section">
                                <p class="field-text">Password</p>
                                <Password v-model="password" toggleMask />
                            </div>
                        </div>
                        <div class="flex field-section">
                            <button class="form-btn shadow-2"> {{ btnText }} </button>
                        </div>
                    </form>
                </template>
            </Card>
        </div> 
</template>

<style lang="scss" scoped>
    .form-container {
        height: fit-content;
        width: fit-content;
    }

    :deep(.p-card) {
        padding: 0.7rem 2rem;
    }

    :deep(.p-card-title) {
        display: flex;
        justify-content: center;
        color: #8A6196;
        font-size: 2.5rem;
    }

    :deep(.p-card-subtitle) {
        display: flex;
        justify-content: center;
        font-size: 0.9rem;
    }

    :deep(.p-card-content) {
        align-items: center;
    }

    .fields {
        justify-content: center;

        .field-section {
            width: 100%;
            padding: 0 0.4rem 0.5rem 0.4rem;
        }

        &:deep(.p-inputtext, .p-password, p-dropdown) {
            height: 2.5rem;
            width: 100%;
        }

        &:deep(.field-text) {
            font-size: 0.7rem;
            margin-bottom: 0.2rem;
        }
    }

    .form-btn {
        height: 2.7rem;
        margin-top: 1.5rem; 
        width: 100%;
        font-size: 0.9rem;
        background-color: #8A6196;
        border: 2px solid #8A6196;
        border-radius: 0.2rem;
        color: $white;
        align-self: center;
        cursor: pointer;
        min-width: 20rem;
    }

    .login-link {
        margin-left: 0.3rem;
        cursor: pointer;
        color: $bcg-purple-pure;
        text-decoration: underline;
    }

</style>