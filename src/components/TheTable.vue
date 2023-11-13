<template>
	<add-resort @add-resort="() => onRequest()" />

	<q-table
		v-model:pagination="paginationState"
		:rows-per-page-options="[10]"
		:rows="rows"
		:columns="columns"
		row-key="name"
		:loading="isLoading"
		:dense="$q.screen.lt.md"
		flat
		bordered
	>
		<template #body-cell-image="{ row }">
			<q-td class="text-center cursor-pointer">
				<q-img alt="image" :src="`${baseURL}storage/${row.image}`" width="100px" />
			</q-td>
		</template>
		<template #body-cell-action="{ row }">
			<q-td class="text-center">
				<update-resort :update-resort="row" @update-resort="() => onRequest()" />
				<q-btn color="negative" icon="mdi-trash-can-outline" flat round @click.prevent="deleteResort(row.id)" />
			</q-td>
		</template>
		<template #pagination>
			<div class="flex justify-center items-center">
				<q-btn
					icon="mdi-chevron-double-left"
					color="grey-8"
					round
					dense
					flat
					:disable="!response.prev_page_url"
					@click="fetchRecords('first')"
				/>
				<q-btn
					icon="mdi-chevron-left"
					color="grey-8"
					round
					dense
					flat
					:disable="!response.prev_page_url"
					@click="fetchRecords('previous')"
				/>

				<div class="text-subtitle1">
					{{ `${response.from} - ${response.to} of ${response.total}` }}
				</div>

				<q-btn
					icon="mdi-chevron-right"
					color="grey-8"
					round
					dense
					flat
					:disable="!response.next_page_url"
					@click="fetchRecords('next')"
				/>
				<q-btn
					icon="mdi-chevron-double-right"
					color="grey-8"
					round
					dense
					flat
					:disable="!response.next_page_url"
					@click="fetchRecords('last')"
				/>
			</div>
		</template>
	</q-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import type { QTableProps } from 'quasar';
import type { IResort } from '@/types/resortType';
import type { IResponse } from '@/types/responseTypes';
import $api from '@/services/apiService';
import AddResort from '@/components/Resort/AddResort.vue';
import UpdateResort from '@/components/Resort/UpdateResort.vue';

const { notify } = useQuasar();
const baseURL = ref<string>(import.meta.env.VITE_DEFAULT_BASE_URL);
const isLoading = ref<boolean>(false);

const paginationState = ref<NonNullable<QTableProps['pagination']>>({
	sortBy: 'name',
	descending: false,
	page: 1,
	rowsPerPage: 10,
	rowsNumber: 0
});

const response = ref<IResponse>({
	current_page: 1,
	data: [],
	first_page_url: '',
	from: 0,
	last_page: 0,
	last_page_url: '',
	links: [],
	next_page_url: '',
	path: '',
	per_page: 10,
	prev_page_url: '',
	to: 0,
	total: 0
});

const columns = ref<QTableProps['columns']>([
	{
		name: 'name',
		label: 'Name',
		align: 'center',
		field: 'name'
	},
	{
		name: 'phone',
		label: 'Phone',
		align: 'center',
		field: 'phone'
	},
	{
		name: 'isOpen',
		label: 'Is Open',
		align: 'center',
		field: (row: IResort) => (row.isOpen === '1' ? 'Open' : 'Closed')
	},
	{
		name: 'image',
		label: 'Image',
		align: 'center',
		field: 'image'
	},
	{
		name: 'action',
		label: 'Action',
		align: 'center',
		field: 'action'
	}
]);

const rows = ref<IResort[]>([]);

async function deleteResort(id: number): Promise<void> {
	try {
		await $api.delete<IResponse>(`resorts/${id}`);
		notify({ message: 'Deleted resort', type: 'positive' });
		await onRequest();
	} catch (error) {
		notify({ message: `Something went wrong`, type: 'negative' });
	}
}

async function onRequest(): Promise<void> {
	response.value.next_page_url = 'resorts?page=1';
	response.value.prev_page_url = null;

	await fetchRecords('next');
}

async function fetchRecords(page: string): Promise<void> {
	let pageURL: string | null = '';
	switch (page) {
		case 'first':
			pageURL = response.value.first_page_url;
			break;
		case 'previous':
			pageURL = response.value.prev_page_url;
			break;
		case 'next':
			pageURL = response.value.next_page_url;
			break;
		case 'last':
			pageURL = response.value.last_page_url;
			break;
	}

	try {
		isLoading.value = true;
		const data = await $api.get<IResponse>(`${pageURL}`);
		response.value = data;
		rows.value = data.data;
	} catch (error) {
		notify({ message: `${error.message}`, type: 'negative' });
	} finally {
		isLoading.value = false;
	}
}

onRequest();
</script>
