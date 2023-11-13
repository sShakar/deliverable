import type { AxiosRequestConfig } from 'axios';
import axiosInstance from '@/plugins/axios';
import createFormData from '@/utils/createFormData';
import type { IResort } from '@/types/resortType';

class APIService {
	get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
		return axiosInstance.get(path, config);
	}

	post<T, P = null>(path: string, data: T, config?: AxiosRequestConfig): Promise<P> {
		const formData = createFormData(data as IResort);
		return axiosInstance.post(path, formData, config);
	}

	update<T, P = null>(path: string, data: T, config?: AxiosRequestConfig): Promise<P> {
		const formData = createFormData(data as IResort, true);
		return axiosInstance.post(path, formData, config);
	}

	delete<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
		return axiosInstance.delete(path, config);
	}
}

const $api = new APIService();

export default $api;
