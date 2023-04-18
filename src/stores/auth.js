import { defineStores } from "pinia";
import useApi from "../composables/api";

export class User{
    constructor(id, username, surname, forename, email, role) {
        this.id = id,
        this.username = username,
        this.surname = surname,
        this.forename = forename,
        this.email = email,
        this.role = role
    };
}

export class State {
    constructor(user) {
        this.user = user
    };
}

export const useAuthStore = defineStores('auth', {
    state: () => {
        return {
            user: User,
            accessToken: String,
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
            }
        },
        async register(payload) {
            try {
                const {data} = await useApi.post(`/api/auth/register`, payload);
                return data;
            } catch (error) {
                throw error.response.message;
            }
        },
        async getUser() {
            try {
                const {data} = await useApi.get(`/api/auth/user`);
                this.user = data;
                return data;
            } catch (error) {
                throw error.response.message;
            }
        },
        async logout() {
            try {
                const {data} = await useApi.post(`/api/auth/logout`);
                this.accessToken = "";
                this.user = {};
                return data;
            } catch (error) {
                throw error.response.message;
            }
        },
        async refreshToken() {
            try {
                const {data} = await useApi.post(`/api/auth/logout`);
                this.accessToken = data?.access_token;
                return data;
            } catch (error) {
                throw error.response.message;
            }
        },
    }
});