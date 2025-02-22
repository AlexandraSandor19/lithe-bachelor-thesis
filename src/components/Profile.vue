<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useUploadsStore } from '../stores/uploads'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const uploadStore = useUploadsStore()
const router = useRouter()

const isLoaded = ref(false)
const photo = ref()
const selectedPhoto = ref()

const user = computed(() => {
  return authStore.userData
})

const state = reactive({
  teams: ['Gamma', 'Charlie', 'Delta'],
  projects: ['Marine Maps', 'Email Services', 'SSO Portal', 'Product Page']
})

const adUsername = computed(() => {
  return `@${authStore.userData.username}`
})

const imageSource = computed(() => {
  return `data:${uploadStore.profileImage.image.contentType};base64,${uploadStore.profileImage.image.data}`;
})

const onFileSelected = (event) => {
  selectedPhoto.value = event.target.files[0]
}

async function uploadFile() {
  try {
    const file = selectedPhoto.value;
    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', file.name);
    formData.append('owner_id', authStore.userData._id);
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await authStore.getUser()
  await uploadStore.getImage(authStore.userData._id);
  isLoaded.value = true
})
</script>

<template>
  <div class="prf-section">
    <span class="prf-label">Personal profile</span>
    <Divider type="solid" class="m-2" />
    <div v-if="user" class="flex flex-row h-9">
      <div class="flex flex-column w-max mr-5">
        <div class="image-section">
          <Skeleton 
            v-if="!isLoaded" 
            shape="circle"
            size="14rem"
            />
          <div v-else>
            <img
              v-if="uploadStore.profileImage"
              class="prf-image"
              :src="imageSource"
            />
            <img
              v-else
              class="prf-image"
              src="../assets/default-user-icon.jpg"
              alt="Profile Image"
            />
          </div>
          <div class="name-section">
            <span class="fullname">{{ user.fullName }}</span>
            <span class="username">{{ adUsername }}</span>
          </div>
        </div>
        <span class="info-label">
          <span class="pi pi-user mr-2" style="font-size: 0.9rem"></span>
          About
        </span>
        <div class="container personal-details">
          <div class="flex flex-row p-3 w-max">
            <span class="detail-label">Title:</span>
            <span>{{ user.role }}</span>
          </div>
          <div class="flex flex-row p-3 w-max">
            <span class="detail-label">Email:</span>
            <span>{{ user.email }}</span>
          </div>
        </div>
        <input type="file" @change="onFileSelected" />
        <button @click="uploadFile" class="edit-btn">
          <span class="pi pi-pencil"></span>
          Update profile
        </button>
      </div>
      <div class="flex flex-column w-full mt-2 ml-4">
        <span class="info-label">
          <span class="pi pi-chart-bar mr-2" style="font-size: 0.9rem"></span>
          Activity
        </span>
        <div class="container activity-section">
          <span class="flex align-items-center">
            <span class="pi pi-angle-right mr-1"></span>
            <span class="activity-label">Part of these teams..</span>
          </span>
          <div v-if="state.teams.length <= 3" v-for="team in state.teams" class="activity-list">
            <Chip class="pl-0 pr-3 mt-3" style="box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px">
              <span
                class="chip-circle border-circle w-2rem h-2rem flex align-items-center justify-content-center"
                >{{ team.charAt(0) }}</span
              >
              <span class="chip-label">{{ team }}</span>
            </Chip>
          </div>
          <div v-else>
            <div v-for="team in state.teams.slice(0, 3)" class="activity-list">
              <Chip
                class="pl-0 pr-3 mt-3"
                style="box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
              >
                <span
                  class="chip-circle border-circle w-2rem h-2rem flex align-items-center justify-content-center"
                  >{{ team.charAt(0) }}</span
                >
                <span class="chip-label">{{ team }}</span>
              </Chip>
            </div>
            <span class="see-more">Show more..</span>
          </div>
          <Divider />
          <span class="flex align-items-center">
            <span class="pi pi-angle-right mr-1"></span>
            <span class="activity-label">Contributed to these projects..</span>
          </span>
          <div
            v-if="state.projects.length <= 3"
            v-for="project in state.projects"
            class="activity-list"
          >
            <Chip class="pl-0 pr-3 mt-3" style="box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px">
              <span
                class="chip-circle border-circle w-2rem h-2rem flex align-items-center justify-content-center"
                >{{ project.charAt(0) }}</span
              >
              <span class="chip-label">{{ project }}</span>
            </Chip>
          </div>
          <div v-else class="flex flex-column">
            <div v-for="project in state.projects.slice(0, 3)" class="activity-list">
              <Chip
                class="pl-0 pr-3 mt-3"
                style="box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
              >
                <span
                  class="chip-circle border-circle w-2rem h-2rem flex align-items-center justify-content-center"
                  >{{ project.charAt(0) }}</span
                >
                <span class="chip-label">{{ project }}</span>
              </Chip>
            </div>
            <span class="see-more">See more..</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.prf-section {
  margin: 1.5rem 2rem 0rem 2rem;
  display: flex;
  flex-direction: column;
  font-family: $pt-sans-font;
  padding: 1.3rem 3.2rem;
  height: fit-content;
  min-height: calc(100vh - 7.5rem);
  width: 100%;
  padding-bottom: 0rem;
  background-color: $white;
  border-radius: 5px;
  z-index: 0;
  box-shadow: $box-shadow1;
}

.prf-label {
  color: $dark-grey;
  font-size: 1.4rem;
}

.image-section {
  display: flex;
  flex-direction: row;
  margin-top: 0.7rem;
  margin-bottom: 1.7rem;
  min-height: 225px;
  align-items: top;
}

.prf-image {
  width: 14rem;
  height: 14rem;
  border-radius: 50%;
  box-shadow: $box-shadow1;
  object-fit: cover;
  border: 0.9px solid $light-grey;
}

.info-label {
  padding: 0.7rem 0 0.6rem 1rem;
  color: $grey;
  font-size: 0.9rem;
  font-weight: 700;
}

.name-section {
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin-left: 1rem;
  width: max-content;

  .fullname {
    color: $black-1;
    font-size: 1.8rem;
  }

  .username {
    color: $black-2;
    font-size: 1rem;
  }
}

.container {
  padding: 0.5rem 0 0.5rem 0;
  border: 1px solid #e7e7e7;
  border-radius: 5px;
  font-size: 0.9rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.personal-details {
  display: flex;
  flex-direction: column;
  width: max-content;
  width: 100%;
  padding: 0.7rem;
}

.detail-label {
  margin-right: 1rem;
  color: $black-1;
  font-weight: 600;
}

.activity-section {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 1rem 1.7rem;
}

.activity-list {
  display: flex;
  flex-direction: column;
  width: max-content;
}

.chip-circle {
  background: linear-gradient(
    180deg,
    rgba(94, 55, 109, 1) 0%,
    rgb(210, 163, 219) 56%,
    rgb(127, 81, 135) 100%
  );
  color: white;
}

.activity-label {
  color: $dark-grey;
  font-size: 0.9rem;
  font-weight: 600;
}

.see-more {
  color: $grey;
  font-size: 0.9rem;
  margin: 1rem 0 0.5rem 0.5rem;
  cursor: pointer;
  width: fit-content;
}

.chip-label {
  margin-left: 0.5rem;
  font-size: 0.9rem;
  font-family: $pt-sans-font;
  color: $black-1;
}

.edit-btn {
  color: $grey;
  cursor: pointer;
  font-size: 0.9rem;
  border: 1.7px solid #ab80b4;
  width: fit-content;
  padding: 0.7rem 0.8rem;
  border-radius: 5px;
  margin-top: 0.9rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
</style>
