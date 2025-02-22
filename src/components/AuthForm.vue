<script setup>
import { ref, computed, reactive } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const props = defineProps({
  formType: {
    type: String,
    required: true
  }
})

const authStore = useAuthStore()
const router = useRouter()

const state = reactive({
  username: '',
  surname: '',
  forename: '',
  email: '',
  role: '',
  password: '',
  password_confirm: ''
})

const roles = ref([
  { title: 'Product Owner' },
  { title: 'Development Contributor' },
  { title: 'Scrum Master' }
])

const title = computed(() => {
  return props.formType == 'sign-up' ? 'Get started!' : 'Log into your account!'
})

const subtitle = computed(() => {
  return props.formType == 'sign-up'
    ? {
        subtitleText: 'Already have an account?',
        link: 'Log in',
        path: '/log-in'
      }
    : {
        subtitleText: "Haven't registered yet?",
        link: 'Sign up',
        path: '/sign-up'
      }
})

const btnText = computed(() => {
  return props.formType == 'sign-up' ? 'Sign up' : 'Log in'
})

const errorMessage = ref('')
const errorSummary = ref('')

async function onSubmit() {
  if (props.formType === 'sign-up') {
    const data = {
      username: state.username,
      surname: state.surname,
      forename: state.forename,
      email: state.email,
      role: state.role.title,
      password: state.password,
      password_confirm: state.password_confirm
    }

    await authStore
      .register(data)
      .then((res) => {
        router.replace({ name: 'login' })
      })
      .catch((err) => {
        errorMessage.value = err.message
        errorSummary.value = 'Register Failed'
        showError()
      })
  } else {
    const data = {
      email: state.email,
      password: state.password
    }

    await authStore
      .login(data)
      .then((res) => {
        router.replace({ name: 'home' })
      })
      .catch((err) => {
        console.log(err)
        errorMessage.value = err.message
        errorSummary.value = 'Login Failed'
        showError()
      })
  }
}

const showError = () => {
  toast.add({
    severity: 'error',
    summary: errorSummary.value,
    detail: errorMessage.value,
    life: 3000
  })
}
</script>

<template>
  <div class="card">
    <Card class="form-container">
      <template #title> {{ title }} </template>
      <template #subtitle>
        {{ subtitle.subtitleText }}
        <a :href="subtitle.path" class="login-link">
          {{ subtitle.link }}
        </a>
      </template>
      <template #content>
        <form @submit.prevent="onSubmit" class="flex flex-column fields">
          <div v-if="formType == 'sign-up'">
            <div class="field-section">
              <p class="field-text">Username</p>
              <InputText type="text" v-model="state.username" />
            </div>
            <div class="flex flex-row">
              <div class="flex flex-column field-section">
                <p class="field-text">Forename</p>
                <InputText type="text" v-model="state.forename" />
              </div>
              <div class="flex flex-column field-section">
                <p class="field-text">Surname</p>
                <InputText type="text" v-model="state.surname" />
              </div>
            </div>
            <div class="flex flex-column field-section">
              <p class="field-text">Role</p>
              <Dropdown v-model="state.role" :options="roles" showClear optionLabel="title" />
            </div>
            <div class="flex flex-column field-section">
              <p class="field-text">Email</p>
              <InputText type="text" v-model="state.email" />
            </div>
            <div class="flex flex-row">
              <div class="flex flex-column field-section">
                <p class="field-text">Password</p>
                <div class="card flex justify-content-center">
                  <Password v-model="state.password" toggleMask />
                </div>
              </div>
              <div class="flex flex-column field-section">
                <p class="field-text">Confirm password</p>
                <div class="card flex justify-content-center">
                  <Password v-model="state.password_confirm" toggleMask />
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="flex flex-column field-section">
              <p class="field-text">Email</p>
              <InputText type="text" v-model="state.email" />
            </div>
            <div class="flex flex-column field-section">
              <p class="field-text">Password</p>
              <Password v-model="state.password" toggleMask />
            </div>
          </div>
          <div class="flex field-section">
            <button type="submit" class="form-btn shadow-2">{{ btnText }}</button>
          </div>
        </form>
      </template>
    </Card>
  </div>
  <Toast />
</template>

<style lang="scss" scoped>
.form-container {
  height: fit-content;
  width: fit-content;
}

:deep(.p-card) {
  padding: 1rem 3.5rem 1rem 3.5rem;
  font-family: $pt-sans-font;
  border-radius: 3%;
  border-top-right-radius: 10%;
  border-top-left-radius: 10%;
  border-top: 8px solid $main-purple;
}

:deep(.p-card-title) {
  display: flex;
  justify-content: center;
  color: $main-purple;
  font-size: 2.5rem;
}

:deep(.p-card-subtitle) {
  display: flex;
  justify-content: center;
  font-size: 0.95rem;
  margin-bottom: 1rem;
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
    font-size: 0.8rem;
    margin-bottom: 0.2rem;
  }
}

.form-btn {
  height: 2.7rem;
  margin-top: 1.5rem;
  width: 100%;
  font-size: 0.9rem;
  background-color: $main-purple;
  border: 2px solid $main-purple;
  border-radius: 0.2rem;
  color: $white;
  align-self: center;
  cursor: pointer;
  min-width: 20rem;
}

.login-link {
  margin-left: 0.3rem;
  cursor: pointer;
  color: $main-purple;
  text-decoration: underline;
}
</style>
