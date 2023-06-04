import { defineStore } from 'pinia'
import { useApi } from '../composables/api'

export const useIssueStore = defineStore('issue', {
  state: () => ({
    issues: [],
    isIssueModalOpen: false
  }),
  getters: {
    allIssues: (state) => state.issues,
    modalState: (state) => state.isIssueModalOpen
  },
  actions: {
    openIssueModal() {
      this.isIssueModalOpen = true
    },
    closeIssueModal() {
      this.isIssueModalOpen = false
    },
    async create(payload) {
      try {
        const { data } = await useApi().post(`/api/issue/create`, payload)
        return data
      } catch (error) {
        throw error.response.data
      }
    },
    async getAll() {
      try {
        const { data } = await useApi().get(`/api/issue/getAll`)
        this.issues = data
        return data
      } catch (error) {
        throw error.response.data
      }
    },
    async getProjectIssues(param) {
      try {
        const { data } = await useApi().get(`/api/issue/projects/${param}`)
        return data
      } catch (error) {
        throw error.response.data
      }
    },
    async getIssueById(param) {
      try {
        const { data } = await useApi().get(`/api/issue/${param}`)
        return data
      } catch (error) {
        throw error.response.data
      }
    },
    async pointIssue(param, payload) {
      try {
        const { data } = await useApi().put(`/api/issue/points/${param}`, payload)
        return data
      } catch (error) {
        throw error.response.data
      }
    },
    async changeStatus(param, payload) {
      try {
        const { data } = await useApi().put(`/api/issue/status/${param}`, payload)
        return data
      } catch (error) {
        throw error.response.data
      }
    },
  }
})
