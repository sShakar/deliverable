<template>
	<q-carousel
		v-model="slide"
		class="full-width bg-amber text-white shadow-2 rounded-borders"
		transition-prev="jump-right"
		transition-next="jump-left"
		control-color="white"
		swipeable
		animated
		navigation
		arrows
	>
		<q-carousel-slide
			v-for="(slide, index) of sliderStore.getSlides"
			:key="index"
			:name="slide.name"
			class="q-pa-none column no-wrap flex-center"
		>
			<q-img class="full-height" :alt="slide.name" :src="slide.image" fit="cover" />
		</q-carousel-slide>
	</q-carousel>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useSliderStore } from '@/stores/sliderStore';

const sliderStore = useSliderStore();
const slide = ref<string>('image1');
</script>
