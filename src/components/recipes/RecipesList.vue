<template>
  <base-card class="sm:mx-20">
    <ion-title class="title">Recently Added Recipes:</ion-title>
    <div v-if="hasRecipes">
      <recipe-list-item
        v-for="(recipe, index) in allRecipes"
        :key="index"
        :id="recipe.recipeID"
        :name="recipe.recipeName"
        :photo="recipe.recipePhoto"
        :course="recipe.recipeCourses"
        :servings="recipe.recipeServings"
      ></recipe-list-item>
    </div>
    <div v-else="!hasRecipes">
      <h3>No recent recipes added, yet!</h3>
    </div>
  </base-card>
</template>

<script>
import { IonLoading, IonTitle } from "@ionic/vue";
import RecipeListItem from "./RecipeListItem.vue";

export default {
  components: {
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
      return this.$store.getters["recipes/allRecipes"].slice(0, 3);
    },
    hasRecipes() {
      return !this.isLoading && this.$store.getters["recipes/hasRecipes"];
    },
  },

  mounted() {
    this.loadRecipes();
  },
};

// setup() {
//   const doRefresh = (event) => {
//     this.loadRecipes();
//     setTimeout(() => {
//       console.log("Async operation has ended.");
//       event.target.complete();
//     }, 2000);
//   };
//   return { doRefresh };
// },
</script>

<style scoped>
.title {
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
}
</style>
