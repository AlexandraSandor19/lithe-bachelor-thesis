import { defineStore } from "pinia";

export const useIssueStore = defineStore('issue', {
    state: () => ({
        isIssueModalOpen: false
    }),
    getters: {
        modalState: state => state.isIssueModalOpen,
    },
    actions: {
        openIssueModal() {
            this.isIssueModalOpen = true;
        },
        closeIssueModal() {
            this.isIssueModalOpen = false;
        }
    },
})