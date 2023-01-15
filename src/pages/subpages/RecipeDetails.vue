<template>
  <ion-card>
    <div v-if="isLoading">
      <ion-loading></ion-loading>
    </div>

    <div>
      <h2>{{ this.currentRecipe.recipeName }}</h2>
      <h2>{{}}</h2>
    </div>
  </ion-card>
</template>

<script>
import { IonCard, IonLoading } from "@ionic/vue";
import { mapState } from "vuex";
import firebase from "firebase/compat/app";
import { db } from "../../firebase.js";

export default {
  name: "RecipeDetails",
  components: { IonCard, IonLoading },
  data() {
    return {
      isLoading: false,
      currentRecipe: null,
      currentRecipeID: null,
    };
  },
  computed: {
    ...mapState({ stateRecipes: "allRecipes" }),
  },
  async mounted() {
    this.currentRecipeID = this.$route.params.id;
    this.currentRecipe = await this.$store.stateRecipes.filter((recipe) => {
      return recipe.recipeID === this.routeID;
    });



    this.isLoading = true;
    const userId = firebase().auth().currentUser.uid;
    console.log(userId);
    const recipeRef = db.collection("users").doc(userId).collection("recipes");
    recipeRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.currentRecipe = doc.data();
        } else {
          console.log("Something big lame.");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    this.isLoading = false;
  },
};
</script>
