<script setup>
import { computed, ref, reactive } from 'vue';

const props = defineProps({
  issue: {
    type: Object,
    required: true
  }
});

const issueColorClass = computed(() => {
    switch (props.issue.priority) {
        case 'Very Low':
            return 'vlow-pr-card';
        case 'Low':
            return 'low-pr-card';
        case 'Medium':
            return 'medium-pr-card';
        case 'High':
            return 'high-pr-card';
        case 'Very High':    
            return 'vhigh-pr-card';
        default:
            return 'medium-pr-card';
    }
})

const priorityIconClass = computed(() => {
    switch (props.issue.priority) {
        case 'Very Low':
            return 'pi pi-angle-double-down';
        case 'Low':
            return 'pi pi-angle-down';
        case 'Medium':
            return 'pi pi-bars';
        case 'High':
            return 'pi pi-angle-up';
        case 'Very High':    
            return 'pi pi-angle-double-up';
        default:
            return 'pi-question-circle'; 
    }
})

</script>

<template>
    <div class="issue-card" :class="issueColorClass">
        <span class="project">{{ props.issue.project }}</span>
        <div class="title">
            {{ props.issue.issue_title }}
        </div>
        <hr />
        <div class="flex flex-column">
            <div class="flex flex-row justify-content-between align-items-center">
                <span class="priority">
                    <span :class="priorityIconClass"></span>
                    {{ props.issue.priority }}
                </span>
            </div>
            <span class="points-text">
                Story points:
                <span class="points">{{ props.issue.points }}</span>
            </span>
            <span class="assignee">assignee: {{ props.issue.assignee }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.issue-card {
    border-radius: 10px;
    background-color: $white;
    box-shadow: $box-shadow1;
    margin: 1rem;
    font-family: $pt-sans-font;
    padding: 1.2rem 1.5rem;
    width: 13rem;
    //border: 1px solid $whiteish;

    hr {
        border-top: 1px solid $light-grey;
    }
}

.title {
    font-weight: 600;
    color: $black-2;
    margin-bottom: 0.6rem;
    font-size: 1.3rem;
}

.project {
    display: flex;
    justify-content: center;
    margin: 0.1rem 0 0.5rem 0;
    padding: 0.3rem 0.5rem;
    background-color: $light-purple;
    color: $white;
    font-size: 0.7rem;
    border-radius: 5px;
    width: fit-content;
}

.points-text {
    color: $dark-grey;
    .points {
        margin-right: 1rem;
        padding: 0.1rem 0.4rem;
        background-color: $blue;
        border: 1px solid $dark-blue;
        border-radius: 7px;
        color: $white;
        font-size: 0.8rem;
        width: fit-content;
    }
}

.priority {
    text-transform: lowercase;
    color: $dark-grey;
}

.assignee {
    color: $dark-grey;
}
</style>
