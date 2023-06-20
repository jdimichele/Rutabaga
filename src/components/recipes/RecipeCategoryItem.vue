<template>
  <ion-item slot="header" @click.prevent="getRecipesByCategory(categoryName)">
    <ion-label>{{ categoryName }}</ion-label>
  </ion-item>
  <div class="" slot="content">
    <ul>
      <li
        class="py-1"
        v-for="recipe in recipes"
        :key="recipe.recipeID"
        @click="openRecipeDetails(recipe.recipeID)"
      >
        <p class="text-center">
          <span class="ml-1 float-left">{{ recipe.recipeName }}</span>
          <span class="inline-block">{{ recipe.recipeServings }} servings</span>
          <span class="mr-1 float-right">{{ recipe.recipeTime }} minutes</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { IonItem, IonLabel } from "@ionic/vue";

export default {
  components: {
    IonItem,
    IonLabel,
  },
  props: ["categoryName"],
  data() {
    return {
      category: null,
    };
  },

  methods: {
    getRecipesByCategory(categoryName) {
      this.category = categoryName;
    },
    openRecipeDetails(targetID) {
      this.$router.push({
        name: "RecipeDetails",
        params: { id: targetID },
      });
    },
  },

  computed: {
    recipes() {
      return this.$store.getters["recipes/allRecipesByCategory"](this.category);
    },
  },
};
</script>
