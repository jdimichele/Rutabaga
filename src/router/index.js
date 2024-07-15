import { createRouter, createWebHistory } from "@ionic/vue-router";
import TabsPage from "../pages/main/TabsPage.vue";
import { auth } from "../firebase.js";

const routes = [
  {
    path: "/",
    component: TabsPage,

    children: [
      {
        path: "/",
        redirect: "/recipes",
      },
      {
        path: "/recipes",
        name: "recipes",
        component: () => import("../pages/main/AllRecipesPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        name: "RecipeDetails",
        path: "/recipes/:id",
        component: () => import("../pages/subpages/RecipeDetails.vue"),
        props: true,
        meta: { requiresAuth: true },
      },
      {
        name: "EditRecipe",
        path: "/recipes/:id/edit",
        component: () => import("../pages/subpages/EditRecipe.vue"),
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "/favorites",
        name: "favorites",
        component: () => import("../pages/main/FavoritesPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/addrecipe",
        name: "addrecipe",
        component: () => import("../pages/main/AddRecipePage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/search",
        name: "search",
        component: () => import("../pages/main/SearchPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/user-settings",
        name: "user-settings",
        component: () => import("../pages/auth/UserSettingsPage.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/auth/LoginPage.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../pages/auth/RegisterPage.vue"),
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  let user = auth.currentUser;
  if (to.matched.some((res) => res.meta.requiresAuth)) {
    if (user) {
      return next();
    }
    return next("/login");
  }
  return next();
});

export default router;