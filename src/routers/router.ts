import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw, Router } from 'vue-router'

import Home from '@/pages/Home.vue'
import About from '@/pages/About.vue'

// cosnt authRoutes = 

const routes: RouteRecordRaw[] = [
  { path: '/home', component: Home },
  { path: '/about', component: About },
]


/**
 * staticRouter(静态路由)
 */
export const staticRouter: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: '/home'
	},
	{
		path: '/login',
		name: "login",
		component: () => import("@/pages/Login.vue"),
		meta: {
			title: "登录"
		}
	},
  {
		path: "/404",
		name: "404",
		component: () => import("@/pages/404.vue"),
		meta: {
			title: "404页面"
		}
	},
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    redirect: { name: "404" }
  }
];






const router: Router = createRouter({
  history: createWebHashHistory(),
  routes:[...staticRouter,...routes], // short for `routes: routes`
})

export default router
