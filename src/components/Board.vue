<script setup>
import { ref } from 'vue';
import draggable from 'vuedraggable';
import IssueCard from './IssueCard.vue';

const allIssues = ref([]);

const toDoIssues = ref([
    {
    issue_title: "My Issue1",
    project: "Marine Maps",
    points: 5,
    priority: "High",
    assignee: "Alex",
    },
    {
    issue_title: "My Issue2",
    project: "Marine Maps",
    points: 5,
    priority: "Very Low",
    assignee: "Alex",
    },
]);

const inProgressIssues = ref([
    {
    issue_title: "My Issue3",
    project: "Marine Maps",
    points: 1,
    priority: "High",
    assignee: "Alex",
    },
    {
    issue_title: "My Issue4",
    project: "Marine Maps",
    points: 2,
    priority: "High",
    assignee: "Alex",
    },
])
</script>

<template>
    <div class="flex flex-row">
        <div class="flex flex-column">
            <h1>TO DO</h1>
            <draggable v-model="toDoIssues" group="allIssues">
                <template #item="{ element: issue }">
                    <IssueCard :issue="issue"/>
                </template>
            </draggable>
        </div>
        <div class="flex flex-column">
            <h1>IN PROGRESS</h1>
            <draggable v-model="inProgressIssues" group="allIssues">
                <template #item="{ element: issue }">
                    <IssueCard :issue="issue"/>
                </template>
            </draggable>
        </div>
    </div>
</template>

<style lang="scss" scoped>
</style>
