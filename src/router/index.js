import { createRouter, createWebHistory } from "@ionic/vue-router";
import TabsPage from "../pages/main/TabsPage.vue";

import store from "../store/index.js";

const routes = [
  {
    path: "/recipes",
    component: TabsPage,

    children: [
      {
        path: "/",
        redirect: "/recipes",
      },
      {
        path: "/recipes",
        name: "recipes",
        component: () => import("@/pages/main/AllRecipesPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/recipes/:id",
        component: () => import("@/pages/subpages/RecipeDetails.vue"),
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "/favorites",
        name: "favorites",
        component: () => import("@/pages/main/FavoritesPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/addrecipe",
        name: "addrecipe",
        component: () => import("@/pages/main/AddRecipePage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/search",
        name: "search",
        component: () => import("@/pages/main/SearchPage.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/auth",
    component: () => import("@/pages/auth/AuthenticationPage.vue"),
    meta: { requiresUnauth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(function (to, from, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/recipes");
  } else {
    next();
  }
});

export default router;
