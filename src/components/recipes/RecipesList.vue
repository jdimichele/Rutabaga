<template>
  <!-- TODO: Recently Added Page, Recently Viewed Page, ???-->
  <ion-card>
    <ion-title class="title">Recently Added Recipes:</ion-title>
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
      errorMessage: "",
    };
  },
  methods: {
    async loadRecipes() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("recipes/loadAllRecipes");
      } catch (error) {
        this.error = true;
        this.errorMessage =
          error.message || "Something exploded and that's on me. :(";
      }
      this.isLoading = false;
    },
    errorToast() {},
  },
  computed: {
    allRecipes() {
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

<style scoped>
.title {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
