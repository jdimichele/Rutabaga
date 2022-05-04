import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../pages/HomePage.vue';


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
        path: '/login',
        name: 'login',
        component: () => import('@/pages/LoginPage.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('@/pages/RegisterPage.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: '/recipes',
        name: 'recipes',
        component: () => import('@/pages/AllRecipesPage.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: '/favorites',
        name: 'favorites',
        component: () => import('@/pages/FavoritesPage.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: '/addrecipe',
        name: 'addrecipe',
        component: () => import('@/pages/AddRecipePage.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('@/pages/SearchPage.vue'),
        meta: {
          requiresAuth: false
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.authRequired)) {
//       if (firebase.auth().currentUser) {
//           next();
//       } else {
//           alert('You must be logged in to see this page');
//           next({
//               path: '/',
//           });
//       }
//   } else {
//       next();
//   }
// });

export default router
