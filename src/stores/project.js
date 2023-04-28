import { defineStore } from "pinia";

export const useProjectStore = defineStore('project', {
    state: () => ({
        isProjectModalOpen: false
    }),
    getters: {
        modalState: state => state.isProjectModalOpen,
    },
    actions: {
        openProjectModal() {
            this.isProjectModalOpen = true;
        },
        closeProjectModal() {
            this.isProjectModalOpen = false;
        }
    },
})
