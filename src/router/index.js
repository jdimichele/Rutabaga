import { createRouter, createWebHistory } from "@ionic/vue-router";
import HomePage from "../pages/HomePage.vue";
import { auth } from "../data/firebase.js";

const guard = (to, from, next) => {
  try {
    if (auth.currentUser) {
      next();
    } else {
      alert("You must be logged in to see this page");
      next("/");
    }
  } catch (error){
    next("/");
  }
};

const routes = [
  {
    path: "/",
    component: () => import("@/pages/LoginPage.vue"),
  },
  {
    path: "/home",
    component: HomePage,
    //beforeEnter: guard,

    children: [
      {
        path: "/home",
        redirect: "/recipes",
      },
      {
        path: "/recipes",
        name: "recipes",
        component: () => import("@/pages/AllRecipesPage.vue"),
        //beforeEnter: guard,
      },
      {
        path: "/favorites",
        name: "favorites",
        component: () => import("@/pages/FavoritesPage.vue"),
        beforeEnter: guard,
      },
      {
        path: "/addrecipe",
        name: "addrecipe",
        component: () => import("@/pages/AddRecipePage.vue"),
        beforeEnter: guard,
      },
      {
        path: "/search",
        name: "search",
        component: () => import("@/pages/SearchPage.vue"),
        beforeEnter: guard,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
