export default {
  async addRecipe(context, data) {
    const recipeId = context.rootGetters.recipeId;
    const recipeData = {
      title: data.title,
      photo: data.photo,
      time: data.time,
      servings: data.servings,
      ingredients: data.ingredients,
      instructions: data.instructions,
    };

    const response = await fetch(
      `https://rutabaga-d932a-default-rtdb.firebaseio.com/recipes/${recipeId}.json`,
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
      id: recipeId,
    });
  },
  async loadRecipes(context, payload) {
    const response = await fetch(
      "https://rutabaga-d932a-default-rtdb.firebaseio.com/recipes.json"
    );

    const responseData = await response.json();
    const recipes = [];

    for (const key in responseData) {
      const recipe = {
        id: key,
        title: responseData[key].title,
        photo: responseData[key].photo,
        time: responseData[key].time,
        servings: responseData[key].servings,
        ingredients: responseData[key].ingredients,
        instructions: responseData[key].instructions,
      };
      recipes.push(recipe);
    }
    context.commit('setRecipes', recipes);
  },
};
