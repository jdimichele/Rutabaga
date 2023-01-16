<template>
  <ion-card>
    <!-- <div v-if="isLoading">
      <ion-loading></ion-loading>
    </div> -->

    <div>
      <h2>{{ this.currentRecipe.recipeName }}</h2>
      <h2>{{}}</h2>
    </div>
  </ion-card>
</template>

<script>
import { IonCard } from "@ionic/vue";

export default {
  name: "RecipeDetails",
  components: { IonCard },
  data() {
    return {
      isLoading: false,
      currentRecipe: null,
    };
  },
  methods: {},
  computed: {},
  async mounted() {
    this.currentRecipe = await this.$store.getters["recipes/allRecipes"].filter((recipe) => {
      return recipe.recipeID === this.$route.params.id;
    });
    console.log(this.currentRecipe);
  },
};
</script>
