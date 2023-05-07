import { defineStore } from "pinia";
import { useApi } from "../composables/api";

export const useTeamStore = defineStore('team', {
    state: () => ({
        isTeamModalOpen: false,
        teams: [],
        my_teams: []
    }),
    getters: {
        modalState: state => state.isTeamModalOpen,
        allTeams: state =>  state.teams,
        myTeams: state => state.my_teams,
        suggestedTeams: state => state.teams.filter(team => !state.my_teams.some(myTeam => myTeam.team_name === team.team_name))
    },
    actions: {
        openTeamModal() {
            this.isTeamModalOpen = true;
        },

        closeTeamModal() {
            this.isTeamModalOpen = false;
        },

        async create(payload) {
            try {
                const {data} = await useApi().post(`/api/team/create`, payload);
                return data;
            } catch (error) {
                throw error.response.data;
            }
        },

        async getAllTeams() {
            try {
                const {data} = await useApi().get(`/api/team/getAll`);
                this.teams = data;
                return data;
            } catch (error) {
                throw error.response.data;
            }
        },

        async getMyTeams(param) {
            try {
                const {data} = await useApi().get(`/api/team/getUserTeams/${param}`);
                this.my_teams = data;
                return data;
            } catch (error) {
                throw error.response.data;
            }
        }
    },
})