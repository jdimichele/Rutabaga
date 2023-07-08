import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { db } from "../../firebase.js";

export default {
  namespaced: true,
  state() {
    return {
      allRecipes: [],
      favorites: [],
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
    addToFavorites(state, recipe) {
      state.favorites.push(recipe);
    },
    removeFromFavorites(state, recipe) {
      const index = state.favorites.findIndex((r) => r.id === recipe.id);
      if (index !== -1) {
        state.favorites.splice(index, 1);
      }
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

    async updateRecipe({ commit, dispatch }, updatedRecipe) {
      try {
        const userId = firebase.auth().currentUser.uid;
        const recipeRef = db
          .collection("users")
          .doc(userId)
          .collection("recipes")
          .doc(updatedRecipe.recipeID);

        const originalRecipeSnapshot = await recipeRef.get();

        if (originalRecipeSnapshot.exists) {
          const originalRecipe = originalRecipeSnapshot.data();

          const updateFields = {};
          for (const key in updatedRecipe) {
            if (
              Object.prototype.hasOwnProperty.call(updatedRecipe, key) &&
              updatedRecipe[key] !== originalRecipe[key]
            ) {
              updateFields[key] = updatedRecipe[key];
            }
          }

          await recipeRef.update(updateFields);

          commit("setCurrentRecipeState", updatedRecipe);
          dispatch("loadAllRecipes");
          console.log("Recipe updated successfully!");
        }
      } catch (error) {
        console.error("Failed to update recipes:", error);
      }
    },

    async addToFavorites({ commit }, recipeID) {
      try {
        const userId = firebase.auth().currentUser.uid;
        const recipeRef = db
          .collection("users")
          .doc(userId)
          .collection("recipes")
          .doc(recipeID);
        const favoritesRef = db
          .collection("users")
          .doc(userId)
          .collection("favorites")
          .doc(recipeID);

        const recipeDoc = await recipeRef.get();
        if (recipeDoc.exists) {
          const recipeData = recipeDoc.data();
          if (recipeData) {
            await favoritesRef.set({ ...recipeData });
            commit("addToFavorites", { ...recipeData });
          }
        }
      } catch (error) {
        console.error("Failed to add recipe to favorites collection: ", error);
      }
    },

    async removeFromFavorites({ commit }, recipeID) {
      try {
        const userId = firebase.auth().currentUser.uid;
        const favoritesRef = db
          .collection("users")
          .doc(userId)
          .collection("favorites")
          .doc(recipeID);

        const favoritesDoc = await favoritesRef.get();
        if (favoritesDoc.exists) {
          const favoritesData = favoritesDoc.data();
          if (favoritesData) {
            await favoritesRef.delete({ ...favoritesData });
            commit("removeFromFavorites", { ...favoritesData });
          }
        }
      } catch (error) {
        console.error(
          "Failed to remove recipe to favorites collection: ",
          error
        );
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
      return state.allRecipes.find((recipe) => recipe.recipeID === id);
    },
    recentlyAddedRecipes(state) {
      return state.allRecipes.slice(0, 3);
    },
    hasRecipes(state) {
      return state.allRecipes && state.allRecipes.length > 0;
    },
    getFavorites: (state) => {
      return state.favorites;
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
