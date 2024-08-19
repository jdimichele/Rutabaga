<template>
  <div>
    <ul>
      <li
        v-for="favorite in favoriteRecipes"
        :key="favorite.recipeID"
        @click="openRecipeDetails(favorite.recipeID)"
      >
        {{ favorite.recipeName }}
      </li>
    </ul>
    <div v-show="!favoriteRecipes">
      <h3>No favorited recipes... Yet!</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  methods: {
    openRecipeDetails(targetID) {
      this.$router.push({
        name: "RecipeDetails",
        params: { id: targetID },
      });
    },
  },
  computed: {
    ...mapGetters("recipes", ["getRecipeByID", "getFavoriteRecipes"]),
    favoriteRecipes() {
      return this.getFavoriteRecipes;
    },
  },
  mounted() {
    this.$store.dispatch("recipes/loadFavorites");
  },
};
</script>
