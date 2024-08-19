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
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
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
};
</script>
