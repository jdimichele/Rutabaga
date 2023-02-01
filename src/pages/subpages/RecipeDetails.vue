<template>
  <ion-page>
    <base-header title="Recipe Details"></base-header>
    <ion-content>
      <base-card v-if="currentRecipe">
        <div class="recipeInfo">
          <ion-list>
            <ion-item lines="none">
              <!-- Will need to re-enable image interpolation later. -->
              <span>{{ this.currentRecipe[0].recipePhoto }}</span>
            </ion-item>
            <ion-item lines="none">
              <h1>{{ this.currentRecipe[0].recipeName }}</h1>
            </ion-item>
            <ion-item lines="none">
              {{ this.currentRecipe[0].recipeTime }}
            </ion-item>
            <ion-item lines="none">
              {{ this.currentRecipe[0].recipeServings }}
            </ion-item>
            <ion-item lines="none">
              {{ this.currentRecipe[0].recipeCategory }}
            </ion-item>
            <ion-item lines="none">
              {{ this.currentRecipe[0].recipeIngredients }}
            </ion-item>
            <ion-item lines="none">
              {{ this.currentRecipe[0].recipeInstructions }}
            </ion-item>
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

<style scoped>
/* .recipeInfo {
} */
.recipePhoto {
  width: 100%;
  border-radius: 0.5rem 0.5rem 0 0;
  max-height: fit-content;
}
</style>
