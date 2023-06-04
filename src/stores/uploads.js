import { defineStore } from 'pinia'
import { useApi } from '../composables/api'

export const useUploadsStore = defineStore('uploads', {
  state: () => ({
    profile_image: {}
  }),
  getters: {
    profileImage: (state) => state.profile_image
  },
  actions: {
    async upload(payload) {
      try {
        const { data } = await useApi().post(`/api/image/upload/encoded`, payload)
        this.profile_image = data
        return data
      } catch (error) {
        throw error
      }
    },
    async getImage(param) {
      try {
        const { data } = await useApi().get(`/api/image/encoded/user/${param}`)
        this.profile_image = data
        return data
      } catch (error) {
        throw error
      }
    },
  }
})
