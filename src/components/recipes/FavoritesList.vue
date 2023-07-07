<template>
  <div>
    <ul>
      <li v-if="favoriteRecipes.length === 1">
        {{ favoriteRecipes.recipeName }}
      </li>
      <li
        v-else
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
export default {
  data() {
    return {
      search: "",
    };
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
    favoriteRecipes() {
      console.log(this.favoriteRecipes);
      return this.$store.getters["recipes/getFavorites"];
    },
  },
};
</script>
