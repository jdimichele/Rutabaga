import { createRouter, createWebHistory } from "@ionic/vue-router";
import TabsPage from "../pages/main/TabsPage.vue";

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
      },
      {
        path: "/favorites",
        name: "favorites",
        component: () => import("@/pages/main/FavoritesPage.vue"),
      },
      {
        path: "/addrecipe",
        name: "addrecipe",
        component: () => import("@/pages/main/AddRecipePage.vue"),
      },
      {
        path: "/search",
        name: "search",
        component: () => import("@/pages/main/SearchPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
