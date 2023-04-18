import { watchEffect } from "vue";
import { useAuthStore } from "../stores/auth";
import { axiosInstance } from "../utils/axios";

export default function useApi() {

    const authStore = useAuthStore();

    watchEffect(() => {
        const requestIntercept = axiosInstance.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${authStore.accessToken}`
                }
                return config;
            },
            error => Promise.reject(error)
        );
        
        
        const responseIntercept = axiosInstance.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
    
                if (error?.response?.status === 403 || error?.response?.status === 401 && !prevRequest.sent) {
                    prevRequest.sent = true;
                    await authStore.refresh();
    
                    prevRequest.headers["Authorization"] = authStore.accessToken;
                    return axiosInstance(prevRequest);
                }
                return Promise.reject(error)
            }
        );
    })
    return axiosInstance;
}