export default {
  addRecipe(state, payload) {
    state.recipes.push(payload);
  },
  setRecipes(state, payload) {
    state.recipes = payload;
  },
};
