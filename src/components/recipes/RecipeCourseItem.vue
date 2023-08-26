<template>
  <ion-item slot="header" @click.prevent="getRecipesByCourse(courseName)">
    <ion-label>{{ courseName }}</ion-label>
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
  props: ["courseName"],
  data() {
    return {
      course: null,
    };
  },

  methods: {
    getRecipesByCourse(courseName) {
      this.course = courseName;
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
      return this.$store.getters["recipes/allRecipesByCourse"](this.course);
    },
  },
};
</script>
