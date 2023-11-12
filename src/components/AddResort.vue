<template>
	<q-dialog :model-value="isOpen" transition-show="slide-up" transition-hide="slide-down" square @hide="$emit('close')">
		<q-card class="modal">
			<q-toolbar class="bg-secondary" style="color: white">
				<q-toolbar-title>Add Resort</q-toolbar-title>
				<q-btn icon="mdi-close" flat round dense @click="$emit('close')" />
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
						@update:model-value="formFields.image"
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

				<q-separator v-if="formFields.image" spaced="xl" />

				<q-img v-if="formFields.image" :src="String(formFields.image)" width="300px" />
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import type { IResort } from '@/types/resortType';
import $api from '@/services/apiService';

const props = defineProps<{
	isOpen: boolean;
	updateResort: IResort;
}>();

const emits = defineEmits(['add-resort', 'close']);

const { notify } = useQuasar();
const isLoading = ref<boolean>(false);

const formFields = ref<IResort>({
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
		const response = await $api.post<IResort, any>('resorts', formFields.value);

		notify({ message: `Resort ${formFields.value.name} added successfully`, type: 'positive' });
		emits('add-resort', response.data.data);
		emits('close');
		isLoading.value = false;
	} catch (error) {
		notify({ message: `Something went wrong`, type: 'negative' });
	}
}

console.log('update', props.updateResort);
if (props.updateResort) {
	formFields.value.name = props.updateResort.name;
	formFields.value.phone = props.updateResort.phone;
	formFields.value.isOpen = props.updateResort.isOpen;
	formFields.value.image = props.updateResort.image;
}
</script>

<style lang="scss" scoped>
.modal {
	width: 40%;
}
</style>
