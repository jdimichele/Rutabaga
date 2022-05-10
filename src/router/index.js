import { createRouter, createWebHistory } from "@ionic/vue-router";
import HomePage from "../pages/HomePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import { auth } from "../data/firebase.js";

const routes = [
  {
    path: "/",
    component: LoginPage,
  },
  /*     might make register and login the same page  {
        path: "/register",
        name: "register",
        component: () => import("@/pages/RegisterPage.vue"),
        meta: {
          authRequired: false,
        },
      }, */
  {
    path: "/home",
    component: HomePage,
    meta: {
      authRequired: true,
    },
    children: [
      {
        path: "",
        redirect: "/recipes",
      },
      {
        path: "/recipes",
        name: "recipes",
        component: () => import("@/pages/AllRecipesPage.vue"),
        meta: {
          authRequired: true,
        },
      },
      {
        path: "/favorites",
        name: "favorites",
        component: () => import("@/pages/FavoritesPage.vue"),
        meta: {
          authRequired: true,
        },
      },
      {
        path: "/addrecipe",
        name: "addrecipe",
        component: () => import("@/pages/AddRecipePage.vue"),
        meta: {
          authRequired: true,
        },
      },
      {
        path: "/search",
        name: "search",
        component: () => import("@/pages/SearchPage.vue"),
        meta: {
          authRequired: true,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.authRequired)) {
    if (auth.currentUser) {
      return next('/recipes');
    } else {
      alert("You must be logged in to see this page");
    }
  }
});

export default router;
