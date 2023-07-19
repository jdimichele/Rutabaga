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
    favoriteRecipes() {
      console.log(this.favoriteRecipes);
      return this.$store.getters["recipes/getFavorites"];
    },
  },
};
</script>
