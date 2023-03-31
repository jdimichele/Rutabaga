<template>
  <ion-page>
    <base-header title="Recipe Details"></base-header>
    <ion-content>
      <base-card v-if="currentRecipe">
        <ion-grid>
          <ion-row>
            <ion-item lines="none">
              <img :src="this.currentRecipe[0].recipePhoto" />
            </ion-item>
          </ion-row>
          <ion-row class="ion-justify-content-start">
            <ion-item lines="none">
              <h1 class="recipeName">
                {{ this.currentRecipe[0].recipeName }}
              </h1>
            </ion-item>
            <ion-badge class="recipeBadge">
              {{ this.currentRecipe[0].recipeCategory }}
            </ion-badge>
          </ion-row>
          <ion-row class="timeAndServings">
            <ion-item lines="none" class="recipeTime">
              {{ this.currentRecipe[0].recipeTime }} minutes
            </ion-item>
            <ion-item lines="none" class="recipeServings">
              {{ this.currentRecipe[0].recipeServings }} servings
            </ion-item>
          </ion-row>
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

<style scoped>
.recipePhoto {
  /* width: 100%; */
  width: max-content;
  max-height: 100%;
}
.timeAndServings {
  display: inline-flex;
}
.recipeTime {
  font-size: 15px;
}
.recipeServings {
  font-size: 15px;
}
.recipeName {
  font-size: 32px;
}
.recipeBadge {
  background-color: #7a3750;
  position: absolute;
  right: 0px;
  padding: 5px;
  margin: 15px;
}
</style>
