<template>
  <!-- TODO: Recently Added Page, Recently Viewed Page, ???-->
  <ion-card>
    <div v-if="isLoading">
      <ion-loading></ion-loading>
    </div>
    <div v-else-if="hasRecipes">
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

export default {
  components: {
    IonCard,
    IonLoading,
    RecipeItem,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  methods: {
    // async loadRecipes() {
    //   this.isLoading = true;
    //   try {
    //     await this.$store.dispatch(
    //       "recipes/loadAllRecipes"
    //       // {forceRefresh: refresh,}
    //     );
    //   } catch (error) {
    //     this.error = error.message || "Something exploded. :(";
    //   }
    //   this.isLoading = false;
    // },
  },
  computed: {
    recipes() {
      return this.$store.state.recipes;
    },
    hasRecipes() {
      // !this.isLoading &&
      return this.$store.getters["recipes/hasRecipes"];
    },
  },

  created() {
    this.$store.dispatch("recipes/loadAllRecipes");
  },
};
</script>
