<template>
  <!-- TODO: Recently Added Page, Recently Viewed Page, ???-->
  <ion-card>
    <div v-if="isLoading">
      <ion-loading></ion-loading>
    </div>
    <div v-else-if="hasRecipes">
      <recent-recipe></recent-recipe>
      <recipe-item
        v-for="recipe in recipes"
        :key="recipe.id"
        :id="recipe.id"
        :name="recipe.name"
        :photo="recipe.photo"
        :time="recipe.time"
        :category="recipe.category"
        :servings="recipe.servings"
        :ingredients="recipe.ingredients"
        :instructions="recipe.instructions"
      ></recipe-item>
    </div>
  </ion-card>
</template>

<script>
import { IonCard, IonLoading } from "@ionic/vue";
import RecipeItem from "../recipes/RecipeItem.vue";
import RecentRecipe from "./RecentRecipe.vue";

export default {
  components: {
    IonCard,
    IonLoading,
    RecipeItem,
    RecentRecipe,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async loadRecipes(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("recipes/loadRecipes", {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || "Something exploded. :(";
      }
      this.isLoading = false;
    },
  },
  computed: {
    recipes() {
      const recipes = this.$store.getters["recipes/recipes"];
      return recipes;
    },
    hasRecipes() {
      return !this.isLoading && this.$store.getters["recipes/hasRecipes"];
    },
  },

  created() {
    this.loadRecipes();
  },
};
</script>
