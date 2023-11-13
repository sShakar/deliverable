import { defineStore } from 'pinia';

interface ISliderState {
	slides: Array<{ name: string; image: string }>;
}

export const useSliderStore = defineStore('SliderStore', {
	state: (): ISliderState => ({
		slides: [
			{
				name: 'image1',
				image: '/image1.jpg'
			},
			{
				name: 'image2',
				image: '/image2.jpg'
			},
			{
				name: 'image3',
				image: '/image3.jpg'
			},
			{
				name: 'image4',
				image: '/image4.jpg'
			}
		]
	}),
	getters: {
		getSlides: state => state.slides
	},
	actions: {}
});
