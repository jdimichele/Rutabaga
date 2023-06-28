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
              <div class="absolute top-2 right-3">
                <button class="">
                  <ion-icon
                    class="text-white mr-2 hover:text-yellow-500 text-2xl md:text-4xl"
                    :icon="sparklesOutline"
                  ></ion-icon>
                </button>
                <button @click="editRecipeDetails">
                  <ion-icon
                    class="text-white text-2xl md:text-4xl"
                    :icon="createOutline"
                  ></ion-icon>
                </button>
              </div>
              <div class="absolute bottom-2 left-4 pb-5">
                <h1 class="md:text-4xl text-2xl text-white">
                  {{ this.currentRecipe[0].recipeName }}
                </h1>
              </div>
              <div
                class="inline-flex absolute bottom-3 left-5 text-white text-sm"
              >
                {{ this.currentRecipe[0].recipeTime }} minutes
                {{ this.currentRecipe[0].recipeServings }} servings
              </div>
            </div>
          </ion-row>

          <ion-row class="flex justify-between m-2">
            <h6 class="underline font-bold text-md text-white">Ingredients:</h6>
            <ion-badge class="bg-rut-generic-mauve p-1">
              {{ this.currentRecipe[0].recipeCategory }}
            </ion-badge>
          </ion-row>

          <ion-row>
            <ion-col size-md="7" size-sm="5">
              <ion-list
                v-for="(item, index) in currentIngredients"
                :key="index"
              >
                <div class="break-words ml-2">
                  <p>
                    {{ this.currentRecipe[0].recipeIngredients[index].qty }}
                    {{ this.currentRecipe[0].recipeIngredients[index].unit }}
                    {{ this.currentRecipe[0].recipeIngredients[index].name }}
                  </p>
                </div>
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
                <div class="break-words ml-2">
                  <h5 class="pb-1 text-white">Step {{ index + 1 }}:</h5>
                  <p class="ml-1">
                    {{
                      this.currentRecipe[0].recipeInstructions[index]
                        .instruction
                    }}
                  </p>
                </div>
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
  IonList,
  IonBadge,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
} from "@ionic/vue";
import { createOutline, sparklesOutline } from "ionicons/icons";
import { mapGetters } from "vuex";

export default {
  name: "RecipeDetails",
  components: {
    IonPage,
    IonContent,
    IonList,
    IonBadge,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
  },
  data() {
    return {
      createOutline,
      sparklesOutline,
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
  methods: {
    editRecipeDetails() {
      this.$router.push({
        name: "EditRecipe",
        params: { id: this.$route.params.id },
      });
    },
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
