import { defineStore } from "pinia";
import { useApi, useApiPrivate } from "../composables/api";


export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            user: {},
            accessToken: "",
            authReady: false,
        };
    },

    getters: {
        userData: state => state.user,
        isAuthenticated: state => state.accessToken ? true : false,
    },

    actions: {
        async attemptForUser() {
            try {
                await this.refreshToken();
                await this.getUser();
            } catch (error) {
                return;
            }

            return;
        },

        async login(payload) {
            try {
                const {data} = await useApi().post(`/api/auth/login`, payload);
                this.accessToken = data.access_token;
                await this.getUser();
                return data;
            } catch (error) {
                throw error.response.data;
            };
        },

        async register(payload) {
            try {
                const {data} = await useApi().post(`/api/auth/register`, payload);
                return data;
            } catch (error) {
                throw error.response.data;
            }
        },

        async getUser() {
            try {
                const {data} = await useApiPrivate().get(`/api/auth/user`);
                this.user = data;
                return data;
            } catch (error) {
                throw error.response.data;
            }
        },

        async logout() {
            try {
                const {data} = await useApiPrivate().post(`/api/auth/logout`);
                this.accessToken = "";
                this.user = {};
                return data;
            } catch (error) {
                throw error.response.data;
            }
        },

        async refreshToken() {
            try {
                const {data} = await useApi().post(`/api/auth/refresh`);
                this.accessToken = data?.access_token;
                return data;
            } catch (error) {
                throw error.response.data;
            }
        },
    },
});