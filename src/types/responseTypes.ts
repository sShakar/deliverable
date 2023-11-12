import type { IResort } from '@/types/resortType';

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
