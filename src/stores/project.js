import { defineStore } from 'pinia'
import { useApi } from '../composables/api'

export const useProjectStore = defineStore('project', {
  state: () => ({
    isProjectModalOpen: false,
    projects: []
  }),
  getters: {
    modalState: (state) => state.isProjectModalOpen,
    allProjects: (state) => state.projects,
    myProjects: (state) => state.my_projects
  },
  actions: {
    openProjectModal() {
      this.isProjectModalOpen = true
    },
    closeProjectModal() {
      this.isProjectModalOpen = false
    },
    async create(payload) {
      try {
        const { data } = await useApi().post(`/api/projects/create`, payload)
        return data
      } catch (error) {
        throw error.response.data
      }
    },
    async getAllProjects() {
      try {
        const { data } = await useApi().get(`/api/projects/getAll`)
        this.projects = data
        return data
      } catch (error) {
        throw error.response.data
      }
    },
    async getProjectById(id) {
      try {
        const { data } = await useApi().get(`/api/projects/${id}`)
        return data
      } catch (error) {
        throw error.response.data
      }
    },
    async getTeamProjects(id) {
      try {
        const { data } = await useApi().get(`/api/projects/teams/${id}`)
        return data
      } catch (error) {
        throw error.response.data
      }
    }
  }
})
