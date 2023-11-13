import type { IResort } from '@/types/resortType';

export interface IPostResponse {
	name: string | null;
	phone: string | null;
	isOpen: string | null;
	image: string | null;
	token: string | null;
	updated_at: string | null;
	created_at: string | null;
	id: number | null;
}

export interface IResponse {
	current_page: number | null;
	data: IResort[];
	first_page_url: string | null;
	from: number | null;
	last_page: number | null;
	last_page_url: string | null;
	links: ILink[];
	next_page_url: string | null;
	path: string | null;
	per_page: number | null;
	prev_page_url: string | null;
	to: number | null;
	total: number | null;
}

interface ILink {
	url: string | null;
	label: string;
	active: boolean;
}
