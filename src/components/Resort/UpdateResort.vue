<template>
	<q-btn class="q-mr-sm" color="warning" icon="mdi-circle-edit-outline" flat round @click="isOpen = true" />

	<q-dialog v-model="isOpen" transition-show="slide-up" transition-hide="slide-down" square @hide="isOpen = false">
		<q-card class="modal">
			<q-toolbar class="bg-secondary" style="color: white">
				<q-toolbar-title>Update Resort</q-toolbar-title>
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
						label="Update"
						:loading="isLoading"
						color="secondary"
						icon="mdi-circle-edit-outline"
						type="submit"
						no-caps
						unelevated
					/>
				</q-form>

				<q-separator v-if="formFields.image" spaced="xl" />

				<div class="">
					<div class="text-subtitle1">Current Image</div>
					<q-img alt="image" v-if="formFields.image" :src="`${baseURL}storage/${updateResort.image}`" width="300px" />
				</div>
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useQuasar } from 'quasar';
import type { IResort } from '@/types/resortType';
import $api from '@/services/apiService';

const props = defineProps<{
	updateResort: IResort;
}>();

const emits = defineEmits(['update-resort']);

const { notify } = useQuasar();
const baseURL = ref<string>(import.meta.env.VITE_DEFAULT_BASE_URL);
const isLoading = ref<boolean>(false);
const isOpen = ref<boolean>(false);

const formFields = reactive<IResort>({
	name: props.updateResort.name || '',
	phone: props.updateResort.phone || '',
	isOpen: (props.updateResort.isOpen == '1' ? 'Open' : 'Close') || true,
	image: props.updateResort.image || null
});

const options = ref<{ label: string; value: boolean }[]>([
	{ label: 'Open', value: true },
	{ label: 'Close', value: false }
]);

async function onSubmit() {
	try {
		isLoading.value = true;
		await $api.update<IResort, any>(`resorts/${props.updateResort.id}`, formFields);

		notify({ message: `Resort ${formFields.name} updated successfully`, type: 'positive' });
		emits('update-resort');
	} catch (error) {
		notify({ message: `${error.message}`, type: 'negative' });
	} finally {
		isLoading.value = false;
		isOpen.value = false;
	}
}
</script>

<style lang="scss" scoped>
.modal {
	width: 40%;

	@media (max-width: 768px) {
		width: 90%;
	}
}
</style>
