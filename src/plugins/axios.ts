import axios from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import storageService from '@/services/storageService';

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_DEFAULT_BASE_API,
	headers: {
		Authorization: `Bearer ${storageService.getToken()}`,
		Accept: 'application/json'
	},
	params: {
		token: storageService.getToken()
	}
});

axiosInstance.interceptors.request.use(requestCallback, errorCallback);
axiosInstance.interceptors.response.use(responseCallback, errorCallback);

function requestCallback(config: InternalAxiosRequestConfig) {
	if (config.headers && storageService.getToken())
		config.headers['Authorization'] = `Bearer ${storageService.getToken()}`;
	return config;
}
async function responseCallback(response: AxiosResponse) {
	return response.data;
}
function errorCallback(error: AxiosError) {
	return Promise.reject(error.response?.data);
}

export default axiosInstance;
