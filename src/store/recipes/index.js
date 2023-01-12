import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { db } from "../../firebase.js";

export default {
  namespaced: true,
  state() {
    return {
      recipes: [],
    };
  },
  mutations: {
    addRecipe(state, payload) {
      state.recipes.push(payload);
    },
    setRecipes(state, payload) {
      state.recipes = payload;
    },
    setRecentRecipe(state, payload) {
      state.lastRecipe = payload;
    },
  },
  actions: {
    async addRecipe(context, data) {
      const dataBase = await db.collection("recipes").doc();
      const userId = firebase.auth().currentUser.uid;
      const timestamp = await Date.now();

      const recipeData = {
        recipeId: dataBase.id,
        userId: userId,
        date: timestamp,
        name: data.name,
        photo: data.photo,
        time: data.time,
        servings: data.servings,
        category: data.category,
        ingredients: data.ingredients,
        instructions: data.instructions,
      };
      const uploadRecipe = await dataBase.set(recipeData);
      context.commit("addRecipe", uploadRecipe);
    },
  },
  getters: {
    recipes(state) {
      return state.recipes;
    },
    hasRecipes(state) {
      // will use this to check for recipes later.
      return state.recipes && state.recipes.length > 0;
    },
    shouldUpdate(state) {
      const lastFetch = state.lastFetch;
      if (!lastFetch) {
        // IF there is no timestamp, we should update.
        return true;
      }
      const currentTimestamp = new Date().getTime();
      return (currentTimestamp - lastFetch) / 1000 > 60; // We subtract the current time from the lastFetch time, divide it by 1000 for milliseconds and see if it's been longer than 60 seconds.
    },
  },
};
