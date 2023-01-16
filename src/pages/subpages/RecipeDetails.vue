<template>
  <ion-page>
    <base-header title="Recipe Details"></base-header>
    <ion-content v-if="currentRecipe">
      <div>
        <h2>{{ this.currentRecipe[0].recipeName }}</h2>
        <h2>{{ this.currentRecipe[0].recipePhoto }}</h2>
        <h2>{{ this.currentRecipe[0].recipeTime }}</h2>
        <h2>{{ this.currentRecipe[0].recipeServings }}</h2>
        <h2>{{ this.currentRecipe[0].recipeCategory }}</h2>
        <h2>{{ this.currentRecipe[0].recipeIngredients }}</h2>
        <h2>{{ this.currentRecipe[0].recipeInstructions }}</h2>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent } from "@ionic/vue";
import { mapGetters } from "vuex";

export default {
  name: "RecipeDetails",
  components: { IonPage, IonContent },
  data() {
    return {
      isLoading: false,
      currentRecipe: null,
    };
  },
  methods: {},
  computed: {
    ...mapGetters("recipes", ["allRecipes"]),
  },
  async mounted() {
    this.currentRecipe = await this.allRecipes.filter((recipe) => {
      return recipe.recipeID === this.$route.params.id;
    });
  },
};
</script>
