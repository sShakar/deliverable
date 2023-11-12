import { defineStore } from 'pinia';

interface ISliderState {
	slides: Array<{ name: string; image: string }>;
}

export const useSliderStore = defineStore('SliderStore', {
	state: (): ISliderState => ({
		slides: [
			{
				name: 'image1',
				image: './src/assets/images/image1.jpg'
			},
			{
				name: 'image2',
				image: './src/assets/images/image2.jpg'
			},
			{
				name: 'image3',
				image: './src/assets/images/image3.jpg'
			},
			{
				name: 'image4',
				image: './src/assets/images/image4.jpg'
			}
		]
	}),
	getters: {
		getSlides: state => state.slides
	},
	actions: {}
});
