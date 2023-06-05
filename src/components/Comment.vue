<script setup>
import { computed, ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useUploadsStore } from '../stores/uploads'
import { useCommentStore } from '../stores/comments';

const props = defineProps({
    id: {
        type: String
    },
    user: {
        type: Object
    },
    content: {
        type: String
    },
    date: {
        type: Date
    },
})

const emit = defineEmits(
    ['refreshComments']
)

const userStore = useAuthStore()
const commentStore = useCommentStore()
const uploadsStore = useUploadsStore()

const menu = ref()
const image = ref(null)
const isLoaded = ref(false)

const removeOption = ref([
    {
        label: 'Delete comment',
        icon: 'pi pi-trash',
        command: async () => {
            if (props.user._id === userStore.userData._id) {
                const response = await commentStore.removeComment(props.id);
                console.log(response);
                emit('refreshComments', props.id);
            } else {
                console.log("doesn't work");
            }
        }
    }
])

const toggle = (event) => {
    menu.value.toggle(event);
};

const imageSource = computed(() => {
  if (image.value) {
    return `data:${uploadsStore.profileImage.image.contentType};base64,${uploadsStore.profileImage.image.data}`;
  }
})

const fullname = computed(() => {
    return `${props.user.forename} ${props.user.surname}`;
})

const username = computed(() => {
    return `@${props.user.username}`;
})

const date = computed(() => {
    const currentDate = new Date();;
    const timeDiffMs = currentDate.getTime() - props.date.getTime();
    let timeDiff = timeDiffMs / (1000 * 60);
    if (timeDiff < 1) {
        return 'just now';
    }
    if (timeDiff < 60) {
        return Math.floor(timeDiff) > 1 ? `about ${Math.floor(timeDiff)} minutes ago` : `about ${Math.floor(timeDiff)} minute ago`
    } else {
        if (timeDiff < 24) {
            timeDiff /= 60;
            return Math.floor(timeDiff) > 1 ? `about ${Math.floor(timeDiff)} hours ago` : `about ${Math.floor(timeDiff)} hour ago`;
        } else {
            timeDiff /= 60 * 24;
            if ( timeDiff < 7) {
                return Math.floor(timeDiff) > 1 ? `${Math.floor(timeDiff)} days ago` : `about ${Math.floor(timeDiff)} day ago`;   
            } else {
                timeDiff /= 7;
                return Math.floor(timeDiff) > 1 ? `about ${Math.floor(timeDiff)} weeks ago` : `about ${Math.floor(timeDiff)} week ago`;   
            }   
        }
    }
})

onMounted(async () => {
  await userStore.getUser();
  image.value = await uploadsStore.getImage(props.user._id);
  isLoaded.value = true;
})

</script>

<template>
  <div class="comment-container">
    <div class="header">
        <div class="flex flex-row">
            <Skeleton 
                v-if="!isLoaded" 
                shape="circle"
                size="2.5rem"
                class="mr-2"
            />
            <div v-else>
                <img
                    v-if="!image"
                    src="../assets/default-user-icon.jpg"
                    class="prf-image mr-2"
                />
                <img
                    v-else
                    :src="imageSource"
                    class="prf-image mr-2"
                />
            </div>
            <div class="flex flex-row align-items-center h-full">
                <span class="user-fullname">{{ fullname }}</span>
                <span class="username">{{ username }}</span>
            </div>
        </div>
        <div class="flex flex-row justify-content-center mt-1">
            <span class="date">{{ date }}</span>
            <div v-if="props.user._id === userStore.userData._id">
                <span class="pi pi-ellipsis-v" label="Toggle" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu"></span>
                <Menu 
                    ref="menu" 
                    id="overlay_menu" 
                    :model="removeOption" 
                    :popup="true"
                    style="width: fit-content; font-size: 0.9rem"
                    />
            </div>
        </div>
    </div>
    <div class="content" v-html="props.content"></div>
  </div>
</template>

<style lang="scss" scoped>

.comment-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid $whiteish;
    border-radius: 10px;
    height: fit-content;
    margin-top: 1rem;
    padding: 1rem;
    font-family: $pt-sans-font;
}

.prf-image {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    box-shadow: $box-shadow1;
    border: 0.9px solid $light-grey;
    object-fit: cover;
  }

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .user-fullname {
        color: $black-2;
        font-weight: 600;
        margin-right: 0.3rem;
    }

    .username {
        color: $grey;
        font-size: 0.9rem;
    }

    .date {
        color: $grey;
        font-size: 0.8rem;
        margin-right: 0.7rem;
    }

    :deep(.pi-ellipsis-v) {
        font-size: 0.8;
        color: $grey;
        cursor: pointer;
    }
}

.content {
    margin-top: 0.5rem;
    color: $dark-grey;
}
</style>
