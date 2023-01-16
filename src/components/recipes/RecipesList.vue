<template>
  <!-- TODO: Recently Added Page, Recently Viewed Page, ???-->
  <ion-card>
    <ion-title>Recently Added Recipes:</ion-title>
    <div v-if="isLoading">
      <ion-loading></ion-loading>
    </div>
    <div v-else-if="hasRecipes">
      <recipe-list-item
        v-for="(recipe, index) in allRecipes"
        :key="index"
        :id="recipe.recipeID"
        :name="recipe.recipeName"
        :photo="recipe.recipePhoto"
        :time="recipe.recipeTime"
        :category="recipe.recipeCategory"
        :servings="recipe.recipeServings"
        :ingredients="recipe.recipeIngredients"
        :instructions="recipe.recipeInstructions"
      ></recipe-list-item>
    </div>
    
  </ion-card>
</template>

<script>
import { IonCard, IonLoading, IonTitle } from "@ionic/vue";
import RecipeListItem from "./RecipeListItem.vue";

export default {
  components: {
    IonCard,
    IonLoading,
    IonTitle,
    RecipeListItem,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async loadRecipes() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("recipes/loadAllRecipes");
      } catch (error) {
        this.error = error.message || "Something exploded. :(";
      }
      this.isLoading = false;
    },
    errorToast() {},
  },
  computed: {
    allRecipes() {
      console.log(this.$store.getters["recipes/allRecipes"]);
      return this.$store.getters["recipes/allRecipes"];
    },
    hasRecipes() {
      return !this.isLoading && this.$store.getters["recipes/hasRecipes"];
    },
  },

  mounted() {
    this.loadRecipes();
  },
};
</script>
