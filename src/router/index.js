import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../pages/HomePage.vue';
//import LoginPage from '../pages/LoginPage.vue';

const routes = [
  {
    path: '/',
    component: HomePage,
    children: [
      {
        path: '',
        redirect: '/recipes'
      },
      {
        path: 'login',
        component: () => import('@/pages/LoginPage2.vue')
      },
      {
        path: 'recipes',
        component: () => import('@/pages/AllRecipesPage.vue')
      },
      {
        path: 'favorites',
        component: () => import('@/pages/FavoritesPage.vue')
      },
      {
        path: 'createrecipe',
        component: () => import('@/pages/CreateRecipePage.vue')
      },
      {
        path: 'search',
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
