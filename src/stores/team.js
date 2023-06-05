import { defineStore } from 'pinia'
import { useApi } from '../composables/api'

export const useTeamStore = defineStore('team', {
  state: () => ({
    isTeamModalOpen: false,
    teams: [],
    selected_team: {},
    user_teams: []
  }),
  getters: {
    modalState: (state) => state.isTeamModalOpen,
    allTeams: (state) => state.teams,
    selectedTeam: (state) => state.selected_team,
    userTeams: (state) => state.user_teams
  },
  actions: {
    openTeamModal() {
      this.isTeamModalOpen = true
    },

    closeTeamModal() {
      this.isTeamModalOpen = false
    },

    async create(payload) {
      try {
        const { data } = await useApi().post(`/api/team/create`, payload)
        return data
      } catch (error) {
        throw error.response.data
      }
    },

    async getAllTeams() {
      try {
        const { data } = await useApi().get(`/api/team/getAll`)
        this.teams = data
        return data
      } catch (error) {
        throw error.response.data
      }
    },

    async getTeamById(id) {
      try {
        const { data } = await useApi().get(`/api/team/${id}`)
        return data
      } catch (error) {
        throw error.response.data
      }
    },

    async selectTeam(id) {
      try {
        const { data } = await useApi().get(`/api/team/${id}`)
        this.selected_team = data
        return data
      } catch (error) {
        throw error.response.data
      }
    },

    async getUserTeams(id) {
      try {
        const { data } = await useApi().get(`/api/team/users/${id}`)
        this.user_teams = data
        return data
      } catch (error) {
        throw error.response.data
      }
    },

    async joinTeam(team_id, user_id) {
      try {
        const { data } = await useApi().put(`/api/team/join/${team_id}`, { user_id: user_id})
        return data
      } catch (error) {
        return error.response.data
      }
    }
  }
})
