export default {
  async loadRecipes(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://rutabaga-d932a-default-rtdb.firebaseio.com/rutabaga/${userId}/recipes.json?auth=` +
        token
    );

    const responseData = await response.json();
    const recipes = [];

    for (const key in responseData) {
      const recipe = {
        id: key,
        name: responseData[key].name,
        photo: responseData[key].photo,
        time: responseData[key].time,
        servings: responseData[key].servings,
        category: responseData[key].category,
        ingredients: responseData[key].ingredients,
        instructions: responseData[key].instructions,
      };
      recipes.push(recipe);
    }
    context.commit("setRecipes", recipes);
  },
};
