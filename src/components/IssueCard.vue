<script setup>
import { computed, ref, reactive } from 'vue';

const props = defineProps({
  issue: {
    type: Object,
    required: true
  }
});

</script>

<template>
    <div class="issue-card">
        <div class="title">
            {{ props.issue.issue_title }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.issue-card {
    border-radius: 5px;
    padding: 1rem 2rem;
    color: $white;
    box-shadow: $box-shadow1;
}
</style>
