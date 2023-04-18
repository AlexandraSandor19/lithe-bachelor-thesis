import axios from 'axios';

export const axiosInstance = axios.create({
    baseUrl: import.meta.env.VITE_API_URI,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
})