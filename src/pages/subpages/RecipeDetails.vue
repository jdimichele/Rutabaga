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
              <ion-badge class="recipeBadge">{{
                this.currentRecipe[0].recipeCategory
              }}</ion-badge>
            </ion-item>
            <ion-item lines="none">
              {{ this.currentRecipe[0].recipeTime }} minutes
            </ion-item>
            <ion-item lines="none">
              {{ this.currentRecipe[0].recipeServings }} servings
            </ion-item>
            Ingredients:
            <ion-list v-for="(item, index) in currentIngredients" :key="index">
              <ion-item lines="none">
                <li>
                  {{ this.currentRecipe[0].recipeIngredients[index].qty }}
                  {{ this.currentRecipe[0].recipeIngredients[index].unit }} of
                  {{ this.currentRecipe[0].recipeIngredients[index].name }}
                </li>
              </ion-item>
            </ion-list>
            <div>
              <h6>Step-By-Step:</h6>
              <ion-list
                v-for="(item, index) in currentInstructions"
                :key="index"
              >
                <ion-item lines="none">
                  <h6>Step {{ index + 1 }}:</h6>
                  <p>
                    {{
                      this.currentRecipe[0].recipeInstructions[index]
                        .instruction
                    }}
                  </p>
                </ion-item>
              </ion-list>
            </div>
          </ion-list>
        </div>
      </base-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonItem, IonList, IonBadge } from "@ionic/vue";
import { mapGetters } from "vuex";

export default {
  name: "RecipeDetails",
  components: { IonPage, IonContent, IonItem, IonList, IonBadge },
  data() {
    return {
      isLoading: false,
      currentRecipe: null,
      currentIngredients: null,
      currentStepCounter: null,
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
.recipeBadge {
  background-color: #7a3750;
}
.recipePhoto {
  width: 100%;
  border-radius: 0.5rem 0.5rem 0 0;
  max-height: fit-content;
}
</style>
