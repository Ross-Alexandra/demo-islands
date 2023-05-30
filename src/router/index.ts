import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { publicIslands } from '@/publicIslands';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        ...Object.values(publicIslands).map(island => ({
            path: `/${island.name}`,
            name: island.name,
            component: () => import(`../views/IslandView.vue`)
        } as RouteRecordRaw)),
        {
            path: '/:pathMatch(.*)*',
            redirect: '/',
        }
        // {
        //     path: '/about',
        //     name: 'about',
        //     // route level code-splitting
        //     // this generates a separate chunk (About.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: () => import('../views/AboutView.vue')
        // }
    ]
})

export default router
