import { createStore } from "vuex";

import authModule from "./auth/index.js";
import recipesModule from "./recipes/index.js";

const store = createStore({
  modules: {
    auth: authModule,
    recipes: recipesModule,
  },
});

export default store;