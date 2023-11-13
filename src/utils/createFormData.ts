import type { IResort } from '@/types/resortType';

export default function createFormData({ name, phone, isOpen, image }: IResort, isUpdate = false): FormData {
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

	if (isUpdate) {
		formData.append('_method', 'PUT');
	}

	return formData;
}
