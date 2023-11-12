import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'home',
		redirect: '/dashboard',
		component: () => import('@/layouts/MainLayout.vue'),

		children: [
			{
				path: '/',
				name: 'home',
				component: () => import('@/views/HomeView.vue')
			}
		]
	},

	{
		name: 'not-found',
		path: '/:catchAll(.*)*',
		component: () => import('@/views/ErrorNotFound.vue')
	}
];

export default routes;
