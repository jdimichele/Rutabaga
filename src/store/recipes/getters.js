export default {
  recipes(state) {
    return state.recipes;
  },
  hasRecipes(state) {
    // will use this to check for recipes later.
    return state.recipes && state.recipes.length > 0;
  },
};
