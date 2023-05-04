<script setup>
import { ref } from 'vue';
import draggable from 'vuedraggable';
import IssueCard from './IssueCard.vue';

const issue = {
    issue_title: "My Issue",
    points: 5,
    priority: "High",
    assignee: "Alex",
};
</script>

<template>
    <h1>Favorite Foods</h1>
    <draggable>
        <IssueCard :issue="issue"/>
    </draggable>
  </template>

<style lang="scss" scoped>
</style>
