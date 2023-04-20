import { defineStore } from "pinia";
import useApi from "../composables/api";


export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            user: {},
            accessToken: "",
        };
    },

    getters: {
        user: state => state.user,
        isAuthenticated: state => state.user?.id ? true : false,
    },

    actions: {
        async login(payload) {
            try {
                const {data} = await useApi.post(`/api/auth/login`, payload);
                this.accessToken = data?.access_token;
                return data;
            } catch (error) {
                throw error.response.message;
            };
        },
        async register(payload) {
            try {
                const {data} = await useApi.post(`/api/auth/register`, payload);
                return data;
            } catch (error) {
                throw error.response.message;
            };
        },
        async getUser() {
            try {
                const {data} = await useApi.get(`/api/auth/user`);
                this.user = data;
                return data;
            } catch (error) {
                throw error.response.message;
            };
        },
        async logout() {
            try {
                const {data} = await useApi.post(`/api/auth/logout`);
                this.accessToken = "";
                this.user = {};
                return data;
            } catch (error) {
                throw error.response.message;
            };
        },
        async refreshToken() {
            try {
                const {data} = await useApi.post(`/api/auth/logout`);
                this.accessToken = data?.access_token;
                return data;
            } catch (error) {
                throw error.response.message;
            };
        },
    },
});