import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { db } from "../../firebase.js";

export default {
  namespaced: true,
  state() {
    return {
      allRecipes: [],
      recipeID: null,
      userId: null,
      recipeName: null,
      recipePhoto: null,
      recipeTime: null,
      recipeServings: null,
      recipeCategory: null,
      recipeIngredients: null,
      recipeInstructions: null,
    };
  },
  mutations: {
    addRecipeToAllRecipes(state, newRecipe) {
      state.allRecipes.push(newRecipe);
    },
    setCurrentRecipeState(state, payload) {
      state.recipeName = payload.recipeName;
      state.recipePhoto = payload.recipePhoto;
      state.recipeTime = payload.recipeTime;
      state.recipeServings = payload.recipeServings;
      state.recipeCategory = payload.recipeCategory;
      state.recipeIngredients = payload.recipeIngredients;
      state.recipeInstructions = payload.recipeInstructions;
    },
    setRecipes(state, payload) {
      state.allRecipes = payload;
    },
    setRecentRecipe(state, payload) {
      state.lastRecipe = payload;
    },
  },
  actions: {
    async addRecipe(context, data) {
      const userId = firebase.auth().currentUser.uid;
      const dataBase = await db
        .collection("users")
        .doc(userId)
        .collection("recipes")
        .doc();
      const timestamp = await Date.now();

      const recipeData = {
        recipeID: dataBase.id,
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
      await dataBase.set(recipeData);

      const newRecipe = {
        recipeID: recipeData.recipeID,
        recipeName: recipeData.name,
        recipePhoto: recipeData.photo,
        recipeTime: recipeData.time,
        recipeServings: recipeData.servings,
        recipeCategory: recipeData.category,
        recipeIngredients: recipeData.ingredients,
        recipeInstructions: recipeData.instructions,
      };
      context.commit("addRecipeToAllRecipes", newRecipe);
    },

    async loadAllRecipes({ state }) {
      const userId = firebase.auth().currentUser.uid;
      const dataBase = await db
        .collection("users")
        .doc(userId)
        .collection("recipes");
      const dbResults = await dataBase.get();
      dbResults.forEach((doc) => {
        if (!state.allRecipes.some((recipe) => recipe.recipeID === doc.id)) {
          const data = {
            recipeID: doc.data().recipeID,
            recipeName: doc.data().name,
            recipePhoto: doc.data().photo,
            recipeTime: doc.data().time,
            recipeServings: doc.data().servings,
            recipeCategory: doc.data().category,
            recipeIngredients: doc.data().ingredients,
            recipeInstructions: doc.data().instructions,
          };
          state.allRecipes.push(data);
        }
      });
      // Possible security rule for Firestore: allow read, write: if request.auth != null && request.auth.uid == resource.data.author;
    },

    async loadRecentlyViewed() {},
  },
  getters: {
    allRecipes(state) {
      return state.allRecipes;
    },
    allRecipesByCategory: (state) => (category) => {
      return state.allRecipes.filter(
        (recipe) => recipe.recipeCategory === category
      );
    },
    recentlyAddedRecipes(state) {
      return state.allRecipes.slice(0, 3);
    },
    hasRecipes(state) {
      return state.allRecipes && state.allRecipes.length > 0;
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
