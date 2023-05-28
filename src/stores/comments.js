import { defineStore } from 'pinia'
import { useApi } from '../composables/api'

export const useCommentStore = defineStore('comment', {
  state: () => ({
    comments: [],
  }),
  getters: {
    allComments: (state) => state.comments,
  },
  actions: {
    async create(payload) {
      try {
        const { data } = await useApi().post(`/api/comments/create`, payload)
        return data
      } catch (error) {
        throw error.response.data
      }
    },
    async getComments(param) {
      try {
        const { data } = await useApi().get(`/api/comments/issue/${param}`)
        this.comments = data
        return data
      } catch (error) {
        throw error.response.data
      }
    },
  }
})
