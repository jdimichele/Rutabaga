<template>
  <ion-page>
    <base-header title="Recipe Details"></base-header>
    <ion-content>
      <base-card v-if="currentRecipe">
        <ion-grid>
          <ion-row>
            <div class="relative">
              <img
                class="max-w-full rounded-t-lg"
                :src="this.currentRecipe[0].recipePhoto"
              />
              <div class="absolute bottom-2 left-4 pb-5">
                <h1 class="text-4xl text-white">
                  {{ this.currentRecipe[0].recipeName }}
                </h1>
              </div>
              <div class="inline-flex absolute bottom-3 left-5 text-white text-sm">
                {{ this.currentRecipe[0].recipeTime }} minutes
                {{ this.currentRecipe[0].recipeServings }} servings
              </div>
            </div>
          </ion-row>
          <ion-row class="ion-justify-content-start">
            <ion-badge class="bg-rut-generic-mauve absolute right-0 p-1 m-4">
              {{ this.currentRecipe[0].recipeCategory }}
            </ion-badge>
          </ion-row>
          <!-- <ion-row class="inline-flex">
            <ion-item lines="none">
              {{ this.currentRecipe[0].recipeTime }} minutes
            </ion-item>
            <ion-item lines="none">
              {{ this.currentRecipe[0].recipeServings }} servings
            </ion-item>
          </ion-row> -->
          <ion-row>
            <ion-col size-md="7" size-sm="5">
              <h6 class="underline font-bold text-md text-white">
                Ingredients:
              </h6>
              <ion-list
                v-for="(item, index) in currentIngredients"
                :key="index"
              >
                <ion-item lines="none">
                  <ion-label class="ion-text-wrap">
                    <p>
                      {{ this.currentRecipe[0].recipeIngredients[index].qty }}
                      {{ this.currentRecipe[0].recipeIngredients[index].unit }}
                      {{ this.currentRecipe[0].recipeIngredients[index].name }}
                    </p>
                  </ion-label>
                </ion-item>
              </ion-list>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size-md="7" size-sm="5">
              <h5 class="underline font-bold text-md text-white">
                Step-By-Step:
              </h5>
              <ion-list
                v-for="(item, index) in currentInstructions"
                :key="index"
              >
                <ion-item lines="none">
                  <ion-label class="ion-text-wrap">
                    <h5>Step {{ index + 1 }}:</h5>
                    <p>
                      {{
                        this.currentRecipe[0].recipeInstructions[index]
                          .instruction
                      }}
                    </p>
                  </ion-label>
                </ion-item>
              </ion-list>
            </ion-col>
          </ion-row>
        </ion-grid>
      </base-card>
      <div v-else>
        <p>Hm... Something went wrong...</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonContent,
  IonItem,
  IonList,
  IonBadge,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
} from "@ionic/vue";
import { mapGetters } from "vuex";

export default {
  name: "RecipeDetails",
  components: {
    IonPage,
    IonContent,
    IonItem,
    IonList,
    IonBadge,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
  },
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
