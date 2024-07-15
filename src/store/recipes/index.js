import { db, auth } from "../../firebase.js";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

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
    setAllRecipes(state, recipes) {
      state.allRecipes = recipes;
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
      const userId = auth.currentUser.uid;
      const recipeRef = doc(collection(db, "users", userId, "recipes"));
      const timestamp = serverTimestamp();

      const recipeData = {
        recipeID: recipeRef.id,
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
      await setDoc(recipeRef, recipeData);

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

    async loadAllRecipes({ commit }) {
      try {
        const userId = auth.currentUser.uid;
        const recipesRef = collection(db, "users", userId, "recipes");
        const recipesQuery = await getDocs(recipesRef);

        const recipes = [];
        recipesQuery.forEach((doc) => {
          const data = doc.data();
          const recipe = {
            recipeID: doc.id,
            recipeName: data.name,
            recipePhoto: data.photo,
            recipeTime: data.time,
            recipeServings: data.servings,
            recipeCourses: data.course,
            recipeCategories: data.categories,
            recipeIngredients: data.ingredients,
            recipeInstructions: data.instructions,
          };
          recipes.push(recipe);
        });

        commit("setAllRecipes", recipes);
      } catch (error) {
        console.error("Error loading recipes:", error);
      }
    },

    async fetchRecipe({ commit }, recipeID) {
      try {
        const userId = auth.currentUser.uid;
        const recipeRef = doc(db, "users", userId, "recipes", recipeID);
        const recipeDoc = await getDoc(recipeRef);

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
        const userId = auth.currentUser.uid;
        const recipeRef = doc(
          db,
          "users",
          userId,
          "recipes",
          updatedRecipe.recipeID
        );

        const originalRecipeSnapshot = await getDoc(recipeRef);

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

          await updateDoc(recipeRef, updateFields);

          commit("setCurrentRecipeState", updatedRecipe);
          dispatch("loadAllRecipes");
        }
      } catch (error) {
        console.error("Failed to update recipes:", error);
      }
    },

    async deleteRecipe({ commit }, recipeID) {
      try {
        const userId = auth.currentUser.uid;
        const recipeRef = doc(db, "users", userId, "recipes", recipeID);

        await deleteDoc(recipeRef);
        commit("removeRecipe", recipeID);
      } catch (error) {
        console.error("Failed to delete recipe: ", error);
      }
    },

    async addToFavorites({ commit }, recipeID) {
      try {
        const userId = auth.currentUser.uid;
        const favoritesRef = doc(db, "users", userId, "favorites", recipeID);

        await setDoc(favoritesRef, { recipeID });
        commit("addToFavorites", { recipeID });
      } catch (error) {
        console.error("Failed to add recipe to favorites collection: ", error);
      }
    },

    async removeFromFavorites({ commit }, recipeID) {
      try {
        const userId = auth.currentUser.uid;
        const favoritesRef = doc(db, "users", userId, "favorites", recipeID);

        await deleteDoc(favoritesRef);
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
        const userId = auth.currentUser.uid;
        const coursesRef = collection(db, "users", userId, "courses");

        await addDoc(coursesRef, { name: course });
        commit("addUserCourse", course);
      } catch (error) {
        console.error("Failed to add course:", error);
      }
    },

    async deleteCourse({ commit }, course) {
      try {
        const userId = auth.currentUser.uid;
        const coursesRef = collection(db, "users", userId, "courses");

        const querySnapshot = await getDocs(
          query(coursesRef, where("name", "==", course))
        );
        if (!querySnapshot.empty) {
          const docId = querySnapshot.docs[0].id;
          await deleteDoc(doc(coursesRef, docId));
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
        const userId = auth.currentUser.uid;
        const coursesRef = collection(db, "users", userId, "courses");
        const querySnapshot = await getDocs(coursesRef);

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
        const userId = auth.currentUser.uid;
        const categoriesRef = collection(db, "users", userId, "categories");

        await addDoc(categoriesRef, { name: category });
        commit("addUserCategory", category);
      } catch (error) {
        console.error("Failed to add category:", error);
      }
    },

    async deleteCategory({ commit }, category) {
      try {
        const userId = auth.currentUser.uid;
        const categoriesRef = collection(db, "users", userId, "categories");
        const querySnapshot = await getDocs(categoriesRef);

        const categoryDoc = querySnapshot.docs.find(
          (doc) => doc.data().name === category
        );
        if (categoryDoc) {
          await deleteDoc(categoryDoc.ref);
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
        const userId = auth.currentUser.uid;
        const categoriesRef = collection(db, "users", userId, "categories");
        const querySnapshot = await getDocs(categoriesRef);

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
        return true;
      }
      const currentTimestamp = new Date().getTime();
      return (currentTimestamp - lastFetch) / 1000 > 60;
    },
    getCourses(state) {
      return state.userCourses;
    },
    getCategories(state) {
      return state.userCategories;
    },
  },
};
