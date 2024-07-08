<template>
  <ion-searchbar
    class="py-10"
    mode="ios"
    v-model="search"
    placeholder="Time to find that perfect recipe..."
  ></ion-searchbar>
  <div>
    <ul>
      <li v-if="searchRecipes.length === 1">
        {{ searchRecipes[0].recipeName }}
      </li>
      <li
        v-else
        v-for="recipe in searchRecipes"
        :key="recipe.recipeID"
        @click="openRecipeDetails(recipe.recipeID)"
      >
        {{ recipe.recipeName }}
      </li>
    </ul>
  </div>
</template>

<script>
import { IonSearchbar } from "@ionic/vue";

export default {
  components: {
    IonSearchbar,
  },
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
    searchRecipes() {
      return this.$store.getters["recipes/getRecipeByName"](this.search);
    },
  },
};
</script>
