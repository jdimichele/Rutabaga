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
    setCurrentRecipeState(state, recipeData) {
      state.recipeName = recipeData.recipeName;
      state.recipePhoto = recipeData.recipePhoto;
      state.recipeTime = recipeData.recipeTime;
      state.recipeServings = recipeData.recipeServings;
      state.recipeCategory = recipeData.recipeCategory;
      state.recipeIngredients = recipeData.recipeIngredients;
      state.recipeInstructions = recipeData.recipeInstructions;
    },
    // setCurrentRecipe(state, recipeData) {
    //   state.currentRecipe = recipeData;
    // },
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
    async fetchRecipe({ commit }, recipeID) {
      try {
        const userId = firebase.auth().currentUser.uid;
        const recipeRef = db
          .collection("users")
          .doc(userId)
          .collection("recipes")
          .doc(recipeID);
        const recipeDoc = await recipeRef.get();

        if (recipeDoc.exists) {
          const recipeData = recipeDoc.data();
          commit("setCurrentRecipeState", recipeData);
        } else {
          console.log("Recipe not found.");
        }
      } catch (error) {
        console.error("Failed to fetch recipe data: ", error);
      }
    },

    async updateRecipe({ commit }, updatedRecipe) {
      try {
        const userId = firebase.auth().currentUser.uid;
        const recipeRef = db
          .collection("users")
          .doc(userId)
          .collection("recipes")
          .doc(updatedRecipe.recipeID);

        await recipeRef.update({
          name: updatedRecipe.name,
          photo: updatedRecipe.photo,
          time: updatedRecipe.time,
          servings: updatedRecipe.servings,
          category: updatedRecipe.category,
          ingredients: updatedRecipe.ingredients,
          instructions: updatedRecipe.instructions,
        });
        commit("setCurrentRecipeState", updatedRecipe);
        this.loadAllRecipes();
      } catch (error) {
        console.error("Failed to update recipes:", error);
      }
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
    getRecipeByName: (state) => (name) => {
      return state.allRecipes.filter((recipe) =>
        recipe.recipeName.toLowerCase().includes(name.toLowerCase())
      );
    },
    getRecipeByID: (state) => (id) => {
      return state.allRecipes.filter((recipe) => recipe.recipeId === id);
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
