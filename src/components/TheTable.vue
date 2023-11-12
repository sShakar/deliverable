<template>
	<q-btn class="q-mb-md q-mx-auto" label="Add Resort" icon="mdi-plus-circle-multiple-outline" no-caps outline />

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
				<q-img :src="row.image" width="100px" fit="cover" />
			</q-td>
		</template>
		<template #body-cell-action>
			<q-td>
				<q-btn color="warning" icon="mdi-circle-edit-outline" class="q-mr-sm" />
				<q-btn color="negative" icon="mdi-trash-can-outline" />
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

const { notify } = useQuasar();

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

async function fetchRecords(): Promise<void> {
	try {
		const response = await $api.get<IResponse>('resorts');
		rows.value = response.data;
	} catch (error) {
		notify({ message: `Something went wrong`, type: 'negative' });
	}
}

fetchRecords();
</script>
