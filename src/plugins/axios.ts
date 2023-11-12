import axios from 'axios';
import type { InternalAxiosRequestConfig, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import storageService from '@/services/storageService';

const api = axios.create({
	baseURL: import.meta.env.VITE_DEFAULT_BASE_API,
	headers: {
		Authorization: `Bearer ${storageService.getToken()}`
	}
});

api.interceptors.request.use(requestCallback, errorCallback);
api.interceptors.response.use(responseCallback, errorCallback);

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

class APIService {
	get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
		return api.get(path, config);
	}

	post<T, P = null>(path: string, data: T, config?: AxiosRequestConfig): Promise<P> {
		return api.post(path, data, config);
	}

	patch<T, P = null>(path: string, data: T, config?: AxiosRequestConfig): Promise<P> {
		return api.patch(path, data, config);
	}

	delete<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
		return api.delete(path, config);
	}
}

export const $api = new APIService();
