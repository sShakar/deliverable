import type { AxiosRequestConfig } from 'axios';
import axiosInstance from '@/plugins/axios';
import type { IResort } from '@/types/resortType';

function createFormData({ name, phone, isOpen, image }: IResort) {
	const formData = new FormData();

	formData.append('name', name);
	formData.append('phone', phone);
	formData.append('isOpen', isOpen ? '1' : '0');

	if (image instanceof File) {
		formData.append('image', image, image.name);
	} else if (typeof image === 'string') {
		const imageUrlWithStorage = `${import.meta.env.VITE_DEFAULT_BASE_URL}storage/${image}`;
		formData.append('image', imageUrlWithStorage);
	} else {
		throw new Error('Image must be a File object or a URL string.');
	}

	return formData;
}

class APIService {
	get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
		return axiosInstance.get(path, config);
	}

	post<T, P = null>(path: string, data: T, config?: AxiosRequestConfig): Promise<P> {
		const formData = createFormData(data as IResort);
		return axiosInstance.post(path, formData, config);
	}

	update<T, P = null>(path: string, data: T, config?: AxiosRequestConfig): Promise<P> {
		const formData = createFormData(data as IResort);
		return axiosInstance.post(path, { ...formData, _method: 'PUT' }, config);
	}

	delete<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
		return axiosInstance.delete(path, config);
	}
}

const $api = new APIService();

export default $api;
