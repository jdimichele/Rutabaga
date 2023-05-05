<template>
  <ion-item slot="header" @click.prevent="getRecipesByCategory(categoryName)">
    <ion-label>{{ categoryName }}</ion-label>
  </ion-item>
  <div class="ion-padding" slot="content">
    <ul>
      <li
        v-for="recipe in recipes"
        :key="recipe.recipeID"
        @click="openRecipeDetails(recipe.recipeID)"
      >
        {{ recipe.recipeName }}
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
