import { createRouter, createWebHistory } from '@ionic/vue-router';
//import { RouteRecordRaw } from 'vue-router';
import HomePage from '../HomePage.vue'

const routes = [
  {
    path: '/',
    redirect: '/home/arecipes'
  },
  {
    path: '/home/',
    component: HomePage,
    children: [
      {
        path: '',
        redirect: '/home/arecipes'
      },
      {
        path: 'arecipes',
        component: () => import('@/pages/AllRecipesPage.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/pages/Tab2Page.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/pages/Tab3Page.vue')
      },
      {
        path: 'tab4',
        component: () => import('@/pages/SearchPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
