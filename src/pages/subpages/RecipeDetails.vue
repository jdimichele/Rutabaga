<template>
  <ion-page>
    <base-header title="Recipe Details"></base-header>
    <ion-content>
      <base-card v-if="currentRecipe">
        <div class="recipeInfo">
          <ion-list>
            <ion-item lines="none">
              <!-- Will need to re-enable image interpolation later. -->
              <img :src="this.currentRecipe[0].recipePhoto" />
            </ion-item>
            <ion-item lines="none">
              <h1>{{ this.currentRecipe[0].recipeName }}</h1>
            </ion-item>
            <ion-item lines="none">
              {{ this.currentRecipe[0].recipeTime }} minutes
            </ion-item>
            <ion-item lines="none">
              {{ this.currentRecipe[0].recipeServings }} servings
            </ion-item>
            <ion-item lines="none">
              {{ this.currentRecipe[0].recipeCategory }}
            </ion-item>
            <ion-list v-for="(item, index) in currentIngredients" :key="index">
              <ion-item lines="none">
                quantity:
                {{ this.currentRecipe[0].recipeIngredients[index].qty }}
                unit:
                {{ this.currentRecipe[0].recipeIngredients[index].unit }}
                name:
                {{ this.currentRecipe[0].recipeIngredients[index].name }}
              </ion-item>
            </ion-list>
            <ion-list v-for="(item, index) in currentInstructions" :key="index">
              <ion-item lines="none">
                Steps:
                {{ this.currentRecipe[0].recipeInstructions[index] }}
              </ion-item>
            </ion-list>
          </ion-list>
        </div>
      </base-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonItem, IonList } from "@ionic/vue";
import { mapGetters } from "vuex";

export default {
  name: "RecipeDetails",
  components: { IonPage, IonContent, IonItem, IonList },
  data() {
    return {
      isLoading: false,
      currentRecipe: null,
      currentIngredients: null,
      currentInstructions: null,
    };
  },
  computed: {
    ...mapGetters("recipes", ["allRecipes"]),
  },
  async mounted() {
    this.currentRecipe = await this.allRecipes.filter((recipe) => {
      return recipe.recipeID === this.$route.params.id;
    });
    this.currentIngredients = this.currentRecipe[0].recipeIngredients.length;
    this.currentInstructions = this.currentRecipe[0].recipeInstructions.length;
  },
};
</script>

<style scoped>
/* .recipeInfo {
} */
.recipePhoto {
  width: 100%;
  border-radius: 0.5rem 0.5rem 0 0;
  max-height: fit-content;
}
</style>
