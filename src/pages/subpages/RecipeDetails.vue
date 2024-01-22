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
                :src="currentRecipe.recipePhoto"
              />
              <div class="absolute top-2 right-3">
                <button @click="toggleFavorite">
                  <ion-icon
                    class="text-white mr-2 hover:text-yellow-500 text-2xl md:text-4xl"
                    :class="{ 'text-yellow-500': isRecipeFavorite }"
                    :icon="isRecipeFavorite ? sparkles : sparklesOutline"
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
                  {{ currentRecipe.recipeName }}
                </h1>
              </div>
              <div
                class="inline-flex absolute bottom-3 left-5 text-white text-sm"
              >
                {{ currentRecipe.recipeTime }} minutes
                {{ currentRecipe.recipeServings }} servings
              </div>
            </div>
          </ion-row>

          <ion-row class="flex justify-between m-2">
            <h6 class="underline font-bold text-md text-white">Ingredients:</h6>
            <ion-badge class="bg-rut-generic-mauve p-1">
              {{ currentRecipe.recipeCourses }}
            </ion-badge>
            <ion-badge class="bg-rut-generic-green p-1">
              {{ currentRecipe.recipeCategories }}
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
                    {{ currentRecipe.recipeIngredients[index].detail }}
                  </p>
                </div>
              </ion-list>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size-md="7" size-sm="5">
              <h5 class="underline font-bold text-md text-white mb-2">
                Step-By-Step:
              </h5>
              <ion-list
                v-for="(item, index) in currentInstructions"
                :key="index"
              >
                <div class="break-words ml-2">
                  <h5 class="pb-1 text-white">Step {{ index + 1 }}:</h5>
                  <p class="ml-1">
                    {{ currentRecipe.recipeInstructions[index].instruction }}
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
import { createOutline, sparklesOutline, sparkles } from "ionicons/icons";
import { mapActions, mapGetters } from "vuex";

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
      sparkles,
      isFavorite: null,
      isLoading: false,
      currentRecipe: null,
      currentIngredients: null,
      currentInstructions: null,
    };
  },
  computed: {
    ...mapGetters("recipes", ["getRecipeByID", "getFavorites"]),
    isRecipeFavorite() {
      const currentRecipeID = this.$route.params.id;
      return this.getFavorites.some(
        (recipe) => recipe.recipeID === currentRecipeID
      );
    },
  },
  methods: {
    ...mapActions("recipes", ["addToFavorites", "removeFromFavorites"]),

    editRecipeDetails() {
      this.$router.push({
        name: "EditRecipe",
        params: { id: this.$route.params.id },
      });
    },
    toggleFavorite() {
      const currentRecipeID = this.$route.params.id;
      console.log(this.isRecipeFavorite);

      if (this.isRecipeFavorite) {
        this.removeFromFavorites(currentRecipeID).then(
          () => (this.isFavorite = false)
        );
      } else if (!this.isRecipeFavorite) {
        this.addToFavorites(currentRecipeID).then(
          () => (this.isFavorite = true)
        );
      }
    },
  },
  async mounted() {
    this.isLoading = true;
    this.currentRecipe = await this.getRecipeByID(this.$route.params.id);
    this.isLoading = false;
    this.currentIngredients = this.currentRecipe.recipeIngredients;
    this.currentInstructions = this.currentRecipe.recipeInstructions;
  },
};
</script>
