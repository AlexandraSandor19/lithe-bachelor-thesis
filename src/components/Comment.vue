<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
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
        return `about ${Math.floor(timeDiff)} minutes ago`
    } else {
        timeDiff /= 60;
        return `about ${Math.floor(timeDiff)} hours ago`;
    }
})

</script>

<template>
  <div class="comment-container">
    <div class="header">
        <div class="flex flex-row">
            <Avatar
                style="width: 2.3rem; height: 2.3rem"
                image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                class="mr-2"
                shape="circle"
            />
            <div class="flex flex-row align-items-center h-full">
                <span class="user-fullname">{{ fullname }}</span>
                <span class="username">{{ username }}</span>
            </div>
        </div>
        <span class="date">{{ date }}</span>
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
        margin-right: 1rem;
    }
}

.content {
    margin-top: 0.5rem;
    color: $dark-grey;
}
</style>
