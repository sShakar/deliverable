<template>
	<q-btn
		class="q-mb-md q-mx-auto"
		label="Add Resort"
		icon="mdi-plus-circle-multiple-outline"
		no-caps
		outline
		@click="isOpen = true"
	/>

	<q-dialog v-model="isOpen" transition-show="slide-up" transition-hide="slide-down" square @hide="isOpen = false">
		<q-card class="modal">
			<q-toolbar class="bg-secondary" style="color: white">
				<q-toolbar-title>Add Resort</q-toolbar-title>
				<q-btn icon="mdi-close" flat round dense @click="isOpen = false" />
			</q-toolbar>

			<q-card-section>
				<q-form class="q-gutter-md" @submit.prevent="onSubmit">
					<q-input
						class="col"
						v-model:model-value="formFields.name"
						:disable="isLoading"
						label="Name"
						color="secondary"
						outlined
					/>
					<q-input
						class="col"
						v-model:model-value="formFields.phone"
						:disable="isLoading"
						label="Phone Number"
						color="secondary"
						outlined
					/>
					<q-select
						class="col"
						v-model:model-value="formFields.isOpen"
						label="Plate Type"
						color="secondary"
						:disable="isLoading"
						:options="options"
						emit-value
						map-options
						outlined
					/>
					<q-file
						v-model:model-value="formFields.image"
						class="col"
						:disable="isLoading"
						label="Image"
						color="secondary"
						outlined
					/>

					<q-btn
						class="q-mt-md"
						label="Add"
						:loading="isLoading"
						color="secondary"
						icon="mdi-view-grid-plus"
						type="submit"
						no-caps
						unelevated
					/>
				</q-form>
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useQuasar } from 'quasar';
import type { IResort } from '@/types/resortType';
import type { IPostResponse } from '@/types/responseTypes';
import $api from '@/services/apiService';

const emits = defineEmits(['add-resort']);

const { notify } = useQuasar();
const isLoading = ref<boolean>(false);
const isOpen = ref<boolean>(false);

const formFields = reactive<IResort>({
	name: '',
	phone: '',
	isOpen: true,
	image: null
});

const options = ref<{ label: string; value: boolean }[]>([
	{ label: 'Open', value: true },
	{ label: 'Close', value: false }
]);

async function onSubmit() {
	try {
		isLoading.value = true;
		await $api.post<IResort, IPostResponse>('resorts', formFields);

		notify({ message: `Resort ${formFields.name} added successfully`, type: 'positive' });
		emits('add-resort');
		onReset();
	} catch (error) {
		notify({ message: `${error.message}`, type: 'negative' });
	} finally {
		isLoading.value = false;
		isOpen.value = false;
	}
}

function onReset() {
	formFields.name = '';
	formFields.phone = '';
	formFields.isOpen = true;
	formFields.image = null;
}
</script>

<style lang="scss" scoped>
.modal {
	width: 40%;
}
</style>
