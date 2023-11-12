<template>
	<q-btn
		class="q-mb-md q-mx-auto"
		label="Add Resort"
		icon="mdi-plus-circle-multiple-outline"
		no-caps
		outline
		@click="isOpen = true"
	/>
	<add-resort
		:is-open="isOpen"
		:update-resort="updateResort"
		@close="() => (isOpen = false)"
		@add-resort="() => fetchRecords()"
	/>

	<q-table
		v-model:pagination="paginationState"
		:rows="rows"
		:columns="columns"
		row-key="name"
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
				<q-btn
					class="q-mr-sm"
					color="warning"
					icon="mdi-circle-edit-outline"
					flat
					round
					@click.prevent="onUpdate(row)"
				/>
				<q-btn color="negative" icon="mdi-trash-can-outline" flat round @click.prevent="deleteResort(row.id)" />
			</q-td>
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
import AddResort from '@/components/AddResort.vue';

const { notify } = useQuasar();
const baseURL = ref<string>(import.meta.env.VITE_DEFAULT_BASE_URL);
const isOpen = ref<boolean>(false);
const updateResort = ref<IResort | null>(null);

const paginationState = ref<NonNullable<QTableProps['pagination']>>({
	sortBy: 'name',
	descending: false,
	page: 1,
	rowsPerPage: 10
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
		field: (row: IResort) => (row.isOpen ? 'Open' : 'Closed')
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

function onUpdate(row: IResort) {
	isOpen.value = true;
	updateResort.value = row;
}

async function deleteResort(id: number): Promise<void> {
	try {
		await $api.delete<IResponse>(`resorts/${id}`);
		notify({ message: 'Deleted resort', type: 'positive' });
		await fetchRecords();
	} catch (error) {
		notify({ message: `Something went wrong`, type: 'negative' });
	}
}

async function fetchRecords(): Promise<void> {
	try {
		const response = await $api.get<IResponse>('resorts');
		rows.value = response.data;
		console.log(response.data);
	} catch (error) {
		notify({ message: `Something went wrong`, type: 'negative' });
	}
}

fetchRecords();
</script>
