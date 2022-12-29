export default {
  async addRecipe(context, data) {
    const userId = context.rootGetters.userId;
    const recipeData = {
      name: data.name,
      photo: data.photo,
      time: data.time,
      servings: data.servings,
      category: data.category,
      ingredients: data.ingredients,
      instructions: data.instructions,
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://rutabaga-d932a-default-rtdb.firebaseio.com/rutabaga/${userId}/recipes.json?auth=` +
        token,
      {
        method: "POST",
        body: JSON.stringify(recipeData),
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch.");
      throw error;
    }
    context.commit("addRecipe", {
      ...recipeData,
      id: userId,
    });
  },

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

  async loadLastRecipe(context, data) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;

    const recipeData = {
      name: data.name,
      photo: data.photo,
      time: data.time,
      servings: data.servings,
      category: data.category,
      ingredients: data.ingredients,
      instructions: data.instructions,
    };

    const response = await fetch(
      `https://rutabaga-d932a-default-rtdb.firebaseio.com/rutabaga/${userId}/recipes.json?auth=` +
        token,
      {
        method: "GET",
        body: JSON.stringify(recipeData),
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch.");
      throw error;
    }
  },
};
