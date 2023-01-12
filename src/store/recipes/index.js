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
    // addRecipe(state, payload) {
    //   state.recipes.push(payload);
    // },
    setRecipes(state, payload) {
      state.recipes = payload;
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
        .collection("recipes");
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
      // const uploadRecipe =
      await dataBase.add(recipeData);
      // context.commit("addRecipe", uploadRecipe);
    },

    async loadAllRecipes({ state }) {
      // if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      //   return;
      // }
      const userId = firebase.auth().currentUser.uid;
      await db
        .collection(`users/${userId}/recipes`)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (!state.recipes.some((recipe) => recipe.recipeId === doc.id)) {
              const data = {
                recipeID: doc.data().recipeId,
                recipeName: doc.data().name,
                recipePhoto: doc.data().photo,
                recipeServings: doc.data().servings,
                recipeCategory: doc.data().category,
                recipeIngredients: doc.data().ingredients,
                recipeInstructions: doc.data().instructions,
              };
              state.recipes.push(data);
            }
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      // const dataBase = await db
      //   .collection("users")
      //   .doc(userId)
      //   .collection("recipes");
      // const dbResults = await dataBase.get();
      // console.log(dbResults);
      // dbResults.forEach((doc) => {
      //   if (!state.recipes.some((recipe) => recipe.recipeId === doc.id)) {
      //     const data = {
      //       recipeID: doc.data().recipeId,
      //       recipeName: doc.data().name,
      //       recipePhoto: doc.data().photo,
      //       recipeServings: doc.data().servings,
      //       recipeCategory: doc.data().category,
      //       recipeIngredients: doc.data().ingredients,
      //       recipeInstructions: doc.data().instructions,
      //     };
      //     return state.recipes.push(data);
      //   }
      // });
      // const response = await fetch(
      //   `https://rutabaga-d932a-default-rtdb.firebaseio.com/rutabaga/${userId}/recipes.json?auth=` +
      //     token
      // );
      // const responseData = await response.json();
      // const recipes = [];
      // for (const key in responseData) {
      //   const recipe = {
      //     id: key,
      //     name: responseData[key].name,
      //     photo: responseData[key].photo,
      //     time: responseData[key].time,
      //     servings: responseData[key].servings,
      //     category: responseData[key].category,
      //     ingredients: responseData[key].ingredients,
      //     instructions: responseData[key].instructions,
      //   };
      //   recipes.push(recipe);
      // }
      // context.commit("setRecipes", recipes);

      // Possible security rule for Firestore: allow read, write: if request.auth != null && request.auth.uid == resource.data.author;
    },
  },
  getters: {
    recipes(state) {
      return state.recipes;
    },
    hasRecipes(state) {
      // will use this to check for recipes later.
      return state.recipes;
      //  && state.recipes.length > 0;
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
