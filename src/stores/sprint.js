import { defineStore } from 'pinia'
import { useApi } from '../composables/api'

export const useSprintStore = defineStore('sprint', {
  state: () => ({
    sprints: [],
  }),
  getters: {
    allSprints: (state) => state.sprints,
  },
  actions: {
    async create(payload) {
      try {
        const { data } = await useApi().post(`/api/sprint/create`, payload)
        return data
      } catch (error) {
        return error.response.data
      }
    },
    async getSprints() {
        try {
          const { data } = await useApi().get(`/api/sprint/upcomming`)
          this.sprints = data;
          return data
        } catch (error) {
          return error.response.data
        }
      },
  }
})
