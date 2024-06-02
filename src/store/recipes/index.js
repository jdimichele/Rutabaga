import firebase from "firebase/app";
import "firebase/auth";
import { db } from "../../firebase.js";

export default {
  namespaced: true,
  state() {
    return {
      allRecipes: [],
      favorites: [],
      recipeID: null,
      userId: null,
      userCourses: [],
      userCategories: [],
      recipeName: null,
      recipePhoto: null,
      recipeTime: null,
      recipeServings: null,
      recipeCourses: [],
      recipeCategories: [],
      recipeIngredients: null,
      recipeInstructions: null,
    };
  },
  mutations: {
    addRecipeToAllRecipes(state, newRecipe) {
      state.allRecipes.push(newRecipe);
    },
    removeRecipe(state, recipeID) {
      state.allRecipes = state.allRecipes.filter(
        (recipe) => recipe.recipeID !== recipeID
      );
    },
    addUserCourse(state, course) {
      state.userCourses.push(course);
    },
    setUserCourses(state, courses) {
      state.userCourses = courses;
    },
    removeCourse(state, course) {
      const index = state.userCourses.indexOf(course);
      if (index !== -1) {
        state.userCourses.splice(index, 1);
      }
    },
    addUserCategory(state, category) {
      state.userCategories.push(category);
    },
    setUserCategories(state, categories) {
      state.userCategories = categories;
    },
    removeCategory(state, category) {
      const index = state.userCategories.indexOf(category);
      if (index !== -1) {
        state.userCategories.splice(index, 1);
      }
    },
    setCurrentRecipeState(state, payload) {
      state.recipeName = payload.recipeName;
      state.recipePhoto = payload.recipePhoto;
      state.recipeTime = payload.recipeTime;
      state.recipeServings = payload.recipeServings;
      state.recipeCourses = payload.recipeCourses;
      state.recipeCategories = payload.recipeCategories;
      state.recipeIngredients = payload.recipeIngredients;
      state.recipeInstructions = payload.recipeInstructions;
    },
    addToFavorites(state, recipe) {
      state.favorites.push(recipe);
    },
    removeFromFavorites(state, recipe) {
      const index = state.favorites.findIndex((r) => r.id === recipe.recipeID);
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
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();

      const recipeData = {
        recipeID: dataBase.id,
        userId: userId,
        date: timestamp,
        name: data.name,
        photo: data.photo,
        time: data.time,
        servings: data.servings,
        course: data.course,
        categories: data.categories,
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
        recipeCourses: recipeData.course,
        recipeCategories: recipeData.categories,
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
            recipeCourses: doc.data().course,
            recipeCategories: doc.data().categories,
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
        }
      } catch (error) {
        console.error("Failed to update recipes:", error);
      }
    },

    async deleteRecipe({ commit }, recipeID) {
      try {
        const userId = firebase.auth().currentUser.uid;
        const recipeRef = db
          .collection("users")
          .doc(userId)
          .collection("recipes")
          .doc(recipeID);

        await recipeRef.delete();
        commit("removeRecipe", recipeID);
      } catch (error) {
        console.error("Failed to delete recipe: ", error);
      }
    },

    async addToFavorites({ commit }, recipeID) {
      try {
        const userId = firebase.auth().currentUser.uid;
        const favoritesRef = db
          .collection("users")
          .doc(userId)
          .collection("favorites")
          .doc(recipeID);

        await favoritesRef.set({ recipeID });
        commit("addToFavorites", { recipeID });
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

        await favoritesRef.delete();
        commit("removeFromFavorites", { recipeID });
      } catch (error) {
        console.error(
          "Failed to remove recipe to favorites collection: ",
          error
        );
      }
    },

    async addCourse({ commit }, course) {
      try {
        const userId = firebase.auth().currentUser.uid;
        const coursesRef = db
          .collection("users")
          .doc(userId)
          .collection("courses");

        await coursesRef.add({
          name: course,
        });
        commit("addUserCourse", course);
      } catch (error) {
        console.error("Failed to add course:", error);
      }
    },

    async deleteCourse({ commit }, course) {
      try {
        const userId = firebase.auth().currentUser.uid;
        const coursesRef = db
          .collection("users")
          .doc(userId)
          .collection("courses");

        const querySnapshot = await coursesRef
          .where("name", "==", course)
          .get();
        if (!querySnapshot.empty) {
          const docId = querySnapshot.docs[0].id;
          await coursesRef.doc(docId).delete();
          commit("removeCourse", course);
        } else {
          console.warn("Course not found in Firebase.");
        }
      } catch (error) {
        console.error("Error deleting course from Firebase: ", error);
      }
    },

    async loadCourses({ commit }) {
      try {
        const userId = firebase.auth().currentUser.uid;
        const coursesRef = db
          .collection("users")
          .doc(userId)
          .collection("courses");

        const querySnapshot = await coursesRef.get();

        const courses = [];
        querySnapshot.forEach((doc) => {
          courses.push(doc.data().name);
        });
        commit("setUserCourses", courses);
      } catch (error) {
        console.error("Failed to load courses:", error);
      }
    },

    async addCategory({ commit }, category) {
      try {
        const userId = firebase.auth().currentUser.uid;
        const categoriesRef = db
          .collection("users")
          .doc(userId)
          .collection("categories");

        await categoriesRef.add({
          name: category,
        });
        commit("addUserCategory", category);
      } catch (error) {
        console.error("Failed to add category:", error);
      }
    },

    async deleteCategory({ commit }, category) {
      try {
        const userId = firebase.auth().currentUser.uid;
        const categoriesRef = db
          .collection("users")
          .doc(userId)
          .collection("categories");

        const querySnapshot = await categoriesRef
          .where("name", "==", category)
          .get();
        if (!querySnapshot.empty) {
          const docId = querySnapshot.docs[0].id;
          await categoriesRef.doc(docId).delete();
          commit("removeCategory", category);
        } else {
          console.warn("Category not found in Firebase.");
        }
      } catch (error) {
        console.error("Error deleting category from Firebase: ", error);
      }
    },

    async loadCategories({ commit }) {
      try {
        const userId = firebase.auth().currentUser.uid;
        const categoriesRef = db
          .collection("users")
          .doc(userId)
          .collection("categories");

        const querySnapshot = await categoriesRef.get();

        const categories = [];
        querySnapshot.forEach((doc) => {
          categories.push(doc.data().name);
        });
        commit("setUserCategories", categories);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    },

    async loadRecentlyViewed() {},
  },

  getters: {
    allRecipes(state) {
      return state.allRecipes;
    },
    allRecipesByCourse: (state) => (course) => {
      return state.allRecipes.filter(
        (recipe) => recipe.recipeCourses === course
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
    getCourses(state) {
      return state.userCourses;
    },
    getCategories(state) {
      return state.userCategories;
    },
  },
};
