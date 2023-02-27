<template>
  <ion-page>
    <base-header title="Recipe Details"></base-header>
    <ion-content>
      <base-card v-if="currentRecipe">
        <ion-grid>
          <div class="recipeInfo">
            <ion-row>
              <ion-item lines="none" class="recipePhoto">
                <img :src="this.currentRecipe[0].recipePhoto" />
              </ion-item>
            </ion-row>
            <div class="recipeTitle">
              <ion-row>
                <ion-col>
                  <ion-item lines="none">
                    <h1 class="recipeName">
                      {{ this.currentRecipe[0].recipeName }}
                    </h1>
                  </ion-item>
                </ion-col>
                <ion-col>
                  <ion-badge class="recipeBadge">
                    {{ this.currentRecipe[0].recipeCategory }}
                  </ion-badge>
                </ion-col>
                <ion-item lines="none" class="recipeTime">
                  {{ this.currentRecipe[0].recipeTime }} minutes
                </ion-item>
                <ion-item lines="none" class="recipeServings">
                  {{ this.currentRecipe[0].recipeServings }} servings
                </ion-item>
              </ion-row>
            </div>
            <ion-row>
              <ion-col>
                <div class="recipeIngredients">
                  <h6>Ingredients:</h6>
                  <ion-list
                    v-for="(item, index) in currentIngredients"
                    :key="index"
                  >
                    <ion-item lines="none">
                      <li>
                        {{ this.currentRecipe[0].recipeIngredients[index].qty }}
                        {{
                          this.currentRecipe[0].recipeIngredients[index].unit
                        }}
                        {{
                          this.currentRecipe[0].recipeIngredients[index].name
                        }}
                      </li>
                    </ion-item>
                  </ion-list>
                </div>
              </ion-col>
              <ion-col>
                <div class="recipeInstructions">
                  <h6>Step-By-Step:</h6>
                  <ion-list
                    v-for="(item, index) in currentInstructions"
                    :key="index"
                  >
                    <ion-item lines="none">
                      <h6 class="pr-2">Step {{ index + 1 }}:</h6>
                      <p>
                        {{
                          this.currentRecipe[0].recipeInstructions[index]
                            .instruction
                        }}
                      </p>
                    </ion-item>
                  </ion-list>
                </div>
              </ion-col>
            </ion-row>
          </div>
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
  width: 100%;
  border-radius: 0.5rem 0.5rem 0 0;
  max-height: fit-content;
}
.recipeTitle {
  display: inline-flex;
}
.recipeBadge {
  background-color: #7a3750;
  position: absolute;
  height: 23px;
  right: 0px;
}
</style>
